"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";
import axios from "axios";
import { Clock4, Plus,TrendingUp,Activity } from "lucide-react";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
const posts = [
  { id:1, title:"Post A", date:"2025-04-01" },
  { id:2, title:"Post B", date:"2025-04-02" },
  { id:3, title:"Post C", date:"2025-04-03" },
  { id:4, title:"Post D", date:"2025-04-04" },
];

interface Posts{
  id: String
  title :    String
  content :  String
  createdAt :String
}


export default function DashboardLayout() {
  const router=useRouter()
  const searchParams=useSearchParams()
  const [loading,setLoading]=useState(false)
  const [posts,setPosts]=useState<Posts[]>([])
  const [username,setUsername]=useState("")
  const userId=searchParams.get('userId')
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
      const fetchPosts=async()=>{
        try{
          setLoading(true)
          const post=await axios.get("/api/posts")

        }catch(error:any)
        {

        }finally{
          setLoading(false)
        }
      }
      fetchPosts()
      fetchUser()
  },[])
  return (
    <div className="flex bg-black text-white min-h-screen">

      <div className=" fixed top-0 left-0 h-full w-80 bg-gray-900  md:block hidden">
        <Navbar />
      </div>

      <div className="md:ml-80 w-full flex flex-col relative">

        <div className="fixed top-0 left-0 md:left-80 right-0 z-50">
          <Topbar />
        </div>

        <div className="mt-16 p-6 overflow-y-auto h-screen bg-[#0a0f1a]">
          <div className="">
            <div className="flex flex-col">
            <div className="text-3xl font-bold">
              Dashboard {username}
            </div>
              <div className="mt-2 text-xl text-gray-600 font-medium">
                Welcome back! Here's your scheduling overview
              </div>
              <button className="flex cursor-pointer p-3 rounded-md w-40 mt-5 gap-2 bg-gradient-to-br  from-[#00d4ff] to-[#a855f7] scale-100 hover:scale-110 transition duration-500 ease-in-out hover:shadow-md shadow-cyan-600">
                  <Plus className="mt-0.5"/>
                  <span className="text-lg">New Post</span>
              </button>
              <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 mt-9">
             <div className="mt-12 w-full flex justify-between items-center overflow-hidden p-8 bg-gray-900 border border-cyan-700 rounded-md transform transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl shadow-cyan-600">

                  <div className="flex flex-col">
                      <div className="text-gray-600 text-xl lg:text-2xl font-semibold">
                        Scheduled Posts
                      </div>
                      <div className="text-3xl mt-3">
                        12
                      </div>
                  </div>
                  <div className="mt-2">
<div className="p-4  md:p-2 lg:p-4 rounded-2xl bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-400 flex items-center justify-center shadow-md shadow-cyan-500/20 ">
  <Clock4 className="w-7 h-7 text-white opacity-90" />
</div>


                  </div>
              </div>
     <div className="mt-12 w-full flex justify-between items-center overflow-hidden p-8 bg-gray-900 border border-cyan-700 rounded-md transform transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl shadow-cyan-600">

                  <div className="flex flex-col">
                      <div className="text-gray-600 text-xl lg:text-2xl font-semibold">
                        Total Reach
                      </div>
                      <div className="text-3xl mt-3 font-semibold">
                        24.5K
                      </div>
                  </div>
                  <div className="mt-2">
<div className="p-4 md:p-2 lg:p-4 rounded-2xl bg-gradient-to-r from-purple-600/90 to-fuchsia-500/70 flex items-center justify-center shadow-md shadow-cyan-500/20 ">
  <TrendingUp className="w-7 h-7 text-white opacity-90" />
</div>


                  </div>
              </div>
<div className="mt-12 w-full flex justify-between items-center overflow-hidden p-8 bg-gray-900 border border-cyan-700 rounded-md transform transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl shadow-cyan-600">

                  <div className="flex flex-col">
                      <div className="text-gray-600 text-lg lg:text-2xl font-semibold">
                        Engagement Rate
                      </div>
                      <div className="text-3xl mt-3">
                        8.2%
                      </div>
                  </div>
                  <div className="mt-2">
<div className="p-4 md:p-2 lg:p-4 rounded-2xl bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-400 flex items-center justify-center shadow-md shadow-cyan-500/20 ">
  <Activity className="w-7 h-7 text-white opacity-90" />
</div>


                  </div>
              </div>

              </div>
                <div className="grid grid-cols-1  lg:grid-cols-2 gap-6 mt-9">
              <div
  className="
    mt-12 w-full
    bg-gray-900/60 backdrop-blur-xl
    p-6 rounded-xl border border-cyan-500/20
    shadow-[0_0_25px_-6px_rgba(34,211,238,0.25)]
    transition-all duration-500
    hover:-translate-y-1 hover:shadow-[0_0_35px_-4px_rgba(34,211,238,0.55)]
    relative
  "
>
  <div className="flex flex-col">
    <div className="text-2xl font-semibold text-cyan-300">
      Recent Posts
    </div>
    <div className="text-gray-400 font-medium mt-1">
      Your latest scheduled content
    </div>
  </div>

  <div className="mt-6 space-y-4">

    {loading && [...Array(3)].map((_,i)=>(
      <div
        key={i}
        className="
          bg-gray-800/60
          p-4 rounded-md border border-gray-800
          overflow-hidden
          relative
        "
      >
        <div className="h-4 bg-gray-700/50 rounded w-2/3"></div>
        <div className="h-3 bg-gray-700/40 rounded w-1/3 mt-2"></div>


        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
      </div>
    ))}

    {!loading && posts.slice(0,3).map((p:any)=>(
      <div
        key={p.id}
        className="
          bg-gray-800/60
          p-4 rounded-md border border-gray-700
          hover:border-cyan-400/50
          hover:-translate-y-[2px] hover:shadow-lg
          transition-all duration-300 cursor-pointer
        "
      >
        <div className="font-semibold text-gray-100">{p.title}</div>
        <div className="text-xs text-gray-500">{p.date}</div>
      </div>
    ))}

  </div>


</div>

                  <div
  className="
    mt-12 w-full
    bg-gray-900/60 backdrop-blur-xl
    p-6 rounded-xl border border-cyan-500/20
    shadow-[0_0_25px_-6px_rgba(34,211,238,0.25)]
    transition-all duration-500
    hover:-translate-y-1 hover:shadow-[0_0_35px_-4px_rgba(34,211,238,0.55)]
    relative
  "
>
  <div className="flex flex-col">
    <div className="text-2xl font-semibold text-cyan-300">
      Top Performers
    </div>
    <div className="text-gray-400 font-medium mt-1">
     Best performing posts this week
    </div>
  </div>

  <div className="mt-6 space-y-4">

    {loading && [...Array(3)].map((_,i)=>(
      <div
        key={i}
        className="
          bg-gray-800/60
          p-4 rounded-md border border-gray-800
          overflow-hidden
          relative
        "
      >
        <div className="h-4 bg-gray-700/50 rounded w-2/3"></div>
        <div className="h-3 bg-gray-700/40 rounded w-1/3 mt-2"></div>


        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
      </div>
    ))}

    {!loading && posts.slice(0,3).map((p:any)=>(
      <div
        key={p.id}
        className="
          bg-gray-800/60
          p-4 rounded-md border border-gray-700
          hover:border-cyan-400/50
          hover:-translate-y-[2px] hover:shadow-lg
          transition-all duration-300 cursor-pointer
        "
      >
        <div className="font-semibold text-gray-100">{p.title}</div>
        <div className="text-xs text-gray-500">{p.date}</div>
      </div>
    ))}

  </div>


</div>
                  <div
  className="
    mt-12 w-full
    bg-gray-900/60 backdrop-blur-xl
    p-6 rounded-xl border border-cyan-500/20
    shadow-[0_0_25px_-6px_rgba(34,211,238,0.25)]
    transition-all duration-500
    hover:-translate-y-1 hover:shadow-[0_0_35px_-4px_rgba(34,211,238,0.55)]
    relative
  "
>
  <div className="flex flex-col">
    <div className="text-2xl font-semibold text-cyan-300">
     Upcoming Schedule
    </div>
    <div className="text-gray-400 font-medium mt-1">
      Next 7 days content plan


    </div>
  </div>

  <div className="mt-6 space-y-4">

    {loading && [...Array(3)].map((_,i)=>(
      <div
        key={i}
        className="
          bg-gray-800/60
          p-4 rounded-md border border-gray-800
          overflow-hidden
          relative
        "
      >
        <div className="h-4 bg-gray-700/50 rounded w-2/3"></div>
        <div className="h-3 bg-gray-700/40 rounded w-1/3 mt-2"></div>


        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
      </div>
    ))}

    {!loading && posts.slice(0,3).map((p:any)=>(
      <div
        key={p.id}
        className="
          bg-gray-800/60
          p-4 rounded-md border border-gray-700
          hover:border-cyan-400/50
          hover:-translate-y-[2px] hover:shadow-lg
          transition-all duration-300 cursor-pointer
        "
      >
        <div className="font-semibold text-gray-100">{p.title}</div>
        <div className="text-xs text-gray-500">{p.date}</div>
      </div>
    ))}

  </div>


</div>
                 <div
  className="
    mt-12 w-full
    bg-gray-900/60 backdrop-blur-xl
    p-6 rounded-xl border border-cyan-500/20
    shadow-[0_0_25px_-6px_rgba(34,211,238,0.25)]
    transition-all duration-500
    hover:-translate-y-1 hover:shadow-[0_0_35px_-4px_rgba(34,211,238,0.55)]
    relative
  "
>
  <div className="flex flex-col">
    <div className="text-2xl font-semibold text-cyan-300">
   Analytics
    </div>
    <div className="text-gray-400 font-medium mt-1">
      Detailed performance metrics
    </div>
  </div>

  <div className="mt-6 space-y-4">

    {loading && [...Array(3)].map((_,i)=>(
      <div
        key={i}
        className="
          bg-gray-800/60
          p-4 rounded-md border border-gray-800
          overflow-hidden
          relative
        "
      >
        <div className="h-4 bg-gray-700/50 rounded w-2/3"></div>
        <div className="h-3 bg-gray-700/40 rounded w-1/3 mt-2"></div>


        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
      </div>
    ))}

    {!loading && posts.slice(0,3).map((p:any)=>(
      <div
        key={p.id}
        className="
          bg-gray-800/60
          p-4 rounded-md border border-gray-700
          hover:border-cyan-400/50
          hover:-translate-y-[2px] hover:shadow-lg
          transition-all duration-300 cursor-pointer
        "
      >
        <div className="font-semibold text-gray-100">{p.title}</div>
        <div className="text-xs text-gray-500">{p.date}</div>
      </div>
    ))}

  </div>


</div>

                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
