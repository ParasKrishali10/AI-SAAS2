import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher-server";

export async function GET(req:NextRequest)
{
    const {searchParams}=new URL(req.url)
    const messageId=searchParams.get("messageId")
    if(!messageId)
    {
        return NextResponse.json({error:"Message Id req"},{status:400})
    }

    const reactions=await prisma.messageReaction.findMany({
        where:{
            messageId
        },select:{
            emoji:true,
            count:true
        }
    })

    const daily=await prisma.dailyReactionStat.findMany({
        where:{messageId},
        orderBy:{date:"asc"}
    })
    console.log(reactions)
    console.log(daily)
    return NextResponse.json({reactions,daily})

}

export async function POST(req:NextRequest){
    const body = await req.json()
const { messageId, type,emoji } = body
    try{
        if(!messageId || !emoji){
            console.log("Body not sent")
            return NextResponse.json("Payload is not being sent",{status:403})
        }
        const post=await prisma.scheduledPost.findFirst({
            where:{
                discordMessageId:messageId
            },select:{
                guildId:true,
                userId:true
            }
        })

        const serverName=await prisma.connectedServer.findFirst({
            where:{
                guildId:post?.guildId
            },select:{
                guildName:true
            }
        })

        const notifications=await prisma.notifications.create({
  data: {
    userId: post!.userId,
    type: "REACTION",
    message: `Someone reacted ${emoji} on your post in ${serverName?.guildName}`,
  },
})
    console.log("Triggering channel:", `user-${post!.userId}`)

    if(type==="REACTION_UPDATE")
        {
            await pusherServer.trigger(
           `user-${post?.userId}`,
           "notification",
           {message: `Someone reacted ${emoji} on your post in ${serverName?.guildName}`}
         )

        }
       if(type==="REACTION_DELETE"){
  await pusherServer.trigger(
    `user-${post?.userId}`,
    "notification",
    {message: `Someone removed a reaction on your post in ${serverName?.guildName}`}
  )

}

    return NextResponse.json(notifications)
    }catch(error)
    {
        console.log(error)
        return NextResponse.json("Internal Server Error",{status:500})
    }
}