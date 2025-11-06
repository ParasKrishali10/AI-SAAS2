import { DiscordUser,DiscordChannel,DiscordGuild } from "@/types";
const DISCORD_API='https://discord.com/api/v10';

export async function exchangeCode(code:string){
    const params=new URLSearchParams({
        client_id:process.env.DISCORD_CLIENT_ID!,
        client_secret:process.env.DISCORD_CLIENT_SECRET!,
        grant_type:'authorization_code',
        code,
        redirect_uri:process.env.DISCORD_REDIRECT_URI!,}
    )
    const response=await fetch(`${DISCORD_API}/oauth2/token`,{
        method:'POST',
        body:params,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    if(!response.ok){
        throw new Error('Failed to exchange code for token');

    }
    return response.json()
}

export async function getDiscordUser(accessToken:string):Promise<DiscordUser>{
    const response=await fetch(`${DISCORD_API}/users/@me`,{
        headers:{
            Authorization:`Bearer ${accessToken}`,
        }
    })
    if(!response.ok){
        throw new Error('Failed to fetch user');
    }
    return response.json()
}

export async function getUserGuilds(accessToken:string):Promise<DiscordGuild[]>{
    const response=await fetch(`${DISCORD_API}/user/@me/guilds`,{
        headers:{
           Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        }
    })
    if(!response.ok){
        throw new Error('Failed to fetch guilds');
    }
    return response.json()
}

export async function getGuildChannels(guildId:string):Promise<DiscordChannel[]>{
    const response=await fetch(`${DISCORD_API}/guilds/${guildId}/channels`,{
        headers:{
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        }
    })
    if(!response.ok){
        throw new Error('Failed to fetch guilds');
    }
     const channels = await response.json();
     return channels.filter((ch: DiscordChannel) => ch.type === 0);
}

export async function postToDiscord(
    channelId:string,
    content:string,
    imageUrls?:string[]
){
    const payload:any={
        content:content
    }

    if(imageUrls && imageUrls.length>0){
        payload.embeds=imageUrls.map((url:string)=>{
            return {image:{url}};
        })
    }

    const response=await fetch(`${DISCORD_API}/channels/${channelId}/messages`,{
        method:'POST',
        headers:{
            Authorization:`Bot ${process.env.DISCORD_BOT_TOKEN}`,
            'Content-Type':'application/json',
        },
        body:JSON.stringify(payload)
    })

    if(!response.ok){
        const error=await response.text();
        throw new Error(`Failed to post message: ${error}`);
    }

    return response.json();
}

export async function refreshAccessToken(refreshToken:string){
    const params=new URLSearchParams({
        client_id:process.env.DISCORD_CLIENT_ID!,
        client_secret:process.env.DISCORD_CLIENT_SECRET!,
        grant_type:'refresh_token',
        refresh_token:refreshToken,
    })
    const response=await fetch(`${DISCORD_API}/oauth2/tokrn`,{
        method:'POST',
        body:params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })

    if(!response.ok){
        throw new Error('Failed to refresh token');
    }
    return response.json()
}
