"use client"
import axios from "axios";
import { Zap, FilePlus,Clock4,ChartColumn,Settings,LayoutDashboard, Plus, CalendarClock, BarChart3 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { label } from "framer-motion/client";
export default function Navbar() {
    const [username,setUsername]=useState("")
      const searchParams=useSearchParams()
  const userId=searchParams.get('userId')
  const router=useRouter()


  const setRedirection=(label:string)=>{
    return ()=>{
      let path=""
      switch(label){
        case "Create Post":
          path="/postCreator"
          break;
        case "Scheduled":
          path="/scheduled"
          break;
        case "Analytics":
          path="/analytics"
          break;
        case "Settings":
          break;
      }
      router.push(path)
  }
  }

  useEffect(()=>{
    const fetchUser=async()=>{
      try{
          const res=await axios.get(`/api/user/?id=${userId}`)
          const useri=await res.data
          console.log(useri.discordUsername)
          const fullName=useri.discordUsername
            const parts = fullName.trim().split(" ")
            const first = parts[0]?.[0] || ""
            const last = parts[parts.length-1]?.[0] || ""
          setUsername((first + last).toUpperCase())

      }catch(error)
      {
        console.log(error);

      }
    }

      fetchUser()
  },[])

  const [id,setId]=useState(0);
return (

<aside className="w-64 h-screen flex-shrink-0 border-r border-white/5 bg-slate-950/50 backdrop-blur-xl flex flex-col relative z-50 pointer-events-auto">

      <div className="h-24 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-3">

          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap className="h-6 w-6 text-white fill-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white">Discord AI</h1>
            <p className="text-[10px] text-cyan-400 font-mono tracking-wider">PRO SUITE</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 font-medium">

  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-xl opacity-100 blur-md transition-opacity pointer-events-none"></div>

    <button className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 text-cyan-400 cursor-pointer">
      <LayoutDashboard className="h-5 w-5" />
      <span>Dashboard</span>
      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
    </button>
  </div>

  {[
  { icon: Plus, label: "Create Post" },
  { icon: CalendarClock, label: "Scheduled" },
  { icon: BarChart3, label: "Analytics" },
].map((item, idx) => (
  <button
    key={idx}
    onClick={setRedirection(item.label)}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 group cursor-pointer"
  >
    <item.icon className="h-5 w-5 group-hover:text-cyan-400 transition-colors" />
    <span>{item.label}</span>
  </button>
))}

</nav>


      <div className="p-4 border-t border-white/5">
         <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-orange-500 p-[2px]">
                <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center text-xs font-bold text-white">
                  GG
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Ghost Gamer</span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  ONLINE
                </span>
            </div>
         </div>
      </div>
    </aside>
  );
}
