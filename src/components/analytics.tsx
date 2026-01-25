"use client"

import { useRef } from "react"
import { useInView } from "@/lib/use-in-view"
import { BarChart3, TrendingUp, Users, Activity, Zap, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Image from "next/image"
export default function Analytics() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden bg-slate-950">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isInView ? "animate-slide-in-left" : "opacity-0"}`}>

          <div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Activity className="w-3 h-3" />
              <span>Live Insights</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="block text-slate-200">Real-Time</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                Analytics
              </span>
            </h2>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
              Stop guessing what works. Track engagement, member growth, and reaction rates in real-time. Get actionable insights to optimize your community strategy.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {[
                { text: "Live Engagement Metrics", icon: Zap, color: "text-yellow-400" },
                { text: "Member Growth Tracking", icon: TrendingUp, color: "text-emerald-400" },
                { text: "Reaction Heatmaps", icon: PieChart, color: "text-purple-400" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                  <div className={`p-2 rounded-lg bg-slate-900 border border-white/10 ${item.color} group-hover:scale-110 transition-transform shadow-lg`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-slate-300 font-medium group-hover:text-white">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative ${isInView ? "float-tilt-in": ""}`}>

            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-3xl transform rotate-3 scale-95" />

                <Image src="/analytics.png" alt="AI Interface" width={0} height={0} sizes="100vw" className="w-full h-autorelative z-10 rounded-xl border border-white/10 shadow-2xl" />

          </div>

        </div>
      </div>
    </section>
  )
}
