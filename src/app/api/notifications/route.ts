import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest){

    const {searchParams}=new URL(req.url)
    const userId=searchParams.get('userId')
    if(!userId){
        return NextResponse.json({error:'Missing userId'},{status:400})
    }
    try{


            const notifications=await prisma.notifications.findMany({
                where:{
                    userId
                },select:{
                    type:true,
                    message:true,
                    createdAt:true
                }
            })
            return NextResponse.json(notifications)
    }catch(error){
        console.error('Error fetching notifications:',error)
        return NextResponse.json({error:'Internal Server Error'},{status:500})
    }
}