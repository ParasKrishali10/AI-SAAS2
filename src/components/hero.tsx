"use client"

import { useState, useEffect } from "react"
import ParticleBackground from "@/components/ParticleBackground"
import {
  Activity,
  Clock,
  Diamond,
  Grid2x2,
  MoreVertical,
  TrendingUp,
  LayoutDashboard,
  ArrowUpRight,
  Bot
} from "lucide-react"
import FuturisticFrame from '@/components/FuturisticFrame';

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
  <div className={`relative overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-5 flex flex-col justify-between group hover:border-${color}-500/30 transition-all duration-300 ${className}`}>
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
    discordAuthUrl.searchParams.append("client_id", process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!);
    discordAuthUrl.searchParams.append("redirect_uri", process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!);
    discordAuthUrl.searchParams.append("response_type", "code");
    discordAuthUrl.searchParams.append("scope", "identify guilds email bot applications.commands");
    discordAuthUrl.searchParams.append("permissions", "68608");
    window.location.href = discordAuthUrl.toString();
  };

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-slate-950">

      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#020410]"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-900/20 blur-[120px]"></div>
          <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-blue-600/10 blur-[100px] animate-pulse"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
      </div>

      {/* <ParticleBackground /> */}

      <div className="relative z-10 flex flex-col xl:flex-row items-center justify-center min-h-screen p-6 gap-8 xl:gap-12 max-w-[1600px] mx-auto">

        <div className="w-full max-w-md xl:w-[320px] shrink-0 hidden xl:block">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-1 shadow-2xl shadow-black/50">
             <div className="bg-slate-950/50 rounded-[1.8rem] border border-white/5 p-5 h-full overflow-hidden relative group">

                <div className="flex justify-between items-center mb-6 pl-2">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse"></div>
                      <h3 className="text-sm font-bold text-slate-200 tracking-wide uppercase">Transmissions</h3>
                   </div>
                   <span className="text-[10px] text-cyan-400/80 font-mono">LIVE</span>
                </div>

                <div className="space-y-3">
                   <RecentPostItem
                      title="Ghost's server"
                      subtitle="**Cat Chronicles** Hey cat lovers! 😻"
                      icon={Grid2x2}
                      color="cyan"
                   />
                   <RecentPostItem
                      title="Web Series"
                      subtitle="Hala Madrid, everyone! 🌟"
                      icon={Grid2x2}
                      color="cyan"
                   />
                   <RecentPostItem
                      title="Coding"
                      subtitle="System update deployed..."
                      icon={Grid2x2}
                      color="cyan"
                   />
                </div>

                <div className="mt-6 text-center">
                   <button className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">View All Logs</button>
                </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center max-w-2xl relative z-20">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-b from-cyan-500/10 to-purple-500/10 blur-3xl rounded-full -z-10 pointer-events-none"></div>

               <FuturisticFrame>
            <div className="relative">
               <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                 <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                   Automate Your
                 </span>
                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                   Discord with AI Magic
                 </span>
               </h1>

               <div className="absolute -top-10 -left-10 w-20 h-20 border-l-2 border-t-2 border-cyan-500/20 rounded-tl-3xl"></div>
               <div className="absolute -bottom-10 -right-10 w-20 h-20 border-r-2 border-b-2 border-purple-500/20 rounded-br-3xl"></div>
            </div>

            <p className="text-lg md:text-xl text-slate-400 mt-8 mb-10 max-w-lg mx-auto font-light leading-relaxed">
                Generate content, schedule posts, and grow your community on autopilot.
            </p>
               </FuturisticFrame>

            <div className="flex flex-wrap justify-center gap-5 mt-10">
               <button
  onClick={handleConnectDiscord}
  className="group relative px-8 py-4 rounded-xl bg-slate-950 text-white cursor-pointer font-bold text-lg shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.5)] transition-all duration-300 overflow-hidden"
>
  <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-70 group-hover:opacity-100 animate-gradientMove pointer-events-none">
     <div className="bg-slate-950 w-full h-full rounded-[10px]"></div>
  </div>

  <div className="relative flex items-center gap-3">
     <Diamond className="h-5 w-5 text-cyan-400 group-hover:animate-pulse" />
     <span>Connect Discord</span>
  </div>
</button>


               
            </div>
        </div>


        <div className="w-full max-w-md xl:w-[320px] flex flex-col gap-4 shrink-0 hidden xl:block">

           <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                 <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Clock className="h-5 w-5" />
                 </div>
              </div>

              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Scheduled Posts</h3>
              <div className="text-5xl font-extrabold text-white font-mono mb-6">4 <span className="text-sm text-emerald-400 align-top ml-1 font-sans">+2</span></div>

              <div className="h-16 w-full relative opacity-80">
                 <svg viewBox="0 0 100 40" className="w-full h-full drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" preserveAspectRatio="none">
                    <path d="M0 35 C 20 35, 20 10, 40 20 C 60 30, 80 5, 100 15" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0 35 C 20 35, 20 10, 40 20 C 60 30, 80 5, 100 15 V 40 H 0 Z" fill="url(#grad)" opacity="0.2" />
                    <defs>
                       <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" />
                          <stop offset="100%" stopColor="transparent" />
                       </linearGradient>
                    </defs>
                 </svg>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4 h-40">
              <StatCard
                 title="Engage"
                 value="193"
                 icon={Activity}
                 color="purple"
              />
              <StatCard
                 title="Reach"
                 value="4"
                 subtext={<span className="text-xs text-cyan-400 ml-1">↑</span>}
                 icon={TrendingUp}
                 color="cyan"
              />
           </div>
        </div>

      </div>
    </section>
  )
}
