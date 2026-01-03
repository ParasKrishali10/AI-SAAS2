import { getGuildChannels } from "@/lib/discord";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:Request)
{

    const {serverId}=await req.json();
    if(!serverId)
    {
       return NextResponse.json({ error: 'Server ID required' }, { status: 400 });
    }
    try{
        const server=await prisma.connectedServer.findFirst({
            where:{guildId:serverId}
        })
            if (!server) {
                console.log(serverId)
      return NextResponse.json({ error: 'Server not found' }, { status: 404 });

    }

    const channels=await getGuildChannels(server.guildId)
    await prisma.connectedChannel.deleteMany({
        where:{guildId:server.guildId}
    })
    const p=await Promise.all(
  channels.map((ch) =>
    prisma.connectedChannel.upsert({
      where: {
        guildId_channelId: {
          guildId: server.guildId,
          channelId: ch.id
        }
      },
      update: {
        channelName: ch.name
      },
      create: {
        serverId: server.id,
        guildId: server.guildId,
        channelId: ch.id,
        channelName: ch.name
      }
    })
  )
)

    // await prisma.connectedChannel.createMany({
    //     data:channels.map((ch)=>{
    //         serverId:server.id,
    //         guildId:server.guildId,
    //         channelId:ch.id,
    //         channelName:ch.name

    //     })
    // })
    return NextResponse.json({ channels });

    }catch(error)
    {
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
}