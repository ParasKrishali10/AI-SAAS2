"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  Clock,
  Diamond,
  Grid2x2,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"
import FuturisticFrame from '@/components/FuturisticFrame';

const BackgroundBeams = () => {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">

       <div className="absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2
        w-[500px] h-[500px]
        bg-cyan-500/20 blur-[100px] rounded-full"
       />
       {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/80 rounded-full"
            initial={{
              x: Math.random() * 1000 - 500,
              y: Math.random() * 800 - 400,
              opacity: 0
            }}
            animate={{
              y: [null, -120],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          />
       ))}
    </div>
  )
}
const RecentPostItem = ({ title, subtitle, icon: Icon, color }: { title: string, subtitle: string, icon: any, color: 'cyan' | 'purple' }) => (
  <div className="group/item relative flex items-center justify-between p-3 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300 cursor-pointer overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-r ${color === 'cyan' ? 'from-cyan-500/10' : 'from-purple-500/10'} to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500`}></div>
    <div className="flex items-center gap-3 min-w-0 flex-1 relative z-10">
      <div className={`h-10 w-10 rounded-xl ${color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'} border flex items-center justify-center`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-bold text-slate-200 text-sm truncate">{title}</h4>
        <p className="text-[10px] text-slate-500 font-mono truncate">{subtitle}</p>
      </div>
    </div>
    <div className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300">
      <ArrowUpRight className="h-4 w-4 text-slate-400" />
    </div>
  </div>
);

const StatCard = ({ title, value, subtext, icon: Icon, color, className = "" }: { title: string, value: string, subtext?: React.ReactNode, icon: any, color: 'cyan' | 'purple', className?: string }) => (
  <div className={`relative overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-5 flex flex-col justify-between group ${color === 'cyan' ? 'hover:border-cyan-500/30' : 'hover:border-purple-500/30'} transition-all duration-300 ${className}`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${color === 'cyan' ? 'from-cyan-500/5 to-blue-500/5' : 'from-purple-500/5 to-pink-500/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
    <div className="flex justify-between items-start relative z-10">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
      <div className={`p-2 rounded-lg ${color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'}`}>
        <Icon className="h-4 w-4" />
      </div>
    </div>
    <div className="relative z-10 mt-2">
      <div className="text-3xl font-extrabold text-white font-mono flex items-baseline gap-2">
        {value}
        {subtext}
      </div>
    </div>
  </div>
);
export default function Hero() {
  const [mounted, setMounted] = useState(false)

  const handleConnectDiscord = () => {
    const discordAuthUrl = new URL("https://discord.com/oauth2/authorize");
    discordAuthUrl.searchParams.append("client_id", process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "");
    discordAuthUrl.searchParams.append("redirect_uri", process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI || "");
    discordAuthUrl.searchParams.append("response_type", "code");
    discordAuthUrl.searchParams.append("scope", "identify guilds email bot applications.commands");
    discordAuthUrl.searchParams.append("permissions", "68608");
    window.location.href = discordAuthUrl.toString();
  };

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-slate-950">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#020410]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/10 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-900/10 blur-[120px]"></div>
        <BackgroundBeams />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
      </div>
      <div className="relative z-10 flex flex-col xl:flex-row items-center justify-center min-h-screen p-6 gap-8 xl:gap-12 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="w-full max-w-md xl:w-[320px] shrink-0 hidden xl:block"
        >
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-1 shadow-2xl shadow-black/50">
            <div className="bg-slate-950/50 rounded-[1.8rem] border border-white/5 p-5">
              <div className="flex justify-between items-center mb-6 pl-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse"></div>
                  <h3 className="text-sm font-bold text-slate-200 tracking-wide uppercase">Transmissions</h3>
                </div>
                <span className="text-[10px] text-cyan-400/80 font-mono">LIVE</span>
              </div>

              <div className="space-y-3">
                <RecentPostItem title="Ghost's server" subtitle="Cat Chronicles 😻" icon={Grid2x2} color="cyan" />
                <RecentPostItem title="Web Series" subtitle="Hala Madrid 🌟" icon={Grid2x2} color="cyan" />
                <RecentPostItem title="Coding" subtitle="System update deployed..." icon={Grid2x2} color="cyan" />
              </div>
            </div>
          </div>
        </motion.div>
        <div className="flex flex-col items-center text-center max-w-2xl relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
          >
            {/* Idle floating after appearing */}
            {/* <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            > */}
              <FuturisticFrame>
                <div className="relative">
                  <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                      Automate Your
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                      Discord with AI Magic
                    </span>
                  </h1>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="text-lg md:text-xl text-slate-400 mt-8 mb-10 max-w-lg mx-auto font-light"
                >
                  Generate content, schedule posts, and grow your community on autopilot.
                </motion.p>
              </FuturisticFrame>
            {/* </motion.div> */}
          </motion.div>

          {/* Button appears last */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-5 mt-10"
          >
            <button
              onClick={handleConnectDiscord}
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] group cursor-pointer"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
                bg-[conic-gradient(from_90deg_at_50%_50%,#22d3ee_0%,#a855f7_50%,#22d3ee_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white gap-2 backdrop-blur-3xl">
                <Diamond className="h-4 w-4 text-cyan-400 group-hover:animate-pulse" />
                Connect Discord
              </span>
            </button>
          </motion.div>
        </div>
<motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.8, duration: 0.7 }}
  className="w-full max-w-md xl:w-[320px] flex flex-col gap-4 shrink-0 hidden xl:block"
>
<div className="relative bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-6">
  <div className="absolute top-5 right-5 w-12 h-12 rounded-xl
    bg-cyan-950/60 border border-cyan-500/30
    flex items-center justify-center text-cyan-400">
    <Clock className="h-6 w-6" />
  </div>

  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
    Scheduled Posts
  </h3>

  <div className="flex items-baseline gap-3 mt-3">
    <span className="text-5xl font-extrabold text-white font-mono">4</span>
    <span className="text-sm text-emerald-400 font-semibold">+2</span>
  </div>
  <div className="mt-6 h-20">
    <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
      <path
        d="M0 35 C 20 35, 20 10, 40 20 C 60 30, 80 5, 100 15"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M0 35 C 20 35, 20 10, 40 20 C 60 30, 80 5, 100 15 V 40 H 0 Z"
        fill="url(#gradBig)"
        opacity="0.25"
      />
      <defs>
        <linearGradient id="gradBig" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</div>
<div className="grid grid-cols-2 gap-4 mt-2">
  <StatCard title="Engage" value="193" icon={Activity} color="purple" />
  <StatCard title="Reach" value="4" subtext={<span className="text-xs text-cyan-400 ml-1">↑</span>} icon={TrendingUp} color="cyan" />
</div>


</motion.div>


      </div>
    </section>
  )
}
