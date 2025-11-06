import { NextResponse } from "next/server";
import { exchangeCode,getDiscordUser } from "@/lib/discord";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma=new PrismaClient()

export async function GET(req:Request)
{
    const {searchParams}=new URL(req.url);
    const code=searchParams.get('code')
    if(!code)
    {
        return NextResponse.json({error:'No code provided'},{status:400})

    }

    try{

            const tokenData=await exchangeCode(code)
            const discordUser=await getDiscordUser(tokenData.access_token)

            const user=await prisma.user.upsert({
                where:{discordId:discordUser.id},
                update:{
                    discordUsername:discordUser.username,
                    discordAvatar:discordUser.avatar,
                    accessToken:tokenData.access_token,
                    refreshToken:tokenData.refresh_token
                },
                create:{
                    discordId: discordUser.id,
            discordUsername: discordUser.username,
            discordAvatar: discordUser.avatar,
            accessToken: tokenData.access_token,
            refreshToken: tokenData.refresh_token,
                }
            })
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?userId=${user.id}`);

    }catch(error)
    {
        console.log(error)
        return NextResponse.json({error:"Authentication Failed"},{status:500})
    }

}