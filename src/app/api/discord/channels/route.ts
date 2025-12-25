import { NextRequest, NextResponse } from "next/server";
import { getGuildChannels } from "@/lib/discord";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return NextResponse.json(
        { error: "Missing server id" },
        { status: 400 }
      );
    }

    const channels = await getGuildChannels(serverId);
    return NextResponse.json({ channels });
  } catch (error) {
    console.error("Error in fetching the channels", error);
    return NextResponse.json(
      { error: "Failed to fetch channels" },
      { status: 500 }
    );
  }
}
