import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
          scheduledFor:"asc"
      }
     })
     const servers = await prisma.connectedServer.findMany({
  where: { userId },
})

const postWithServerInfo=posts.map(post=>{
  const server=servers.find(
    s=>s.guildId===post.guildId
  )
  return {
    ...post,
    guildName:server?.guildName||"",
    guildIcon:server?.guildIcon ||"",
    channelName:server?.channelId===post.channelId?server.channelName:""
  }
})

       return NextResponse.json(postWithServerInfo, { status: 200 });
    }catch(error:any)
    {
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
}