"use client";

import { useEffect, useState } from "react";
import { Sparkles, Volume2, Image as ImageIcon } from "lucide-react";
import { usePostStore } from "@/lib/postStore";
import ParticleBackground from "@/components/ParticleBackground";
import { SendHorizontal} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUserInfo } from "@/lib/userInfo";
import { div } from "framer-motion/client";
import { MainLoader } from "@/components/MainLoader";

interface SchedulingModalProps{
  userId:string
  post:{
    content:string
    imageUrls:string[]
  }
  description:string
  onClose:()=>void
  onSuccess:()=>void
}

interface DiscordServer{
  id:string
  guildId:string
  guildName:string
  guildIcon:string | null
}

interface DiscordChannel{
  id:string
  name:string
  type:number
}

type ChannelsByServer=Record<string,DiscordChannel[]>

export default function PostGenerated() {
  const { content, images } = usePostStore();
  const searchParams=new URLSearchParams()
  const [generatedImages, setGeneratedImages] = useState(false);
  const [contents, setContents] = useState(content);
  const [servers,setServers]=useState<DiscordServer[]>([])
  const [channelsByServer,setChannelsByServer]=useState<ChannelsByServer>({})
  const [channels,setChannels]=useState<DiscordChannel[]>([])
  const [selectedServer, setSelectedServer] = useState<string>('');
  const [selectedChannel, setSelectedChannel] = useState<string>('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [scheduling, setScheduling] = useState(false);
  const description=usePostStore((s)=>s.description)
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [botMissing,setBotMissing]=useState(false)
  const [redirectUrl,setRedirectUrl]=useState("")
  const cancelled=searchParams.get("cancelled")
  const userId=useUserInfo((s)=>s.userId)
  const hasHydrated=useUserInfo((s)=>s.hasHydrated)
  const state=`postGenerated|${selectedServer}`
  const loading=!userId || !content
  useEffect(()=>{
      if(cancelled)
      {
        toast.error("Bot Permission denied")
        return
      }
  },[cancelled])

  useEffect(()=>{
    if(!hasHydrated || !userId) return
    fetchServers()
  },[hasHydrated,userId])

useEffect(()=>{
  if(!selectedServer)
  {
    setChannels([])
    setBotMissing(false)
    return
  }
  checkBotLoadChannels(selectedServer)
},[selectedServer])

useEffect(()=>{
  setRedirectUrl(`${window.location.origin}/api/discord/callback`)
},[])

useEffect(()=>{
  const params=new URLSearchParams(window.location.search)
  const state=params.get("state")
  if(!state) return
  const [,serverId]=state.split("|")
  if(serverId)
  {
    setSelectedServer(serverId)
  }
  window.history.replaceState({},window.location.pathname)
},[])

  useEffect(()=>{
    const now=new Date()
    now.setMinutes(now.getMinutes()+5)
    const minTime=now.toISOString().slice(0,16)
    setScheduledTime(minTime)
  },[])

  const fetchServers=async()=>{
    try{
      const response=await axios.get(`/api/discord/server?userId=${userId}`)
      const fetchedServers: DiscordServer[] = response.data.servers || [];
      setServers(response.data.servers || [])

    }
    catch (error) {
      console.error('Error fetching servers:', error);
      toast('Wait we are fetching server');
    }

  }

  const checkBotLoadChannels=async(serverId:string)=>{
    try{
      const botRes=await axios.get(`/api/discord/check-bot?guildId=${serverId}&userId=${userId}`)
      if(!botRes.data.botPresent)
      {
        setBotMissing(true)
        setChannels([])
        toast.error("Bot is not added to server")
        toast("Click on Add Bot button to add bot to your server");
        return;
      }
      const channelRes=await axios.get(`/api/discord/channels?serverId=${serverId}`)
      setChannels(channelRes.data.channels || [])
      setBotMissing(false)
    }catch(error)
    {
      toast.error("Unable to load channels")
      setChannels([])
      setBotMissing(false)
    }
  }

  const handleSchedule=async()=>{
    if(!selectedChannel || !selectedServer || !scheduledTime )
    {
      toast.error("Please fill all fields")
      return
    }
    if (!selectedDate || !selectedTime) {
  toast.error("Please select date and time");
  return;
}

    setScheduling(true)
    try{
      const response=await axios.post('/api/posts/schedule',{
        userId,
        serverId:selectedServer,
        channelId:selectedChannel,
        description,
        generatedContent:content,
        imageUrls:images,
         scheduledFor:new Date(`${selectedDate}T${selectedTime}`)

      })
      if(response.data.success)
      {
        toast.success("Post Scheduled")
        return
      }
    }catch(error)
    {
      toast.error("Failed to schedule your post")
      console.log("error")
      return

    }finally{
      setScheduling(false)
    }
  }

  const notifyChannel=()=>{
    toast("Wait for 3 sec while we fetch your channels")
  }

  // const handleSync=async()=>{
  //   try{
  //     const res=await axios.post("/api/server/sync",{serverId:selectedServer})
  //   }catch(error)
  //   {
  //     alert("Syncing fails")
  //     console.log(error)
  //   }
  // }

  return (
    <div className="relative min-h-screen text-white">
      {loading && (
        <div className=" min-h-screen flex justify-center items-center">
        <MainLoader
  title="Fetching"
  words={["Content", "Images", "Content", "Images","Content","Images" ]}
/>

        </div>
      )}
    {scheduling && (
        <div className=" min-h-screen flex justify-center items-center">
        <MainLoader
  title="Fetching"
  words={["Permissions", "Content", "Time", "Date","Server","channel" ]}
/>

        </div>
      )}
      {!scheduling &&!loading && (
        <div>
            <div className="absolute inset-0 -z-20">
            <ParticleBackground />
            </div>
            <div className="absolute inset-0 flex justify-center items-start -z-10 pointer-events-none">
        <div
          className="mt-32 w-[700px] h-[700px]
            bg-[radial-gradient(circle_at_40%_40%,rgba(0,200,255,0.30),transparent_60%),
            radial-gradient(circle_at_70%_70%,rgba(170,80,255,0.25),transparent_60%),
            radial-gradient(circle_at_30%_80%,rgba(255,0,230,0.20),transparent_60%)]
            blur-[140px]"
        ></div>
      </div>
       <div className="relative flex flex-col max-w-3xl mx-auto pt-16 px-6 pb-24">

        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-cyan-400 via-purple-500 to-cyan-300">
          AI Post Creator
        </h1>

        <div className="mt-6 text-xl font-bold flex gap-2 items-center">
          <Sparkles className="text-cyan-400" />
          <span>Generated Content</span>
        </div>

        <div className="mt-4 rounded-xl p-6 backdrop-blur-md border border-white/10 bg-white/5 shadow-xl shadow-cyan-500/20">


          {images.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Generated image ${i}`}
                  className="w-48 h-48 object-cover rounded-xl shadow-lg"
                />
              ))}
            </div>
          )}

          <textarea
            value={content}
            onChange={(e) => setContents(e.target.value)}
            className="text-lg w-full h-64 p-4 rounded-lg resize-none bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="mt-8 rounded-xl p-6 backdrop-blur-md border border-white/10 bg-white/5 shadow-xl shadow-purple-500/20">


          <div className="grid grid-cols-2 justify-between items-center">
            <div >
          <label htmlFor="" className="font-bold text-xl">Server</label>
          <div className="mt-3">
<select
  id="server"
  value={selectedServer}
  onChange={(e) => {setSelectedServer(e.target.value);
    notifyChannel();
  }}
  className="
    mt-2 w-full p-3
    rounded-lg
    transition-all duration-300
    bg-white/5 border border-white/10
    focus:outline-none focus:ring-2 focus:ring-cyan-500
    shadow-xl shadow-indigo-600/30
    text-white placeholder-gray-400
  "
>
  <option value="" className="bg-black">Select a Server</option>
  {servers.map((server) => (
    <option key={server.id} value={server.guildId} className="bg-black">
      {server.guildName}
    </option>
  ))}
</select>

          </div>

            </div>
            <div >
          <label htmlFor="" className="font-bold text-xl ml-3">Channels</label>
          <div className="mt-3">
 <select
    id="channel"
    disabled={!selectedServer}
    value={selectedChannel}
    onChange={(e) => setSelectedChannel(e.target.value)}
    className="
      mt-2 w-full p-3 ml-2
      rounded-lg
      transition-all duration-300
      bg-white/5 border border-white/10
      focus:outline-none focus:ring-2 focus:ring-cyan-500
      shadow-xl shadow-indigo-600/30
      text-white
    "
  >
    <option value="" className="bg-black">Select a channel</option>
    {channels.map((ch) => (
      <option key={ch.id} value={ch.id} className="bg-black">
        {ch.name}
      </option>
    ))}
  </select>
          </div>

            </div>
{botMissing && selectedServer && (
    <div className="col-span-2 flex justify-center mt-6">
      <a
 href={`https://discord.com/oauth2/authorize
    ?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}
    &scope=bot
    &permissions=68608
    &guild_id=${selectedServer}
    &disable_guild_select=true
    &redirect_uri=${encodeURIComponent(redirectUrl)}
    &response_type=code
    &state=${encodeURIComponent(state)}
  `.replace(/\s+/g, "")}
        className="bg-indigo-600 px-6 py-3 rounded-md text-white text-lg font-semibold"
      >
        Add Bot To Server
      </a>
    </div>
  )}


            </div>
            {!botMissing && selectedServer && (
              <div>
<div className="grid grid-cols-2 justify-between items-center mt-6">
            <div >
          <label htmlFor="" className="font-bold text-xl mt-4">Date </label>
          <div className="mt-3">

          <input
  type="date"


  className="
    mt-2 w-full p-3
    rounded-lg
    transition-all duration-300
    bg-white/5 border border-white/10
    focus:outline-none focus:ring-2 focus:ring-cyan-500
    shadow-xl shadow-indigo-600/30
    text-white placeholder-gray-400
  "
  onChange={(e) => setSelectedDate(e.target.value)}
/>

          </div>

          </div>
            <div >
          <label htmlFor="" className="font-bold text-xl mt-4 ml-2">Time</label>
          <div className="mt-3">

          <input
  type="time"

    onChange={(e) => setSelectedTime(e.target.value)}
  className="
    mt-2 w-full p-3 ml-2
    rounded-lg
    transition-all duration-300
    bg-white/5 border border-white/10
    focus:outline-none focus:ring-2 focus:ring-cyan-500
    shadow-xl shadow-indigo-600/30
    text-white placeholder-gray-400
  "
/>

          </div>

          </div>

            </div>
              </div>
            ) }


            <div className="flex justify-center items-center mt-6">
           <button className="mt-6 text-white  bg-gradient-to-br  from-[#00d4ff] to-[#a855f7] p-4 text-xl text-black font-medium rounded-md cursor-pointer flex gap-2 items-center justify-center " onClick={handleSchedule}>
                             <SendHorizontal/>
                          <span>Schedule Post</span>
                    </button>

            </div>
            {/* <div className="flex justify-center items-center mt-6">
           <button className="mt-6 text-white  bb-cyan-800 p-4 text-xl text-black font-medium rounded-md cursor-pointer flex gap-2 items-center justify-center " onClick={handleSync}>
                             <SendHorizontal/>
                          <span>SYNC channels</span>
                    </button>

            </div> */}


        </div>
      </div>

        </div>
      )}





    </div>
  );
}
