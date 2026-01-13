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
import FloatingSidebar from "@/components/Sidebar";
import Truck from "@/components/Truck";

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
    toast("Wait for 5 sec while we fetch your channels")
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

    <div className="flex min-h-screen bg-[#020617] text-white w-full overflow-hidden">

{(loading || scheduling) &&(

      <div className="w-20 flex-shrink-0 sticky top-0 h-screen z-50">
        <FloatingSidebar />
      </div>
)}


      <div className="flex-1 relative min-w-0">

        {(loading || scheduling) && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-md">
            <Truck/>
          </div>
        )}
        {(!loading && !scheduling) &&(
          <div>
        <div className="absolute inset-0 -z-20">
          <ParticleBackground />
        </div>
        <div className="absolute inset-0 flex justify-center items-start -z-10 pointer-events-none">
          <div className="mt-32 w-[800px] h-[800px] bg-[radial-gradient(circle_at_50%_50%,rgba(0,200,255,0.15),transparent_60%)] blur-[140px]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-10">

          <div className="pt-10 pb-8">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                <span>Main Dashboard</span>
                <span className="text-slate-800">/</span>
                <span className="text-blue-500">Post Generated</span>
              </div>
              <h1 className="text-5xl font-extrabold text-white tracking-tight">
                Generated <span className="text-blue-600">Content</span>
              </h1>
              <p className="text-slate-500 text-md font-medium mt-1">
                Schedule your AI-generated Discord post.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 pb-24">

            <section>
              <div className="text-xl font-bold flex gap-2 items-center mb-4">
                <Sparkles className="text-cyan-400" />
                <span>Generated Content</span>
              </div>
              <div className="rounded-xl p-6 backdrop-blur-md border border-white/10 bg-white/5 shadow-xl shadow-cyan-500/10">
                {images.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {images.map((img, i) => (
                      <img key={i} src={img} alt="" className="w-64 h-64 object-cover rounded-xl shadow-lg border border-white/5" />
                    ))}
                  </div>
                )}
                <textarea
                  value={contents===""?content:contents}
                  onChange={(e) => {setContents(e.target.value)}}
                  className="text-lg w-full h-80 p-5 rounded-lg resize-none bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                />
              </div>
            </section>

            <section className="rounded-xl p-8 backdrop-blur-md border border-white/10 bg-white/5 shadow-xl shadow-purple-500/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <label className="font-bold text-lg">Server</label>
                  <select
                    value={selectedServer}
                    onChange={(e) => {setSelectedServer(e.target.value); notifyChannel();}}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-cyan-500 text-white"
                  >
                    <option value="" className="bg-slate-900">Select a Server</option>
                    {servers.map((s) => (
                      <option key={s.id} value={s.guildId} className="bg-slate-900">{s.guildName}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="font-bold text-lg">Channel</label>
                  <select
                    disabled={!selectedServer}
                    value={selectedChannel}
                    onChange={(e) => setSelectedChannel(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-cyan-500 text-white disabled:opacity-50"
                  >
                    <option value="" className="bg-slate-900">Select a Channel</option>
                    {channels.map((ch) => (
                      <option key={ch.id} value={ch.id} className="bg-slate-900">{ch.name}</option>
                    ))}
                  </select>
                </div>

                {botMissing && selectedServer && (
                  <div className="md:col-span-2 flex justify-center pt-4">
                    <a href={`https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=bot&permissions=68608&guild_id=${selectedServer}&disable_guild_select=true&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&state=${encodeURIComponent(state)}`}
                       className="bg-indigo-600 px-8 py-3 rounded-lg text-white font-bold hover:bg-indigo-700 transition-colors">
                      Add Bot To Server
                    </a>
                  </div>
                )}

                {!botMissing && selectedServer && (
                  <>
                    <div className="flex flex-col gap-3">
                      <label className="font-bold text-lg">Date</label>
                      <input type="date" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white" onChange={(e) => setSelectedDate(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="font-bold text-lg">Time</label>
                      <input type="time" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white" onChange={(e) => setSelectedTime(e.target.value)} />
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-center mt-10">
                <button onClick={handleSchedule} className="flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-purple-500 px-12 py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-purple-500/20 hover:cursor-pointer">
                  <SendHorizontal />
                  <span>Schedule Post</span>
                </button>
              </div>
            </section>
          </div>
        </div>

          </div>
        )}
      </div>
    </div>
  );

}
