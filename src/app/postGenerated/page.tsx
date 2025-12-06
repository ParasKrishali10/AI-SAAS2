"use client";

import { useEffect, useState } from "react";
import { Sparkles, Volume2, Image as ImageIcon } from "lucide-react";
import { usePostStore } from "@/lib/postStore";
import ParticleBackground from "@/components/ParticleBackground";
import { SendHorizontal} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUserInfo } from "@/lib/userInfo";
import { channel } from "diagnostics_channel";
import { div, image } from "framer-motion/client";

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

export default function PostGenerated() {
  const { content, images } = usePostStore();
  const [generatedImages, setGeneratedImages] = useState(false);
  const [contents, setContents] = useState(content);
  const [servers,setServers]=useState<DiscordServer[]>([])
  const [channels,setChannels]=useState<DiscordChannel[]>([])
  const [selectedServer, setSelectedServer] = useState<string>('');
  const [selectedChannel, setSelectedChannel] = useState<string>('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [scheduling, setScheduling] = useState(false);
  const userId=useUserInfo((state)=>state.userId)
  const description=usePostStore((s)=>s.description)

  useEffect(()=>{
    fetchServers()
  },[])

    useEffect(() => {
    if (selectedServer) {
      fetchChannels(selectedServer);
    }
  }, [selectedServer]);

  useEffect(()=>{
    const now=new Date()
    now.setMinutes(now.getMinutes()+5)
    const minTime=now.toISOString().slice(0,16)
    setScheduledTime(minTime)
  })

  const fetchServers=async()=>{
    try{
      const response=await axios.get(`/api/discord/server?userId=${userId}`)
      setServers(response.data.servers || [])
    }
    catch (error) {
      console.error('Error fetching servers:', error);
      toast.error('Failed to load servers');
    } finally {
      setLoading(false);
    }

  }
  const fetchChannels=async(serverId:string)=>{
    try{
      const response=await axios.post('/api/discord/servers',{serverId})
      setChannels(response.data.channels || [])
    }catch(error){
      console.error('Error fetching channels:', error);
      toast.error('Failed to load channels');
    }
  }

  const handleSchedule=async()=>{
    if(!selectedChannel || !selectedServer || !scheduledTime )
    {
      toast.error("Please fill all fields")
      return
    }
    setScheduling(true)
    try{
      const response=await axios.post('/api/posts/schedule',{
        userId,
        serverId:selectedServer,
        channelId:selectedChannel,
        description,
        generatedContent:contents,
        imageUrls:images,
         scheduledFor: new Date(scheduledTime).toISOString(),
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

  return (
    <div className="relative min-h-screen text-white">

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
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            className="text-lg w-full h-64 p-4 rounded-lg resize-none bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="mt-8 rounded-xl p-6 backdrop-blur-md border border-white/10 bg-white/5 shadow-xl shadow-purple-500/20">


          <div className="grid grid-cols-2 justify-between items-center">
            <div >
          <label htmlFor="" className="font-bold text-xl">Server</label>
          <div className="mt-3">

          <input
  type="text"
  placeholder="My Awesome Server"
  list="serverTypes"
  className="
    mt-2 w-full p-3
    rounded-lg
    transition-all duration-300
    bg-white/5 border border-white/10
    focus:outline-none focus:ring-2 focus:ring-cyan-500
    shadow-xl shadow-indigo-600/30
    text-white placeholder-gray-400
  "
/>
<datalist id="serverTypes">
  {servers.map((server) => (
    <option key={server.id} value={server.guildName}>
      {server.guildName}
    </option>
  ))}
</datalist>

          </div>

            </div>
            <div >
          <label htmlFor="" className="font-bold text-xl ml-3">Channels</label>
          <div className="mt-3">

          <input
  type="text"
  placeholder="My Awesome Server"
  list="serverTypes"
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
<datalist id="serverTypes">
  <option value="Awesome Server" />
  <option value="Web Server" />
  <option value="Science Server" />
  <option value="Gaming Server" />
  <option value="Community Server" />
</datalist>
          </div>

            </div>


            </div>
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
/>

          </div>

          </div>
            <div >
          <label htmlFor="" className="font-bold text-xl mt-4 ml-2">Time</label>
          <div className="mt-3">

          <input
  type="time"


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

            <div className="flex justify-center items-center mt-6">
           <button className="mt-6 text-white  bg-gradient-to-br  from-[#00d4ff] to-[#a855f7] p-4 text-xl text-black font-medium rounded-md cursor-pointer flex gap-2 items-center justify-center " onClick={handleSchedule}>
                             <SendHorizontal/>
                          <span>Schedule Post</span>
                    </button>

            </div>


        </div>
      </div>
    </div>
  );
}
