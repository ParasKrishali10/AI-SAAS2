import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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