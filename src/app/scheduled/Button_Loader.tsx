"use client"
import { Clock,CircleCheck,OctagonAlert,Pencil,Copy,Trash2, TableOfContents, Grid2x2 } from 'lucide-react';
import { useEffect, useState } from "react"
import Image from 'next/image';
import Drawer from './Drawer';
import { useUserInfo } from '@/lib/userInfo';
import toast from 'react-hot-toast';
import axios from "axios";
import Delete from './Delete';
import { MainLoader } from '@/components/MainLoader';
import { pusherClient } from '@/lib/pusher-client';
type PostStatus = "SCHEDULED" | "POSTED" | "FAIL";
type Post={
  id:number,
  status:PostStatus,
  initials:string,
  server:string,
  channel:string,
  content:string,
  images:string
}
interface ScheduledPosts{
    guildName:string;
    guildIcon: string;
    channelName: string | null;
    status:string
    id: string;
    guildId: string;
    channelId: string;
    generatedContent: string | null;
    imageUrls: string[];
    scheduledFor: Date;
}
export default function Button(){
    const [allNo,setAllNo]=useState(5)
    const [id,setId]=useState(1)
    const [editOpen,seteditOpen]=useState(false)
    const [selectedPost,setSelectedPost]=useState("")
    const [selectedChannel,setSelectedChannel]=useState("")
    const [selectedContent,setSelectedContent]=useState("")
    const userId=useUserInfo(s=>s.userId)
    const [post,setPost]=useState<ScheduledPosts[]>([])
    const [deletePost,setDeletePost]=useState(false)
    const [all,setAll]=useState(0)
    const [pending,setPending]=useState(0)
    const [posted,setPosted]=useState(0)
    const [failed,setFailed]=useState(0)
    const [finalPost,setFinalPost]=useState<ScheduledPosts[]>([])
    const [searchText,setSearchText]=useState("")
    const [statusFilter, setStatusFilter] = useState<string>("ALL")
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
      let filtered=post
        if (statusFilter !== "ALL") {
    filtered = filtered.filter(p => p.status === statusFilter)
  }

      if(searchText.trim()!=""){
        const q = searchText.toLowerCase()
      filtered = filtered.filter(p =>
      p.generatedContent?.toLowerCase().includes(q) ||
      p.channelName?.toLowerCase().includes(q) ||
      p.guildName?.toLowerCase().includes(q)
    )}
      setFinalPost(filtered)
    },[post,searchText,statusFilter])

    const STATUS_UI = {
   SCHEDULED: {
    label: "Pending",
    glow: "from-[#F9B233]/60 to-[#F57C00]/60",
    bg: "from-[#F9B233] to-[#F57C00]",
    icon: Clock,
  },
  POSTED: {
    label: "Posted",
    glow: "from-green-500/60 to-emerald-500/60",
    bg: "from-green-500 to-emerald-500",
    icon: CircleCheck,
  },
  FAIL: {
    label: "Failed",
    glow: "from-red-500/60 to-orange-500/60",
    bg: "from-red-500 to-orange-500",
    icon: OctagonAlert,
  },
} as const;



const filteredPost=(status:string)=>{
    if (status === "ALL") {
    setFinalPost(post)
  } else {
    setFinalPost(post.filter(p => p.status === status))
  }

}


