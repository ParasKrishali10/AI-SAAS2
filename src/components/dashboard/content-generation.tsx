"use client"

import { useRef } from "react"
import { useInView } from "@/lib/use-in-view"
import { Sparkles, CheckCircle2, Bot, Wand2, Fullscreen } from "lucide-react"
import Image from "next/image"
export default function ContentGeneration() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden bg-slate-950">

      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isInView ? "animate-slide-in-left" : "opacity-0"}`}>

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3 h-3" />
              <span>Intelligent Engine</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="block text-slate-200">Craft perfect posts</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                in milliseconds.
              </span>
            </h2>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
              Stop staring at a blank screen. Our AI analyzes your community's vibe and generates engaging Discord posts, announcements, and polls instantly.
            </p>

            <div className="space-y-4">
              {[
                { text: "Generate posts in seconds", sub: "No more writer's block" },
                { text: "Customize tone and style", sub: "From professional to meme-lord" },
                { text: "Multi-language support", sub: "Reach a global audience" }
              ].map((item, i) => (
                <div key={i} className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="mt-1 bg-cyan-500/10 p-2 rounded-lg text-cyan-400 group-hover:text-cyan-300 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-200 font-bold">{item.text}</h4>
                    <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative ${isInView ? "animate-float" : ""}`}>

            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-3xl transform rotate-6 scale-90" />
              <Image src="/Creator.jpeg" alt="AI Interface" width={0} height={0} sizes="100vw" className="w-full h-autorelative z-10 rounded-xl border border-white/10 shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}