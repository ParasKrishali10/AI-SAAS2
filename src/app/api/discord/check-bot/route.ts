import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher-server";
import { request } from "http";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
     const { searchParams } = new URL(req.url);
     const guildId = searchParams.get("guildId");
     const userId=searchParams.get("userId")
    if(!guildId){
        return NextResponse.json({error:"Missing guild Id"},{status:400})

    }

    const res = await fetch(
    `https://discord.com/api/v10/guilds/${guildId}`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    }
  )
  const server=await prisma.connectedServer.findFirst({
    where:{
      guildId
    }
  })
    if (res.status === 403 || res.status === 404) {
      await pusherServer.trigger(
        `user-${userId}`,
        "notification",
        {
          message:`Bot is not present on ${server?.guildName}`
        }
      )
    return NextResponse.json({ botPresent: false });
  }

  return NextResponse.json({ botPresent: true });


}