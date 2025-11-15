import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export  async function GET(req:Request){
    try{
          const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      }
    })


    return NextResponse.json(posts)
    }catch(error:any)
    {
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
}