import { NextResponse } from "next/server";
import { exchangeCode,getDiscordUser } from "@/lib/discord";
import { prisma } from "@/lib/prisma";


export async function GET(req:Request)
{
    const {searchParams}=new URL(req.url);
    const code=searchParams.get('code')
    const state=searchParams.get("state")
    // Bot cancel option

    if(!code && state?.startsWith("postGenerate"))
    {
        const [,serverId]=state.split("|")
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/postGenerated?serverId=${serverId}&cancelled=true`)
    }

    if(!code)
    {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/`)

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

            // Bot will contain state so it will work accordingly
            if(state?.startsWith('postGenerated'))
            {
                 const [, serverId] = state.split("|");

      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/postGenerated?serverId=${serverId}&userId=${user.id}`
      );
            }

            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?userId=${user.id}`);

    }catch(error)
    {
        console.log(error)
        return NextResponse.json({error:"Authentication Failed"},{status:500})
    }

}