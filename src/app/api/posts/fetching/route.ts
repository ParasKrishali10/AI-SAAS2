import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export  async function GET(req:Request){
   try{
     const {searchParams}=new URL(req.url);
     const userId=searchParams.get("userId")
     const cursor=searchParams.get("cursor")

     if(!userId)
     {
       return NextResponse.json({message:"Please send user id"},{status:401})
     }
     console.log("reached")
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
      },
      take:20,
      cursor:cursor?{id:cursor}:undefined,
      skip:cursor?1:0
     })
     const servers = await prisma.connectedServer.findMany({
  where: { userId },
  include:{
    channels:true
  }
})

console.log(posts)
const nextCursor=posts.length>0?posts[posts.length-1].id:null

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
//  console.log(postWithServerInfo)
    console.log(nextCursor)
       return NextResponse.json({postWithServerInfo,nextCursor}, { status: 200 });
    }catch(error:any)
    {
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
}
