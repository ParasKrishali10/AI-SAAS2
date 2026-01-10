"use client"
import { AnimatePresence, motion } from "framer-motion"
import { AnimatedReactions } from "./Emoji"
import { useCallback, useEffect, useRef, useState } from "react"
import axios from "axios"
import { useUserInfo } from "@/lib/userInfo"
import Truck from "@/components/Truck"
import FloatingSidebar from "@/components/Sidebar"
import ASkelton from "@/components/ASkelton"

interface PostProps {
  date: string
  source: string
  channel: string
  message: string
  time: string
  status: string
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
interface TransformedPost {
  id: string;
  source: string;
  channel: string | null;
  message: string | null;
  time: string;
  status: string;
}

interface GroupedPosts {
  date: string;
  posts: TransformedPost[];
}


export default function Timeline() {
     const userId=useUserInfo(s=>s.userId)
    const [groupPost,setGroupPost]=useState<GroupedPosts[]>([])
    const [cursor,setCursor]=useState("")
    const [loading,setLoading]=useState(true)
    const loaderRef=useRef<HTMLDivElement|null>(null)
    const [cursorLoading,setCursorLoading]=useState(false)
    const fetchPosts=useCallback(async()=>{

        const response=await axios.get(`/api/posts/fetching/?userId=${userId}&cursor=${cursor}`)
        const posts=response.data.postWithServerInfo ||[]
        setCursor(response.data.nextCursor)
        console.log(posts)
       const transformed = transformScheduledPosts(posts)

setGroupPost(prev=>{
  if(prev.length===0) return transformed
  return [...prev,...transformed]
})
    },[userId,cursor])
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

    useEffect(() => {
  if (groupPost.length === 0) return
  // console.log(" Final grouped posts:", groupPost)
}, [groupPost])



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


    const formatDate=(date:Date)=>{
      return date.toLocaleDateString("en-IN")
    }
    const toDateKey = (date: Date) =>
  date.toISOString().split("T")[0]


    const formatTime=(date:Date)=>{
      return date.toLocaleTimeString("en-IN",{
        hour:"2-digit",
        minute:"2-digit",
        hour12:true
      })
    }

    const transformScheduledPosts = (
  data: ScheduledPosts[]
): GroupedPosts[] => {

  const filtered = data.filter(
    d => d.status?.toUpperCase() === "POSTED"
  )

  const grouped: Record<string, GroupedPosts & { sortKey: number }> = {}

  filtered.forEach((post) => {
    const scheduledDate = new Date(post.scheduledFor)

    if (isNaN(scheduledDate.getTime())) return

    const dateKey = toDateKey(scheduledDate)

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: formatDate(scheduledDate), // display only
        sortKey: scheduledDate.setHours(0, 0, 0, 0),
        posts: [],
      }
    }

    grouped[dateKey].posts.push({
      id: post.id,
      source: post.guildName,
      channel: post.channelName
        ? `#${post.channelName}`
        : null,
      message: post.generatedContent,
      time: formatTime(scheduledDate),
      status: post.status,
    })
  })

  return Object.values(grouped)
    .sort((a, b) => b.sortKey - a.sortKey)
    .map(({ sortKey, ...rest }) => rest)
}






  const limitWords=(text:string):string=>{

    return text.substring(0,100)+"....."
  }
return (
    <div className="flex min-h-screen bg-[#020617] w-full">
      {/* SIDEBAR AREA - Integrated directly */}
      <div className="w-20 flex-shrink-0 sticky top-0 h-screen z-50">
        <FloatingSidebar />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 min-w-0 pr-6 relative overflow-x-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] -z-10 pointer-events-none" />

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-slate-950 z-[60]">
            <Truck />
          </div>
        )}

        {!loading && (
          <>
            {/* Header Section */}
            <div className="w-full pt-10 pb-8 relative">
              <div className="pl-12 pr-6 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                  <span>Main Dashboard</span>
                  <span className="text-slate-800">/</span>
                  <span className="text-blue-500">Content Analytics</span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <h1 className="text-5xl font-extrabold text-white tracking-tight">
                      Activity <span className="text-blue-600">Timeline</span>
                    </h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">
                      Reviewing post performance across all connected channels.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      Live Updates
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline List Section */}
            <div className="w-full relative pl-8 pr-4 py-10">
              {/* Main Vertical Line */}
              <div className="absolute left-6 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-400 via-indigo-500 to-transparent shadow-[0_0_16px_rgba(34,211,238,0.4)]" />

              <AnimatePresence>
                {groupPost.map((group, index) => (
                  <div key={index} className="mb-16 relative">
                    <div className="relative z-10 mb-8 w-fit -translate-x-1/2 left-6 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-1 text-sm font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                      {group.date}
                    </div>

                    {group.posts.map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                        className="relative mb-8 pl-12"
                      >
                        {/* The Glowing Dot */}
                        <div className="absolute left-6 top-7 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-20 animate-pulse" />

                        {/* GLASSPHORISM CARD */}
                        <div className="w-full group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 px-6 py-5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.06] hover:scale-[1.01] hover:border-white/20">

                          {/* 1. MOVING BORDER (Trace Effect) */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <div className="absolute inset-0 border border-transparent [border-image:linear-gradient(to_right,transparent,theme(colors.cyan.400),theme(colors.indigo.500),transparent)1] rounded-2xl" />
                          </div>

                          {/* 2. SHINE EFFECT */}
                          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine-on-hover" />
                          </div>

                          <div className="relative z-20">
                            <div className="flex items-start justify-between">
                              <div className="font-bold text-lg text-slate-100 tracking-tight">
                                {post.source} – <span className="text-cyan-400 font-medium">{post.channel}</span>
                              </div>

                              <div className="text-right">
                                <div className="text-cyan-300 font-mono text-sm">{post.time}</div>
                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 text-[10px] font-bold text-green-400 uppercase mt-1">
                                  <span className="h-1 w-1 rounded-full bg-green-400" />
                                  Posted
                                </div>
                              </div>
                            </div>

                            <p className="mt-3 text-slate-400 leading-relaxed text-md group-hover:text-slate-100 transition-colors duration-300">
                              {limitWords(post.message ?? "")}
                            </p>

                            <div className="absolute -top-2 right-32 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                              <AnimatedReactions
                                messageId={String(post.id)}
                                onClose={() => setLoading(false)}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </AnimatePresence>
              {cursor &&
               <div ref={loaderRef} style={{ height: 20 }} >
                <ASkelton/>
                <ASkelton/>
               </div>
              }
            </div>
          </>
        )}
      </div>
    </div>
  )
}