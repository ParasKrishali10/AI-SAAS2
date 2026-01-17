"use client"

import { useRef } from "react"
import { useInView } from "@/lib/use-in-view"
import { Calendar, Clock, Globe, Repeat, BarChart3, Hash, ChevronRight, MoreHorizontal } from "lucide-react"
import Image from "next/image"
export default function SmartScheduling() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden bg-slate-950">

       <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isInView ? "animate-slide-in-right" : "opacity-0"}`}>

          <div className={`relative order-2 lg:order-1 ${isInView ? "animate-float" : ""}`}>

            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-3xl blur-3xl transform -rotate-3 scale-95" />
              <Image src="/Gen.jpeg" alt="AI Interface" width={0} height={0} sizes="100vw" className="w-full h-autorelative z-10 rounded-xl border border-white/10 shadow-2xl" />
          </div>

          <div className="order-1 lg:order-2">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Clock className="w-3 h-3" />
              <span>Precision Tools</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="block text-slate-200">Smart Post</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                Scheduling
              </span>
            </h2>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Never miss peak engagement hours. Schedule posts for any timezone, set recurring announcements, and let our system handle the rest while you sleep.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Advanced Scheduling", icon: Clock, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
                { title: "Global Timezones", icon: Globe, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                { title: "Recurring Loops", icon: Repeat, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
                { title: "Smart Analytics", icon: BarChart3, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                  <div className={`p-2 rounded-lg ${item.bg} ${item.color} ${item.border} border group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white">{item.title}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}