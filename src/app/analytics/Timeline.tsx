"use client"
import { AnimatePresence, motion } from "framer-motion"
import { AnimatedReactions } from "./Emoji"

interface PostProps {
  date: string
  source: string
  channel: string
  message: string
  time: string
  status: string
}

export default function Timeline() {
  const timelineData = [
    {
      date: "12/30/2025",
      posts: [
        {
          id: 1,
          source: "Dev Community",
          channel: "#news",
          message:
            "Check out our latest tutorial on building Discord bots with AI integration.",
          time: "09:28 PM",
          status: "posted",
        },
        {
          id: 2,
          source: "Dev Community",
          channel: "#announcements",
          message:
            "We’ve released a new SDK version with performance improvements and bug fixes.",
          time: "06:10 PM",
          status: "posted",
        },
      ],
    },
    {
      date: "01/03/2026",
      posts: [
        {
          id: 3,
          source: "Marketing Team",
          channel: "#campaigns",
          message:
            "New blog post is live! Learn the best practices for Discord automation in 2024.",
          time: "09:28 PM",
          status: "posted",
        },
        {
          id: 4,
          source: "Marketing Team",
          channel: "#campaigns",
          message:
            "Scheduled email campaign failed due to missing audience segment.",
          time: "07:02 PM",
          status: "failed",
        },
      ],
    },
    {
      date: "01/04/2026",
      posts: [
        {
          id: 5,
          source: "Support Guild",
          channel: "#updates",
          message:
            "We’re experiencing high server load. Our team is working on a fix. Updates coming soon.",
          time: "06:28 PM",
          status: "failed",
        },
        {
          id: 6,
          source: "Support Guild",
          channel: "#updates",
          message:
            "Server stability has improved. Monitoring continues over the next 24 hours.",
          time: "08:14 PM",
          status: "posted",
        },
      ],
    },
    {
      date: "01/04/2026",
      posts: [
        {
          id: 5,
          source: "Support Guild",
          channel: "#updates",
          message:
            "We’re experiencing high server load. Our team is working on a fix. Updates coming soon.",
          time: "06:28 PM",
          status: "failed",
        },
        {
          id: 6,
          source: "Support Guild",
          channel: "#updates",
          message:
            "Server stability has improved. Monitoring continues over the next 24 hours.",
          time: "08:14 PM",
          status: "posted",
        },
      ],
    },
    {
      date: "01/04/2026",
      posts: [
        {
          id: 5,
          source: "Support Guild",
          channel: "#updates",
          message:
            "We’re experiencing high server load. Our team is working on a fix. Updates coming soon.",
          time: "06:28 PM",
          status: "failed",
        },
        {
          id: 6,
          source: "Support Guild",
          channel: "#updates",
          message:
            "Server stability has improved. Monitoring continues over the next 24 hours.",
          time: "08:14 PM",
          status: "posted",
        },
      ],
    },
    {
      date: "01/04/2026",
      posts: [
        {
          id: 5,
          source: "Support Guild",
          channel: "#updates",
          message:
            "We’re experiencing high server load. Our team is working on a fix. Updates coming soon.",
          time: "06:28 PM",
          status: "failed",
        },
        {
          id: 6,
          source: "Support Guild",
          channel: "#updates",
          message:
            "Server stability has improved. Monitoring continues over the next 24 hours.",
          time: "08:14 PM",
          status: "posted",
        },
      ],
    },
    {
      date: "01/04/2026",
      posts: [
        {
          id: 5,
          source: "Support Guild",
          channel: "#updates",
          message:
            "We’re experiencing high server load. Our team is working on a fix. Updates coming soon.",
          time: "06:28 PM",
          status: "failed",
        },
        {
          id: 6,
          source: "Support Guild",
          channel: "#updates",
          message:
            "Server stability has improved. Monitoring continues over the next 24 hours.",
          time: "08:14 PM",
          status: "posted",
        },
      ],
    },
    {
      date: "01/04/2026",
      posts: [
        {
          id: 5,
          source: "Support Guild",
          channel: "#updates",
          message:
            "We’re experiencing high server load. Our team is working on a fix. Updates coming soon.",
          time: "06:28 PM",
          status: "failed",
        },
        {
          id: 6,
          source: "Support Guild",
          channel: "#updates",
          message:
            "Server stability has improved. Monitoring continues over the next 24 hours.",
          time: "08:14 PM",
          status: "posted",
        },
      ],
    },
    {
      date: "01/04/2026",
      posts: [
        {
          id: 5,
          source: "Support Guild",
          channel: "#updates",
          message:
            "We’re experiencing high server load. Our team is working on a fix. Updates coming soon.",
          time: "06:28 PM",
          status: "failed",
        },
        {
          id: 6,
          source: "Support Guild",
          channel: "#updates",
          message:
            "Server stability has improved. Monitoring continues over the next 24 hours.",
          time: "08:14 PM",
          status: "posted",
        },
      ],
    },
    {
      date: "01/04/2026",
      posts: [
        {
          id: 5,
          source: "Support Guild",
          channel: "#updates",
          message:
            "We’re experiencing high server load. Our team is working on a fix. Updates coming soon.",
          time: "06:28 PM",
          status: "failed",
        },
        {
          id: 6,
          source: "Support Guild",
          channel: "#updates",
          message:
            "Server stability has improved. Monitoring continues over the next 24 hours.",
          time: "08:14 PM",
          status: "posted",
        },
      ],
    },
    {
      date: "01/04/2026",
      posts: [
        {
          id: 5,
          source: "Support Guild",
          channel: "#updates",
          message:
            "We’re experiencing high server load. Our team is working on a fix. Updates coming soon.",
          time: "06:28 PM",
          status: "failed",
        },
        {
          id: 6,
          source: "Support Guild",
          channel: "#updates",
          message:
            "Server stability has improved. Monitoring continues over the next 24 hours.",
          time: "08:14 PM",
          status: "posted",
        },
      ],
    },
  ]

  return (
    <div className="relative px-8 py-10">

      <div className="absolute left-6 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-400 to-indigo-500 shadow-[0_0_16px_rgba(34,211,238,0.6)]" />

      {timelineData.map((group) => (
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
                        post.status === "posted"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {post.status === "posted" ? "Posted" : "Failed"}
                    </div>
                  </div>
                </div>


                <p className="mt-2 text-slate-300 leading-relaxed">
                  {post.message}
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
