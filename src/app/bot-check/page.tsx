"use client"
import axios from "axios";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useUserInfo } from '@/lib/userInfo';
import { div } from "framer-motion/client";
type Guild = {
  id: string;
  name: string;
};

export default function BotCheckPage() {
    const searchParams=useSearchParams()
    const [guilds,setGuilds]=useState<Guild[]>([])
    const [selectedGuild,setSelectedGuild]=useState<string | null>(null)
    const [showAddBot,setShowAddBot]=useState(false)
    const userIds=searchParams.get('userId')
    const userId=useUserInfo(state=>state.userId)
    const setUserId=useUserInfo(state=>state.setUserId)
    useEffect(()=>{
        const fetchGuilds=async()=>{
           const response=await axios.get(`/api/discord/server?userId=${userId}`)
           const fetchedGuilds:Guild[]=response.data.servers ||  []
           setGuilds(fetchedGuilds)
        }
    },[])
    const handleSelectGuild=async(guildId:string)=>{
        setSelectedGuild(guildId)
        const response=await axios.get(`/api/discord/check-bot?guildId=${guildId}`)
        const ans=response.data.botPresent
        setShowAddBot(!ans);
    }

    return (
            <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Select Server</h1>

              {guilds.map(g => (
        <button
          key={g.id}
          onClick={() => handleSelectGuild(g.id)}
          className="block mb-2 bg-gray-800 text-white px-4 py-2 rounded"
        >
          {g.name}
        </button>
      ))}



      {showAddBot && selectedGuild && (
        <a
          href={`https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=bot&permissions=68608&guild_id=${selectedGuild}&disable_guild_select=true`}
          className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Bot to Server
        </a>
      )}
    </div>

    )
}
