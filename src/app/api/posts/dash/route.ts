import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const {searchParams}=new URL(req.url)
    const userId=searchParams.get("userId")
    if(!userId){
        return NextResponse.json({error:"User ID required"},{status:400})
    }
    try{
        const recentPost=await prisma.scheduledPost.findMany({
            where:{
                userId,
                status:"POSTED"
            },
            orderBy:{
                postedAt:"desc"
            },
            take:3,
            select:{
                guildId:true,
                channelId:true,
                generatedContent:true,
            }

        })

        const upcomingPost=await prisma.scheduledPost.findMany({
            where:{
                userId,
                status:"SCHEDULED"
            },
            orderBy:{
                scheduledFor:"desc"
            },
            take:3,
            select:{
                guildId:true,
                channelId:true,
                generatedContent:true,
                scheduledFor:true
            }

        })

        const count=await prisma.scheduledPost.count({
          where:{userId,status:"SCHEDULED"}
        })

        const servers = await prisma.connectedServer.findMany({
          where: { userId },
          include:{
            channels:true
          }
        })

        const recentPostInfo=recentPost.map(post=>{
  const server=servers.find(
    s=>s.guildId===post.guildId
  )
  const channel=server?.channels.find(
    (c)=>c.channelId===post.channelId
  )
  return {
    ...post,
    guildName:server?.guildName||"",
    channelName:channel?.channelName
  }
})
        const upcomingPostInfo=upcomingPost.map(post=>{
  const server=servers.find(
    s=>s.guildId===post.guildId
  )
  const channel=server?.channels.find(
    (c)=>c.channelId===post.channelId
  )
  return {
    ...post,
    guildName:server?.guildName||"",
    channelName:channel?.channelName
  }
})

const today=new Date()
const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(today.getDate() - 14);

    const currentPeriodCount=await prisma.scheduledPost.count({
        where:{
          userId:userId,
          status: {
    in: ["SCHEDULED", "POSTED"]
  },
          createdAt:{
            gte:sevenDaysAgo,
          }
        }
    })

    const previousPeriodCount=await prisma.scheduledPost.count({
      where:{
        userId:userId,
        status: {
    in: ["SCHEDULED", "POSTED"]
  },
        createdAt:{
          gte:fourteenDaysAgo,
          lt:sevenDaysAgo,
        }
      }
    })

    const diff=currentPeriodCount-previousPeriodCount
        console.log(diff)
        console.log(recentPostInfo)
        console.log(upcomingPostInfo)

        return NextResponse.json({recentPost:recentPostInfo,upcomingPost:upcomingPostInfo,count,diff},{status:200})
    }catch(error){
        console.error("Error fetching posts:",error)
        return NextResponse.json({error:"Failed to fetch posts"},{status:500})
    }
}