useEffect(()=>{
  setLoading(false)
},[post.length])

  useEffect(()=>{
    document.documentElement.style.overflow=editOpen ?"hidden":""
    document.body.style.overflow=editOpen?"hidden":""
    return ()=>{
      document.documentElement.style.overflow=""
      document.body.style.overflow=""
    }
  },[editOpen])

  useEffect(()=>{
    try{
      setLoading(true)
      fetchPosts()
    }catch(error)
    {

    }finally{

    }
  },[userId])
  const fetchPosts=async()=>{
      try{
        const response=await axios.get(`/api/posts/?userId=${userId}`)
        const posts=await response.data ||[]
        // console.log(posts)
       posts.forEach((p:any) => {
  if (p.status === "POSTED") {
    setPosted(prev => prev + 1)
  } else if (p.status === "FAIL") {
    setFailed(prev => prev + 1)
  } else {
    setPending(prev => prev + 1)
  }
})

        setAll(posts.length)
        setFinalPost(posts)
        setPost(posts)

      }catch(error)
      {
        console.log(error)
        toast.error("Error in collecting the posts")
        return
      }
    }
    return (
      <>
        <div className={`relative min-h-screen }`}>
          {loading && (
                  <div className=" min-h-screen flex justify-center items-center bg-black">
                  <MainLoader
            title="Fetching"
            words={["Content", "Servers", "Channels", "Posts","Content","Images" ]}
          />

                  </div>
                )}
                {!loading && (
                    <div>
                      <div >
          <div className="p-10 flex justify-between">
            <div className="">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Scheduled Post</h1>
                <h3 className="mt-3 font-semibold text-cyan-500 text-lg">Manage all your Discord scheduled content</h3>
            </div>
            <div className="flex p-4 bg-gray-900 gap-4">
                <button className="cursor-pointer">

                    <Grid2x2 className="w-10 h-10 p-1 text-cyan-500 hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white rounded-lg"/>

                </button>
                <button className="cursor-pointer">
                    <TableOfContents className="w-10 h-10 p-1 text-cyan-500 hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white rounded-lg"/>
                </button>
            </div>
          </div>

          </div>
                           <div className='px-10 '>
              <input value={searchText} onChange={(e)=>setSearchText(e.target.value)} type="text" placeholder='Search Posts,channels,servers' className='border w-full p-3 text-white text-lg transition-shadow duration-200
    focus:outline-none
    focus:shadow-lg
    focus:shadow-cyan-500/50 rounded-lg border border-cyan-900 focus:outline-none focus:border-cyan-500'/>
            </div>
          <div className='mt-5 px-10 flex gap-4'>
            <button onClick={()=>{setId(1);setStatusFilter("ALL")}} className={`w-auto p-3 h-11  rounded-xl gap-2 cursor-pointer  flex items-center justify-center ${id==1 ? "bg-gradient-to-r from-blue-400 to-purple-400" : "border border-cyan-500" } `}>
              <span className={`text-xl font-bold ${id==1?"": "text-cyan-500"} `}>All</span>
              <span className={`border rounded-full  text-xl  h-8 w-8 flex justify-center items-center font-bold  text-medium ${id==1?"bg-gray-400": "text-cyan-500"} `}>{all}</span>
            </button>
            <button onClick={()=>{setId(2);setStatusFilter("SCHEDULED")}} className={`w-auto p-3 h-11  rounded-xl gap-2 cursor-pointer  flex items-center justify-center ${id==2 ? "bg-gradient-to-r from-blue-400 to-purple-400" : "border border-cyan-500" } `}>
              <span className={`text-xl font-bold ${id==2?"": "text-cyan-500"} `}>Pending</span>
              <span className={`border rounded-full  text-xl  h-8 w-8 flex justify-center items-center font-bold text-medium ${id==2?"bg-gray-400": "text-cyan-500"} `}>{pending}</span>
            </button>
            <button onClick={()=>{setId(3);setStatusFilter("POSTED")}} className={`w-auto p-3 h-11  rounded-xl gap-2 cursor-pointer  flex items-center justify-center ${id==3 ? "bg-gradient-to-r from-blue-400 to-purple-400" : "border border-cyan-500" } `}>
              <span className={`text-xl font-bold ${id==3?"": "text-cyan-500"} `}>Posted</span>
              <span className={`border rounded-full  text-xl  h-8 w-8 flex justify-center items-center font-bold text-medium ${id==3?"bg-gray-400": "text-cyan-500"} `}>{posted}</span>
            </button>
            <button onClick={()=>{setId(4);setStatusFilter("FAIL")}} className={`w-auto p-3 h-11  rounded-xl gap-2 cursor-pointer  flex items-center justify-center ${id==4 ? "bg-gradient-to-r from-blue-400 to-purple-400" : "border border-cyan-500" } `}>
              <span className={`text-xl font-bold ${id==4?"": "text-cyan-500"} `}>Failed</span>
              <span className={`border rounded-full  text-xl  h-8 w-8 flex justify-center items-center font-bold text-medium ${id==4?"bg-gray-400": "text-cyan-500"} `}>{failed}</span>
            </button>
          </div>
<div className=" mb-10 px-10 mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
  {finalPost.map((p) => {


    return (
      <div key={p.id} className="transition duration-500 hover:scale-105 hover:shadow-lg shadow-blue-500/50">
        <div className="rounded-xl border border-cyan-500 p-6 h-full flex flex-col">


          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-xl font-bold flex items-center justify-center">
              <Image
  src={`https://cdn.discordapp.com/icons/${p.guildId}/${p.guildIcon}.png`}
  alt={p.guildName}
  width={40}
  height={40}
  className="rounded-full"
/>
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight">{p.guildName}</h2>
              <h4 className="text-lg text-cyan-500 font-semibold leading-tight">
                #{p.channelName}
              </h4>
            </div>
          </div>

          <div className="mt-4 w-fit">
            <div className='relative inline-flex'>

           {p.status==="SCHEDULED" && (
            <div>
            <span
              className={`pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-r from-[#F9B233]/60 to-[#F57C00]/60 blur-lg opacity-75 animate-pulse`}
            />
            <div
              className={`relative z-10 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F9B233] to-[#F57C00] px-4 py-2`}
            >
              <Clock className="h-5 w-5" />
              <span className="text-lg font-semibold">Pending</span>
            </div>

            </div>
           )}

           {p.status==="POSTED" &&(
            <div>
              <span
              className={`pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-r from-green-500/60 to-emerald-500/60 blur-lg opacity-75 animate-pulse`}
            />
            <div
              className={`relative z-10 flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2`}
            >
              <CircleCheck className="h-5 w-5" />
              <span className="text-lg font-semibold">Posted</span>
            </div>
            </div>
           )}

          {p.status==="FAIL" && (
            <div>
                <span
              className={`pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-r from-red-500/60 to-orange-500/60 blur-lg opacity-75 animate-pulse`}
            />
            <div
              className={`relative z-10 flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500/60 to-orange-500/60 px-4 py-2`}
            >
              <OctagonAlert className="h-5 w-5" />
              <span className="text-lg font-semibold">Failed</span>
            </div>
            </div>
          )}



            </div>
          </div>

          <div className="mt-4">
            <span className="text-lg font-semibold line-clamp-4">
              {p.generatedContent}
            </span>
          </div>


          <div className="mt-5 relative h-64 rounded-xl overflow-hidden bg-slate-800">
            {p.imageUrls.length>0 ? (
              <Image src={p.imageUrls[0]} alt="Image Failed" fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500 text-sm">
                No image
              </div>
            )}
          </div>


          <div className="mt-auto pt-4">
            <span className="text-cyan-500">
             Scheduled : { new Date(p.scheduledFor).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
            </span>

            {p.status === "SCHEDULED" && (
              <div className="flex gap-4 mt-4">
                <button className="flex cursor-pointer justify-center items-center bg-cyan-700 w-full py-2 rounded-xl scale-100 hover:scale-110 transition ease-in-out duration-500" onClick={()=>{
                  setSelectedPost(String(p.id));
                  setSelectedChannel(p.channelName||"");
                  seteditOpen(true);
                  setSelectedContent(p.generatedContent||"");

                }}>
                  <Pencil className="mr-2" />
                  <span className='text-lg font-md'>Edit</span>
                </button>
                <button onClick={()=>{setSelectedPost(String(p.id));setDeletePost(true)}} className="flex justify-center items-center  bg-red-600 w-full py-2 rounded-xl cursor-pointer scale-100 hover:scale-110 transition ease-in-out duration-500">
                  <Trash2 className="mr-2" />
                   <span className='text-lg font-md'>Delete</span>
                </button>
                {/* <button className="flex justify-center items-center bg-red-600 px-2 py-2 rounded-xl cursor-pointer scale-100 hover:scale-110 transition ease-in-out duration-500">
                  <Trash2 />
                </button> */}
              </div>
            )}
          </div>

        </div>
      </div>
    );
  })}
</div>


                    </div>
                )}



        </div>
     {editOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
          onClick={() => seteditOpen(false)}
        />
      )}

  {editOpen && (

        <div className="fixed inset-y-0 right-0 z-50 w-[420px] ">
          <Drawer open={editOpen} onSaved={fetchPosts} initialContent={selectedContent} initialChannel={selectedChannel} post={selectedPost} onClose={()=>{
            seteditOpen(false)
            setSelectedPost("")
          }} />

        </div>
  )}

  {deletePost && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"

        />
      )}
 {deletePost && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-[420px] bg-gray-900 p-6 rounded-xl">
      <Delete post={selectedPost} onSaved={fetchPosts} onClose={()=>{
                    setDeletePost(false);
                    setSelectedPost("")
                  }}  />
    </div>
  </div>
)}


        </>
    )
}