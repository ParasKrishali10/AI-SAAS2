import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const {searchParams}=new URL(req.url)
    const userId=searchParams.get("userId")
    console.log("User ID:", userId);
    if(!userId)
    {
        return NextResponse.json("Unauthorized",{status:403})
    }

    try{

            const sevenDaysAgo = new Date()
sevenDaysAgo.setHours(0, 0, 0, 0)
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)

            const posts=await prisma.scheduledPost.findMany({
                where:{
                    userId,
                    createdAt:{
                        gte:sevenDaysAgo
                    }
                },select:{
                    discordMessageId:true,
                    guildId:true,
                    generatedContent:true
                }
            })
const messageIds = posts.flatMap(p => p.discordMessageId ? [p.discordMessageId] : [])

            const reactions=await prisma.messageReaction.findMany({
                where:{
                    messageId:{in:messageIds},
                    createdAt:{
                        gte:sevenDaysAgo
                    }
                },select:{
                    createdAt:true
                }
            })
            const totalReactions = await prisma.messageReaction.count({
  where: {
    messageId: { in: messageIds }
  }
})


            const topPosts=await prisma.messageReaction.groupBy({
                by:["messageId"],
                where:{
                    messageId:{in:messageIds}
                },
                _sum:{
                    count:true
                },
                orderBy:{
                    _sum:{
                        count:"desc"
                    }
                },
                take:3
            })

              const servers = await prisma.connectedServer.findMany({
                      where: { userId },
                      include:{
                        channels:true
                      }
                    })
             const upcomingPostInfo=posts.map(post=>{
  const server=servers.find(
    s=>s.guildId===post.guildId
  )

  return {
    ...post,
    guildName:server?.guildName||""
  }
})


           const topPostDetails = topPosts.map(tp => {
  const post = upcomingPostInfo.find(p => p.discordMessageId === tp.messageId)
  return {
    ...post,
    totalReactions: tp._sum.count
  }
})

            const groupedData:Record<string,number>={}

            for(let i=0;i<7;i++){
                const d = new Date(sevenDaysAgo)
                d.setDate(d.getDate() + i)
                const dateStr = d.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit"
                })
                groupedData[dateStr] = 0
            }
console.log("Reactions found:", reactions.length)

            reactions.forEach((reactions)=>{
                const dateStr=new Date(reactions.createdAt).toLocaleDateString("en-US",{month:"short",day:"2-digit"})
                if(groupedData[dateStr]!=undefined){
                    groupedData[dateStr] +=1
                }
            })

    const today = new Date();
            const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(today.getDate() - 14);

const currentPeriodCount =reactions.length
    const previousPeriodCount = await prisma.messageReaction.count({
      where: {
        messageId:{in:messageIds},
        createdAt: {
          gte: fourteenDaysAgo,
          lt: sevenDaysAgo,
        },
      },
    });
    let growthRate = 0;

    if (previousPeriodCount === 0) {
      growthRate = currentPeriodCount > 0 ? 100 : 0;
    } else {
      growthRate = ((currentPeriodCount - previousPeriodCount) / previousPeriodCount) * 100;
    }


            const chartData=Object.entries(groupedData).map(([name,value])=>({name,value})).reverse()
            console.log(chartData)
            console.log(topPostDetails)
            return NextResponse.json({chartData,topPostDetails,totalReactions,growthRate},{status:200});

    }catch(error){
        console.log(error)
        return NextResponse.json("Intenral Server Error",{status:500})
    }
}