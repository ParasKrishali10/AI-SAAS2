import { request } from "http";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
     const { searchParams } = new URL(req.url);
     const guildId = searchParams.get("guildId");

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
    if (res.status === 403 || res.status === 404) {
    return NextResponse.json({ botPresent: false });
  }

  return NextResponse.json({ botPresent: true });


}