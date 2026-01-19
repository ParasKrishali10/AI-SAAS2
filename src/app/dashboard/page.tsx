"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import axios from "axios";
import { Clock4, Plus, TrendingUp, Activity, ArrowUpRight, MoreVertical, LayoutDashboard, Zap, CalendarClock, LogOut, ChevronUp, User, Settings, BarChart3, Bell, Search, Bot } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useUserInfo } from '@/lib/userInfo';
import toast from 'react-hot-toast';
import AnalyticsChart from '@/components/AnalyticsChart';
import { useQuery } from '@tanstack/react-query';
import { AnalyticsChartSkeleton } from '@/components/AnalyticsChartSkelton';
import Topbar from '@/components/Topbar';
import FloatingSidebar from '@/components/Sidebar';
import Truck from '@/components/Truck';
interface Recent { guildName: String; channelName: String; generatedContent: String }
interface Upcoming { guildName: String; channelName: String; generatedContent: String; scheduledFor: Date }
interface Posts { id: String; title: String; content: String; createdAt: String }
interface TOPPosts { guildName: String; totalReactions: Number; generatedContent: String }

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const userIds = searchParams.get('userId')
  const setUserId = useUserInfo(state => state.setUserId)

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [username, setUsername] = useState("")

  const handleLogout = () => {
    console.log("Logging out user...");
    router.push("/");
  };

  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const fetchUser = async (userId: string) => {
    const res = await axios.get(`/api/user/?id=${userId}`)
    return res.data
  }
  const fetchDashboardPosts = async (userId: string) => {
    const res = await axios.get(`/api/posts/dash?userId=${userId}`)
    return res.data
  }
  const fetchAnalytics = async (userId: string) => {
    const res = await axios.get(`/api/engagement?userId=${userId}`)
    return res.data
  }

  const { data: userData, isLoading:userLoading } = useQuery({
    queryKey: ['user', userIds],
    queryFn: () => fetchUser(userIds!),
    enabled: !!userIds
  })

  useEffect(() => {
    if (!userData?.discordUsername) return
    setUserId(userIds!)
    const parts = userData.discordUsername.trim().split(" ")
    const first = parts[0]?.[0] || ""
    const last = parts[parts.length - 1]?.[0] || ""
    setUsername((first + last).toUpperCase())
  }, [userData, userIds, setUserId])

  const { data: dashData, isLoading: postsLoading } = useQuery({
    queryKey: ['dashboardPosts', userIds],
    queryFn: () => fetchDashboardPosts(userIds!),
    enabled: !!userIds,
    staleTime: 1000 * 60 * 5
  })

  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({
    queryKey: ["analytics", userIds],
    queryFn: () => fetchAnalytics(userIds!),
    enabled: !!userIds,
    staleTime: 1000 * 60 * 5,
  })

  const recent: Recent[] = dashData?.recentPost ?? []
  const upgrade = dashData?.diff ?? 0
  const upcoming: Upcoming[] = dashData?.upcomingPost ?? []
  const postCount: number = dashData?.count ?? 0
  const top: TOPPosts[] = analyticsData?.topPostDetails ?? []
  const totalReactions: number = analyticsData?.totalReactions ?? 0
  const analytics = analyticsData?.chartData ?? [
      { name: "Mon", value: 0 }, { name: "Tue", value: 0 }, { name: "Wed", value: 0 }, { name: "Thu", value: 0 }, { name: "Fri", value: 0 }
  ]
  const growthRate: number = analyticsData?.growthRate ?? 0

  const handleRedirection = (label: string) => {
    return () => {
      switch (label) {
        case "Create Post":
          router.push('/postCreator')
          break
        case "Scheduled":
          router.push('/scheduled')
          break
        case "Analytics":
          router.push('/analytics')
          break
        default:
          break
      }
    }
  }

  return (
<>
{userLoading && (
<div className="fixed inset-0 flex items-center justify-center bg-slate-950 z-[60]">
      <Truck />
    </div>
)}
   {!userLoading && ( <div className="flex h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans overflow-hidden min-h-screen">

        <div>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[150px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
      </div>

        </div>


      <aside className="relative z-20 w-64 flex-shrink-0 border-r border-white/5 bg-slate-950/50 backdrop-blur-xl flex flex-col hidden md:flex">

        <div className="h-24 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="h-6 w-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white">Discord AI</h1>
              <p className="text-[10px] text-cyan-400 font-mono tracking-wider">PRO SUITE</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 font-medium">
          <div className="group relative">
           <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-xl opacity-100 blur-md transition-opacity pointer-events-none"></div>

            <button className="relative w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 text-cyan-400">
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
            </button>
          </div>
          {[
            { icon: Plus, label: "Create Post" },
            { icon: CalendarClock, label: "Scheduled" },
            { icon: BarChart3, label: "Analytics" },
          ].map((item, idx) => (
            <button onClick={handleRedirection(item.label)} key={idx} className="w-full flex items-center gap-3 cursor-pointer px-4 py-3 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 group">
              <item.icon className="h-5 w-5 group-hover:text-cyan-400 transition-colors" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 relative" ref={menuRef}>

           {isProfileOpen && (
             <div className="absolute bottom-full left-4 right-4 mb-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
               <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                 <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">My Account</p>
               </div>
               <div className="p-1">
                 <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                   <User className="h-4 w-4" />
                   <span>Profile</span>
                 </button>

                 <button
                   onClick={handleLogout}
                   className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors mt-1"
                 >
                   <LogOut className="h-4 w-4" />
                   <span>Log Out</span>
                 </button>
               </div>
             </div>
           )}

           <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer group ${isProfileOpen ? 'bg-slate-800 border-cyan-500/30' : 'bg-slate-900/60 border-white/5 hover:border-white/20'}`}
           >
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-orange-500 p-[2px]">
                  <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center text-xs font-bold text-white">
                    {username}
                  </div>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-bold text-white truncate">{userData?.discordUsername || "Ghost Gamer"}</span>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    ONLINE
                  </span>
              </div>
              <ChevronUp className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-cyan-400' : ''}`} />
           </div>
        </div>
      </aside>

      <div className="min-w-0 w-full z-10 flex-1 flex flex-col relative overflow-y-auto custom-scrollbar">
        <Topbar />

        <div className="px-8 py-8 space-y-8">
            <div className="">
            <div className="flex flex-col">

              <div className="grid grid-cols-1  lg:grid-cols-2 gap-6 ">
                <div className="relative group bg-slate-900/40 border border-white/5 rounded-2xl p-6 overflow-hidden hover:border-cyan-500/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Scheduled Posts</h3>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white font-mono">{postCount}</span>
                        <span className="text-xs text-emerald-400 flex items-center gap-0.5 font-mono"><ArrowUpRight className="h-3 w-3" /> +{upgrade}</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-shadow">
                      <Clock4 className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                </div>

                <div className="relative group bg-slate-900/40 border border-white/5 rounded-2xl p-6 overflow-hidden hover:border-purple-500/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Reactions</h3>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white font-mono">{totalReactions}</span>
                        <span className="text-xs text-emerald-400 flex items-center gap-0.5 font-mono"><ArrowUpRight className="h-3 w-3" /> {growthRate.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-shadow">
                      <TrendingUp className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-purple-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-9 auto-rows-fr">

                <div className="bg-slate-900/40 border border-white/5 rounded-3xl backdrop-blur-md overflow-hidden hover:border-cyan-500/20 transition-all duration-500 shadow-[0_0_25px_-6px_rgba(34,211,238,0.25)] hover:-translate-y-1 hover:shadow-[0_0_35px_-4px_rgba(34,211,238,0.55)]">
                  <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Recent Transmissions</h3>
                    <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-mono uppercase tracking-wider cursor-pointer" onClick={()=>router.push("/scheduled")}>View All</button>
                  </div>
                  <div className="p-6 space-y-3">
                    {postsLoading && [...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-white/5 animate-pulse">
                         <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-800" />
                            <div className="min-w-0 flex-1 space-y-2"><div className="h-4 w-32 bg-slate-800 rounded" /><div className="h-3 w-full bg-slate-800 rounded" /></div>
                         </div>
                      </div>
                    ))}
                    {!postsLoading && recent.length === 0 && (
       <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
          <div className="relative mb-6 group cursor-default">

             <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping opacity-75"></div>

             <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>

             <div className="relative h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] z-10">
                 <Bot className="h-8 w-8 text-cyan-400 animate-[pulse_3s_ease-in-out_infinite]" />

                 <div className="absolute top-0 right-0 h-3 w-3 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
             </div>
          </div>
          <h4 className="text-slate-300 font-medium mb-1 text-lg">No Transmissions Found</h4>
          <p className="text-xs text-slate-500 font-mono max-w-[240px] leading-relaxed">
             AI Systems are active and waiting. <br/> Initialize a new post to begin data stream.
          </p>
          <button onClick={() => router.push('/postCreator')} className="mt-6 text-xs bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg border border-cyan-500/20 transition-all font-mono uppercase tracking-wider">
             + Initialize Post
          </button>
       </div>
    )}
                    {!postsLoading && recent.map((p, index) => (
                      <div key={index} className="group flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-white/5 hover:border-cyan-500/30 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                            <LayoutDashboard className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">{p.guildName}</h4>
                            <p className="text-xs text-slate-500 font-mono truncate">{p.generatedContent || "Scheduled"}</p>
                          </div>
                        </div>
                        <div className="pl-2 flex-shrink-0"><MoreVertical className="h-4 w-4 text-slate-600 group-hover:text-white" /></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-white/5 rounded-3xl backdrop-blur-md overflow-hidden hover:border-purple-500/20 transition-all duration-500 shadow-[0_0_25px_-6px_rgba(168,85,247,0.05)] shadow-[0_0_25px_-6px_rgba(34,211,238,0.25)] hover:-translate-y-1 hover:shadow-[0_0_35px_-4px_rgba(34,211,238,0.55)]">
                  <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Top Performers</h3>
                    <span className="text-xs text-purple-400 font-mono bg-purple-500/10 px-2 py-1 rounded">THIS WEEK</span>
                  </div>
                  <div className="p-6 space-y-3">
                    {analyticsLoading && [...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-white/5 animate-pulse">
                         <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-800" />
                            <div className="min-w-0 flex-1 space-y-2"><div className="h-4 w-32 bg-slate-800 rounded" /><div className="h-3 w-full bg-slate-800 rounded" /></div>
                         </div>
                      </div>
                    ))}
                    {!postsLoading && top.length === 0 && (
       <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
          <div className="relative mb-6 group cursor-default">

             <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping opacity-75"></div>

             <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>

             <div className="relative h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] z-10">
                 <Bot className="h-8 w-8 text-cyan-400 animate-[pulse_3s_ease-in-out_infinite]" />

                 <div className="absolute top-0 right-0 h-3 w-3 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
             </div>
          </div>
          <h4 className="text-slate-300 font-medium mb-1 text-lg">No Reactions Found</h4>
          <p className="text-xs text-slate-500 font-mono max-w-[240px] leading-relaxed">
             AI Systems are active and waiting. <br/>No reactions have been added yet 😔.
          </p>

       </div>
    )}

                    {!postsLoading && top.map((p, index) => (
                      <div key={index} className="group flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-white/5 hover:border-purple-500/30 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <Zap className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors truncate">{p.generatedContent}</h4>
                            <p className="text-xs text-slate-500 font-mono">{String(p.totalReactions)} Reactions</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-white/5 rounded-3xl backdrop-blur-md overflow-hidden hover:border-blue-500/20 transition-all duration-500 h-full flex flex-col shadow-[0_0_25px_-6px_rgba(34,211,238,0.25)] hover:-translate-y-1 hover:shadow-[0_0_35px_-4px_rgba(34,211,238,0.55)]">
                  <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Upcoming Plan</h3>
                  </div>
                  <div className="p-6 space-y-3 flex-1">
                    {postsLoading && [...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-white/5 animate-pulse">
                         <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-800" />
                            <div className="min-w-0 flex-1 space-y-2"><div className="h-4 w-32 bg-slate-800 rounded" /><div className="h-3 w-full bg-slate-800 rounded" /></div>
                         </div>
                      </div>
                    ))}
                     {!postsLoading && upcoming.length === 0 && (
       <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
          <div className="relative mb-6 group cursor-default">

             <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping opacity-75"></div>

             <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>

             <div className="relative h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] z-10">
                 <Bot className="h-8 w-8 text-cyan-400 animate-[pulse_3s_ease-in-out_infinite]" />

                 <div className="absolute top-0 right-0 h-3 w-3 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
             </div>
          </div>
          <h4 className="text-slate-300 font-medium mb-1 text-lg">No Upcoming Plans</h4>
          <p className="text-xs text-slate-500 font-mono max-w-[240px] leading-relaxed">
             AI Systems are active and waiting. <br/> Scheduled a new post to begin data stream.
          </p>
          <button onClick={() => router.push('/postCreator')} className="mt-6 text-xs bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg border border-cyan-500/20 transition-all font-mono uppercase tracking-wider">
             + Schedule Post
          </button>
       </div>
    )}
                    {!postsLoading && upcoming.map((p, index) => (
                      <div key={index} className="group flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-white/5 hover:border-blue-500/30 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <CalendarClock className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors truncate">{p.generatedContent}</h4>
                            <p className="text-xs text-slate-500 font-mono">{new Date(p.scheduledFor).toLocaleString("en-IN", { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: true })}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full bg-gray-900/60 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 shadow-[0_0_25px_-6px_rgba(34,211,238,0.25)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_35px_-4px_rgba(34,211,238,0.55)] relative h-full flex flex-col">
                  <div className="flex flex-col">
                    <div className="text-2xl font-semibold text-cyan-300">Analytics</div>
                    <div className="text-gray-400 font-medium mt-1">Detailed performance metrics</div>
                  </div>
                  <div className="mt-6 flex-1">
                    {analyticsLoading && <AnalyticsChartSkeleton />}
                    {!analyticsLoading && <AnalyticsChart data={analytics} />}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div> )}
</>
  );
}