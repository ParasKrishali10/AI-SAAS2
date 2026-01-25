"use client"
import Image from "next/image"
import { useRef } from "react"
import { useInView } from "@/lib/use-in-view"
import {
  LayoutDashboard,
  PenTool,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
  Users,
  MessageSquare,
  Wifi,
  MoreVertical,
  CheckCircle2
} from "lucide-react"

export default function DashboardPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden bg-slate-950">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-lg">
             <LayoutDashboard className="w-3 h-3" />
             <span>Central Command</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="text-slate-200">One Dashboard to</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              Rule Them All
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Manage content, scheduling, analytics, and community health from a single, powerful interface designed for power users.
          </p>
        </div>

        <div className={`relative rounded-3xl ${isInView ? "swing-in-bottom-fwd" : "opacity-0"}`}>

          <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-sm" />
            <Image src="/dashboard.png" alt="AI Interface" width={0} height={0} sizes="100vw" className="w-full h-autorelative z-10 rounded-xl border border-white/10 shadow-2xl" />

        </div>
      </div>
    </section>
  )
}
