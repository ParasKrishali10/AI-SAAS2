"use client"
import { AnimatePresence, motion } from "framer-motion"
import { AnimatedReactions } from "./Emoji"
import { useEffect, useState } from "react"
import axios from "axios"
import { useUserInfo } from "@/lib/userInfo"
import toast from "react-hot-toast"

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
  id: number;
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
    const [timeliners,setTimeliners]=useState<ScheduledPosts[]>([])


    useEffect(()=>{
        const fetchPosts=async()=>{
          toast("fetch post work")
            const response=await axios.get(`/api/posts/?userId=${userId}`)
            const posts=await response.data ||[]
            setTimeliners(posts)
            console.log(posts)
           setGroupPost(transformScheduledPosts(posts))
        }
        fetchPosts()
    },[userId])

    const formatDate=(date:Date)=>{
      return date.toLocaleDateString("en-IN")
    }

    const formatTime=(date:Date)=>{
      return date.toLocaleTimeString("en-IN",{
        hour:"2-digit",
        minute:"2-digit",
        hour12:true
      })
    }

    const transformScheduledPosts=(data:ScheduledPosts[]):GroupedPosts[]=>{
       toast("transdofm post work")
       console.log(data.map(d => d.status))

       const filtered=data.filter(d=>d.status==="POSTED")
     const grouped: Record<string, GroupedPosts> = {}

  filtered.forEach((post) => {
    const scheduledDate = new Date(post.scheduledFor)

    const dateKey = formatDate(scheduledDate)

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: dateKey,
        posts: [],
      }
    }

    grouped[dateKey].posts.push({
      id: Number(post.id),
      source: post.guildName,
      channel: post.channelName
        ? `#${post.channelName}`
        : null,
      message: post.generatedContent,
      time: formatTime(scheduledDate),
      status: post.status,
    })
  })

  console.log(grouped)
  return Object.values(grouped).sort(
    (a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime()
  )
    }




  const limitWords=(text:string):string=>{

    return text.substring(0,100)+"....."
  }

  return (
    <div className="relative px-8 py-10">

      <div className="absolute left-6 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-400 to-indigo-500 shadow-[0_0_16px_rgba(34,211,238,0.6)]" />

      {groupPost.map((group) => (
        <div key={group.date} className="mb-16 relative">

          <div className="relative z-10 mb-6 w-fit -translate-x-1/2 left-6 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-1 text-sm font-semibold text-white shadow-lg">
            {group.date}
          </div>

        <AnimatePresence>
          {group.posts.map((post) => (
           <motion.div
  key={post.id}
  initial={{ opacity: 0, x: -80 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{
    type: "spring",
    stiffness: 140,
    damping: 22,
  }}
  className="relative mb-6 pl-12"
>


              <motion.div
  animate={{ scale: [1, 1.25, 1] }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute left-6 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)]"
/>


              <div className="rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-950/90 backdrop-blur-xl px-6 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.7)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-600">

                <div className="flex items-start justify-between">
                  <div className="font-semibold text-slate-100">
                    {post.source} –{" "}
                    <span className="text-cyan-400">{post.channel}</span>
                  </div>

                  <div className="text-right text-sm">
                    <div className="text-cyan-300">{post.time}</div>
                    <div
                      className={`font-medium ${
                        post.status === "POSTED"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {post.status === "POSTED" ? "Posted" : "Failed"}
                    </div>
                  </div>
                </div>


                <p className="mt-2 text-slate-300 leading-relaxed">
                   {limitWords(post.message ?? "")}
                </p>
                <div className="absolute -top-0 right-24">
        <AnimatedReactions />
      </div>

              </div>
            </motion.div>
          ))}

</AnimatePresence>
        </div>
      ))}
    </div>
  )
}