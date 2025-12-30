"use client"
import { Clock,CircleCheck,OctagonAlert,Pencil,Copy,Trash2 } from 'lucide-react';
import { useState } from "react"
import Image from 'next/image';
type PostStatus = "pending" | "posted" | "failed";
type Post={
  id:number,
  status:PostStatus,
  initials:string,
  server:string,
  channel:string,
  content:string,
  images:string
}
export default function Button(){
    const [allNo,setAllNo]=useState(5)
    const [id,setId]=useState(1)
   const STATUS_UI = {
  pending: {
    label: "Pending",
    glow: "from-[#F9B233]/60 to-[#F57C00]/60",
    bg: "from-[#F9B233] to-[#F57C00]",
    icon: Clock,
  },
  posted: {
    label: "Posted",
    glow: "from-green-500/60 to-emerald-500/60",
    bg: "from-green-500 to-emerald-500",
    icon: CircleCheck,
  },
  failed: {
    label: "Failed",
    glow: "from-red-500/60 to-orange-500/60",
    bg: "from-red-500 to-orange-500",
    icon: OctagonAlert,
  },
} as const;

    const posts: Post[]=[{id:1,status:"pending",initials:"D",server:"Ghost Server",channel:"general",content:"Excited to announce our new AI features! 🚀 We've implemented advanced automation that will save you hours every week. Check out the full feature list in our blog post.",images:"/dp.jpg"},
  {
    id: 2,
    status: "posted",
    initials: "A",
    server: "Dev Hub",
    channel: "announcements",
    content: "🎉 Version 2.1 is live! This update includes performance improvements, bug fixes, and a smoother onboarding experience.",
    images: "/dp.jpg"
  },
  {
    id: 3,
    status: "failed",
    initials: "M",
    server: "Marketing Team",
    channel: "campaigns",
    content: "Our summer campaign is officially launching today. 🌞 Stay tuned for exclusive offers and behind-the-scenes content.",
    images: "/PC.jpg"
  },
  {
    id: 4,
    status: "pending",
    initials: "S",
    server: "Startup Lounge",
    channel: "ideas",
    content: "💡 What features would you like to see next? Drop your suggestions below and help shape our roadmap.",
    images: "/SM.jpg"
  },
  {
    id: 5,
    status: "posted",
    initials: "J",
    server: "Product Updates",
    channel: "releases",
    content: "We've rolled out a new dashboard design ✨ Cleaner layout, faster load times, and better insights at a glance.",
    images: "/dp.jpg"
  },
  {
    id: 6,
    status: "pending",
    initials: "L",
    server: "AI Lab",
    channel: "research",
    content: "🤖 Our latest experiment shows promising results in model accuracy and response time. Full report coming soon.",
    images: "/PC.jpg"
  },
  {
    id: 7,
    status: "posted",
    initials: "K",
    server: "Community Server",
    channel: "general",
    content: "Thanks everyone for the amazing feedback last week! 🙌 We're already working on the most requested improvements.",
    images: "/PC.jpg"
  },
  {
    id: 8,
    status: "failed",
    initials: "R",
    server: "Support Desk",
    channel: "alerts",
    content: "⚠️ Scheduled maintenance was planned for tonight, but we'll be rescheduling to avoid peak usage hours.",
    images: ""
  },
  {
    id: 9,
    status: "pending",
    initials: "T",
    server: "Design Team",
    channel: "showcase",
    content: "🎨 Sneak peek at our upcoming UI refresh. Let us know what you think of the new color palette and layout.",
    images: "/dp.jpg"
  },
  {
    id: 10,
    status: "posted",
    initials: "E",
    server: "Engineering",
    channel: "updates",
    content: "Backend optimizations are complete ⚙️ Expect faster response times and improved reliability across the platform.",
    images: "/SM.jpg"
  }]
    return (
        <div>
             <div className='px-10 '>
              <input type="text" placeholder='Search Posts,channels,servers' className='border w-full p-3 text-cyan-600 text-lg rounded-lg border border-cyan-900 focus:outline-none focus:border-cyan-500'/>
            </div>
          <div className='mt-5 px-10 flex gap-4'>
            <button onClick={()=>setId(1)} className={`w-auto p-3 h-11  rounded-xl gap-2 cursor-pointer  flex items-center justify-center ${id==1 ? "bg-gradient-to-r from-blue-400 to-purple-400" : "border border-cyan-500" } `}>
              <span className={`text-xl font-bold ${id==1?"": "text-cyan-500"} `}>All</span>
              <span className={`border rounded-full  text-xl  h-8 w-8 flex justify-center items-center font-bold  text-medium ${id==1?"bg-gray-400": "text-cyan-500"} `}>{allNo}</span>
            </button>
            <button onClick={()=>setId(2)} className={`w-auto p-3 h-11  rounded-xl gap-2 cursor-pointer  flex items-center justify-center ${id==2 ? "bg-gradient-to-r from-blue-400 to-purple-400" : "border border-cyan-500" } `}>
              <span className={`text-xl font-bold ${id==2?"": "text-cyan-500"} `}>Pending</span>
              <span className={`border rounded-full  text-xl  h-8 w-8 flex justify-center items-center font-bold text-medium ${id==2?"bg-gray-400": "text-cyan-500"} `}>{allNo}</span>
            </button>
            <button onClick={()=>setId(3)} className={`w-auto p-3 h-11  rounded-xl gap-2 cursor-pointer  flex items-center justify-center ${id==3 ? "bg-gradient-to-r from-blue-400 to-purple-400" : "border border-cyan-500" } `}>
              <span className={`text-xl font-bold ${id==3?"": "text-cyan-500"} `}>Posted</span>
              <span className={`border rounded-full  text-xl  h-8 w-8 flex justify-center items-center font-bold text-medium ${id==3?"bg-gray-400": "text-cyan-500"} `}>{allNo}</span>
            </button>
            <button onClick={()=>setId(4)} className={`w-auto p-3 h-11  rounded-xl gap-2 cursor-pointer  flex items-center justify-center ${id==4 ? "bg-gradient-to-r from-blue-400 to-purple-400" : "border border-cyan-500" } `}>
              <span className={`text-xl font-bold ${id==4?"": "text-cyan-500"} `}>Failed</span>
              <span className={`border rounded-full  text-xl  h-8 w-8 flex justify-center items-center font-bold text-medium ${id==4?"bg-gray-400": "text-cyan-500"} `}>{allNo}</span>
            </button>
          </div>
<div className="mb-10 px-10 mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
  {posts.map((p) => {
    const status = STATUS_UI[p.status];
    const Icon = status.icon;

    return (
      <div key={p.id} className="transition duration-500 hover:scale-105 hover:shadow-lg shadow-blue-500/50">
        <div className="rounded-xl border border-cyan-500 p-6 h-full flex flex-col">


          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-xl font-bold flex items-center justify-center">
              {p.initials}
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight">{p.server}</h2>
              <h4 className="text-lg text-cyan-500 font-semibold leading-tight">
                #{p.channel}
              </h4>
            </div>
          </div>

          <div className="mt-4 w-fit">
            <div className='relative inline-flex'>

            <span
              className={`pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-r ${status.glow} blur-lg opacity-75 animate-pulse`}
            />
            <div
              className={`relative z-10 flex items-center gap-2 rounded-xl bg-gradient-to-r ${status.bg} px-4 py-2`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-lg font-semibold">{status.label}</span>
            </div>

            </div>
          </div>

          <div className="mt-4">
            <span className="text-lg font-semibold line-clamp-4">
              {p.content}
            </span>
          </div>


          <div className="mt-5 relative h-64 rounded-xl overflow-hidden bg-slate-800">
            {p.images ? (
              <Image src={p.images} alt="Image Failed" fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500 text-sm">
                No image
              </div>
            )}
          </div>


          <div className="mt-auto pt-4">
            <span className="text-cyan-500">
              Scheduled: 12/31/2025 10:22 PM
            </span>

            {p.status === "pending" && (
              <div className="flex gap-4 mt-4">
                <button className="flex cursor-pointer justify-center items-center bg-cyan-700 w-full py-2 rounded-xl scale-100 hover:scale-110 transition ease-in-out duration-500">
                  <Pencil className="mr-2" />
                  <span className='text-lg font-md'>Edit</span>
                </button>
                <button className="flex justify-center items-center bg-purple-600 w-full py-2 rounded-xl cursor-pointer scale-100 hover:scale-110 transition ease-in-out duration-500">
                  <Copy className="mr-2" />
                   <span className='text-lg font-md'>Duplicate</span>
                </button>
                <button className="flex justify-center items-center bg-red-600 px-2 py-2 rounded-xl cursor-pointer scale-100 hover:scale-110 transition ease-in-out duration-500">
                  <Trash2 />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  })}
</div>




        </div>
    )
}