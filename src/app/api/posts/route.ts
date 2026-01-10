import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher-server";
export  async function GET(req:Request){
   try{
     const {searchParams}=new URL(req.url);
     const userId=searchParams.get("userId")
     if(!userId)
     {
       return NextResponse.json({message:"Please send user id"},{status:401})
     }
     const posts=await prisma.scheduledPost.findMany({
      where:{
        userId
      },
      select: {
    id: true,
    guildId: true,
    channelId: true,
    generatedContent: true,
    imageUrls: true,
    scheduledFor: true,
    status: true,
  },
      orderBy:{
          scheduledFor:"desc"
      }
     })
     const servers = await prisma.connectedServer.findMany({
  where: { userId },
  include:{
    channels:true
  }
})

const postWithServerInfo=posts.map(post=>{
  const server=servers.find(
    s=>s.guildId===post.guildId
  )
  const channel=server?.channels.find(
    (c)=>c.channelId===post.channelId
  )
  return {
    ...post,
    guildName:server?.guildName||"",
    guildIcon:server?.guildIcon ||"",
    channelName:channel?.channelName
  }
})
await pusherServer.trigger(
      "test-channel",
      "test-event",
      {message:"Hello post generated successfully"}
    )


       return NextResponse.json(postWithServerInfo, { status: 200 });
    }catch(error:any)
    {
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
}

export async function PUT(req:NextRequest)
{
  const {postId,content}=await req.json()
  if(!postId || !content)
  {
    return NextResponse.json("Missing Arguments",{status:404})
  }
  try{
   const post = await prisma.scheduledPost.update({
  where: { id: postId },
  data: {
    generatedContent: content,
  },
});

return NextResponse.json("Updated Changes",{status:200})

  }catch(error)
  {
    return NextResponse.json("Unexpected Error happens",{status:500})
  }
}

export async function DELETE(req:NextRequest){
   const {searchParams}=new URL(req.url);
   const postId=searchParams.get("postId")

   if(!postId)
   {

    return NextResponse.json("Post Id is not passed as argument",{status:404})
   }
   try{
    const post=await prisma.scheduledPost.delete({
      where:{
        id:postId
      }
    })
    console.log(post)
    return NextResponse.json("Post Deleted Successfully",{status:200})
   }catch(error)
   {
    console.log(error)
    return NextResponse.json("Internal error",{status:500})
   }
}