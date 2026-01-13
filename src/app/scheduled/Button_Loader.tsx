"use client"
import { Clock,CircleCheck,OctagonAlert,Pencil,Copy,Trash2, TableOfContents, Grid2x2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from "react"
import Image from 'next/image';
import Drawer from './Drawer';
import { useUserInfo } from '@/lib/userInfo';
import toast from 'react-hot-toast';
import axios from "axios";
import Delete from './Delete';
import { MainLoader } from '@/components/MainLoader';
import { pusherClient } from '@/lib/pusher-client';
import FloatingSidebar from '@/components/Sidebar';
import PostCardSkeleton from './PostCard';
import Truck from '@/components/Truck';
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
    const [cursor,setCursor]=useState("")
    const loaderRef=useRef<HTMLDivElement|null>(null)
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


useEffect(() => {
  if (post.length > 0) setLoading(false)
}, [post.length])


  useEffect(()=>{
    document.documentElement.style.overflow=editOpen ?"hidden":""
    document.body.style.overflow=editOpen?"hidden":""
    return ()=>{
      document.documentElement.style.overflow=""
      document.body.style.overflow=""
    }
  },[editOpen])




  const fetchPosts=useCallback(async()=>{
      try{
        console.log("helel")
        const response=await axios.get(`/api/posts/fetching/?userId=${userId}&cursor=${cursor}`)
        const posts=response.data.postWithServerInfo ||[]
        setCursor(response.data.nextCursor)
       posts.forEach((p:any) => {
  if (p.status === "POSTED") {
    setPosted(prev => prev + 1)
  } else if (p.status === "FAIL") {
    setFailed(prev => prev + 1)
  } else {
    setPending(prev => prev + 1)
  }
})

       setAll(prev => prev + posts.length)
        setPost(prev => [...prev, ...posts])
    setFinalPost(prev => [...prev, ...posts])
      }catch(error)
      {
        console.log(error)
        toast.error("Error in collecting the posts")
        return
      }
    },[userId,cursor])


    useEffect(()=>{
    if(!loaderRef.current || !cursor){
      return
    }
    const observer=new IntersectionObserver(
      (entries)=>{
        if(entries[0].isIntersecting)
        {
          fetchPosts()
        }
      },{threshold:1}
    )
    observer.observe(loaderRef.current)
        return ()=>observer.disconnect()

    },[cursor])

    useEffect(() => {
  const load = async () => {
    try {
      await fetchPosts()
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (userId) load()
}, [userId])

  return (
    <>
      {/* MAIN LAYOUT: Flexbox ensures side-by-side alignment */}
      <div className="flex min-h-screen bg-slate-950 selection:bg-cyan-500/30 selection:text-cyan-200">

        {/* 1. SIDEBAR COLUMN */}
        {/* Sticky keeps it fixed while scrolling, but 'relative' to the flex flow */}
        {!loading && (

        <div className="w-20 flex-shrink-0 z-50 relative">
            <div className="sticky top-0 h-screen w-full">
                <FloatingSidebar />
            </div>
        </div>
        )}

        {/* 2. MAIN CONTENT COLUMN */}
        {/* flex-1 makes it take all remaining width */}
        <div className="flex-1 min-w-0 relative flex flex-col">

            {/* Background Ambient Glow (Scoped to main content) */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]"></div>
            </div>

            {/* Content Wrapper (Above Background) */}
            <div className="relative z-10">
                {loading && (
                    <div className="min-h-screen flex justify-center items-center backdrop-blur-sm">
                        <Truck/>                   </div>
                )}

                {!loading && (
                    <>

                        <div className="sticky top-0 z-40 w-full  ">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

                            <div className="px-5 py-10 flex justify-between items-end">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500">
                                        <span className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">Main Dashboard</span>
                                        <span className="text-cyan-800 font-bold">/</span>
                                        <span className="text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">Scheduled Post</span>
                                    </div>
                                    <div className="relative">
                                        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
                                            Scheduled <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-lg">Posts</span>
                                        </h1>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </span>
                                            <p className="text-slate-400 text-xs font-mono tracking-wide uppercase">Your Posts Are Ready to Go Live</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative Badge */}
                                <div className="hidden md:block pb-2">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-cyan-500/20 bg-cyan-950/10 backdrop-blur-md">
                                        <div className="w-1.5 h-1.5 rounded-sm bg-cyan-500 animate-pulse"></div>
                                        <span className="text-[10px] font-mono text-cyan-400 tracking-widest">SYNCED</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- SEARCH BAR --- */}
                        <div className="px-5 pt-8">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                                <div className="relative flex items-center bg-slate-900 rounded-xl border border-white/10">
                                    <div className="pl-4 text-slate-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                    </div>
                                    <input
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        type="text"
                                        placeholder="Search query..."
                                        className="w-full p-4 bg-transparent text-white text-lg focus:outline-none placeholder:text-slate-600 font-light tracking-wide"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* --- FILTERS --- */}
                        <div className="mt-8 px-5 flex flex-wrap gap-4">
                            {[
                                { id: 1, label: "All Systems", count: all, filter: "ALL" },
                                { id: 2, label: "Pending", count: pending, filter: "SCHEDULED" },
                                { id: 3, label: "Deployed", count: posted, filter: "POSTED" },
                                { id: 4, label: "Failed", count: failed, filter: "FAIL" },
                            ].map((btn) => (
                                <button
                                    key={btn.id}
                                    onClick={() => { setId(btn.id); setStatusFilter(btn.filter); }}
                                    className={`relative overflow-hidden w-auto px-6 py-3 rounded-xl gap-3 cursor-pointer flex items-center justify-center transition-all duration-300 border ${id === btn.id ? "bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "bg-slate-900/50 border-white/10 hover:border-white/30 hover:bg-slate-800"}`}
                                >
                                    <span className={`text-lg font-bold tracking-wide ${id === btn.id ? "text-cyan-400" : "text-slate-400"}`}>{btn.label}</span>
                                    <span className={`rounded-md px-2 py-0.5 text-sm font-mono font-bold ${id === btn.id ? "bg-cyan-500 text-black" : "bg-slate-800 text-slate-500 border border-white/5"}`}>{btn.count}</span>
                                </button>
                            ))}
                        </div>

                        {/* --- GRID --- */}
                        <div className="mb-10 px-5 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                            {finalPost.map((p,index) => {
                                return (
                                    <div key={index} className="group relative transition-all duration-500 hover:-translate-y-2">
                                        {/* ... (Keep your existing Card Code exactly the same) ... */}
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative h-full flex flex-col rounded-2xl bg-slate-950/90 border border-white/10 backdrop-blur-xl p-6 overflow-hidden shadow-2xl">
                                             {/* Card Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-cyan-400 blur-sm rounded-full opacity-50"></div>
                                                        <Image src={`https://cdn.discordapp.com/icons/${p.guildId}/${p.guildIcon}.png`} alt={p.guildName} width={42} height={42} className="relative rounded-full border border-white/20 z-10" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h2 className="text-lg font-bold text-white tracking-wide">{p.guildName}</h2>
                                                        <h4 className="text-xs font-mono text-cyan-400 tracking-wider">#{p.channelName}</h4>
                                                    </div>
                                                </div>
                                                {/* Status Badges */}
                                                <div>
                                                    {p.status === "SCHEDULED" && (
                                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                                                        <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                                        </span>
                                                        <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Pending</span>
                                                    </div>
                                                    )}
                                                    {p.status === "POSTED" && (
                                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                                        <CircleCheck className="h-3 w-3 text-emerald-500" />
                                                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Posted</span>
                                                    </div>
                                                    )}
                                                    {p.status === "FAIL" && (
                                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                                                        <OctagonAlert className="h-3 w-3 text-red-500" />
                                                        <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Failed</span>
                                                    </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="mb-4">
                                                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                                                    <p className="text-sm text-slate-300 font-light leading-relaxed line-clamp-3">{p.generatedContent}</p>
                                                </div>
                                            </div>

                                            {/* Image */}
                                            <div className="group/image relative h-48 w-full rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                                                {p.imageUrls.length > 0 ? (
                                                    <>
                                                    <Image src={p.imageUrls[0]} alt="Content" fill className="object-cover transition-transform duration-700 group-hover/image:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                                                    </>
                                                ) : (
                                                    <div className="flex h-full items-center justify-center flex-col gap-2 text-slate-600">
                                                    <div className="h-10 w-10 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center"><span className="text-xs">IMG</span></div>
                                                    <span className="text-xs font-mono">NO SIGNAL</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-auto pt-5">
                                                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                                                    <span className="text-[10px] uppercase text-slate-500 font-mono tracking-widest">Target Date</span>
                                                    <span className="text-xs font-mono text-cyan-300">
                                                    {new Date(p.scheduledFor).toLocaleString("en-IN", { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: true })}
                                                    </span>
                                                </div>
                                                {p.status === "SCHEDULED" && (
                                                    <div className="grid grid-cols-2 gap-3">
                                                    <button onClick={() => { setSelectedPost(String(p.id)); setSelectedChannel(p.channelName || ""); seteditOpen(true); setSelectedContent(p.generatedContent || ""); }} className="flex items-center justify-center gap-2 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95">
                                                        <Pencil className="h-4 w-4" /><span className="text-sm font-semibold">Edit</span>
                                                    </button>
                                                    <button onClick={() => { setSelectedPost(String(p.id)); setDeletePost(true); }} className="flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] active:scale-95">
                                                        <Trash2 className="h-4 w-4" /><span className="text-sm font-semibold">Delete</span>
                                                    </button>
                                                    </div>
                                                )}
                                                {p.status !== "SCHEDULED" && (
                                                    <div className="w-full py-2 rounded-lg border border-white/5 bg-white/5 text-center text-slate-500 text-xs font-mono cursor-not-allowed">
                                                    ARCHIVED // READ ONLY
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                          {cursor &&
                              <div ref={loaderRef} style={{ height: 20 }} >
                                <PostCardSkeleton/>
                                <PostCardSkeleton/>
                              </div>
                           }
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>

      {/* Modals & Drawers */}
      {editOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md" onClick={() => seteditOpen(false)} />
      )}
      {editOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-[420px]">
          <Drawer open={editOpen} onSaved={fetchPosts} initialContent={selectedContent} initialChannel={selectedChannel} post={selectedPost} onClose={() => { seteditOpen(false); setSelectedPost(""); }} />
        </div>
      )}
      {deletePost && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md" />
      )}
      {deletePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="w-[420px] bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-2xl">
            <Delete post={selectedPost} onSaved={fetchPosts} onClose={() => { setDeletePost(false); setSelectedPost(""); }} />
          </div>
        </div>
      )}
    </>
  );
}