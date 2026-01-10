import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest)
{
    const {searchParams}=new URL(req.url)
    const messageId=searchParams.get("messageId")
    if(!messageId)
    {
        return  NextResponse.json({message:"Missing message id"},{status:404})
    }
    try{
        const post=await prisma.scheduledPost.findUnique({
            where:{
                id:messageId
            }
        })
        const id=post?.discordMessageId
        console.log(id)
        return  NextResponse.json(id,{status:200})
    }catch(error){
        console.log(error)
        return NextResponse.json("Internal Server Error",{status:500})
    }
}