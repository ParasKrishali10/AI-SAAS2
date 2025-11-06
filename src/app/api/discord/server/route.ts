import { PrismaClient } from "@prisma/client";
import { getUserGuilds,getGuildChannels } from "@/lib/discord";
import { NextResponse } from "next/server";
import { error } from "console";
import { create } from "domain";

const prisma=new PrismaClient()

export async function GET(request:Request)
{
    const {searchParams}=new URL(request.url)
    const userId=searchParams.get('userId')
    if(!userId)
    {
        return NextResponse.json({error:"UserId is not present"},{status:400})
    }
    const user=await prisma.user.findUnique({
        where:{id:userId}
    })

    if(!user)
    {
       return NextResponse.json({error:"User is not present"},{status:404})
    }

    try{
        const guilds=await getUserGuilds(user.accessToken)

        for(const guild of guilds)
        {
           await prisma.connectedServer.upsert({
            where:{
                userId_guildId:{
                    userId:user.id,
                    guildId:guild.id,
                },
            },
            update:{
               guildName:guild.name,
               guildIcon:guild.icon,
            },
            create:{
                  userId: user.id,
              guildId: guild.id,
              guildName: guild.name,
              guildIcon: guild.icon,
            }
        })
        }

        const servers=await prisma.connectedServer.findMany({
            where:{userId:user.id}
        })

        return NextResponse.json({servers});

    }catch(error)
    {
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }

}

export async function POST(req:Request)
{
    const {serverId}=await req.json();
    if(!serverId)
    {
       return NextResponse.json({ error: 'Server ID required' }, { status: 400 });
    }
    try{
        const server=await prisma.connectedServer.findUnique({
            where:{id:serverId}
        })
            if (!server) {
      return NextResponse.json({ error: 'Server not found' }, { status: 404 });

    }

    const channels=await getGuildChannels(server.guildId)
    return NextResponse.json({ channels });

    }catch(error)
    {
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
}