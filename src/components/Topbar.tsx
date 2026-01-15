"use client"
import axios from 'axios';
import { Search, Bell, Plus, Check, AlertCircle, Info,Clock,SmilePlus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import BellRing from './BellRing';

const NOTIFICATIONS = [
  { id: 1, type: 'success', title: 'Post Deployed', message: 'Successfully posted to #general', time: '2m ago' },
  { id: 2, type: 'info', title: 'Analysis Ready', message: 'Weekly engagement report is available', time: '1h ago' },
  { id: 3, type: 'warning', title: 'Rate Limit Warning', message: 'Discord API is experiencing high latency', time: '3h ago' },
];
type NotificationStatus = "REACTION" | "POST_PUBLISHED" | "SCHEDULED";
interface Notification{
  type: NotificationStatus;
  message: string;
  createdAt: Date;
}

export default function Topbar() {
  const [username, setUsername] = useState("")

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const [notifications,setNotifications]=useState<Notification[]>([])
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const router = useRouter()
  const [notificationCount,setNotificationCount]=useState(0)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user/?id=${userId}`)
        const useri = await res.data
        const fullName = useri.discordUsername
        const parts = fullName.trim().split(" ")
        const first = parts[0]?.[0] || ""
        const last = parts[parts.length - 1]?.[0] || ""
        setUsername((first + last).toUpperCase())
      } catch (error) {
        console.log(error);
      }
    }
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/api/notifications?userId=${userId}`)
        const notifs = await res.data
        setNotificationCount(notifs.length);
        console.log("Notifications:", notifs)
        setNotifications(notifs)
      } catch (error) {
        console.log(error);
      }}
    fetchUser()
    fetchNotifications()
  }, [userId])

  return (
    <div>
      <div className="sticky top-0 z-30 h-24 px-8 flex items-center justify-between backdrop-blur-xl bg-slate-950/80 border-b border-white/5">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight py-2">Welcome back, {username}</h2>
          <p className="text-sm text-slate-400 mt-1">Here's your scheduling overview.</p>
        </div>

        <div className="flex items-center gap-6">

          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`relative p-2.5 rounded-full border transition-all group ${isNotificationsOpen ? 'bg-slate-800 border-white/30 text-white' : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white hover:border-white/30'}`}
            >
              <div className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-slate-900 z-10 group-hover:animate-ping"></div>
              <div className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-slate-900 z-10"></div>

              <BellRing className="h-5 w-5" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute top-full right-0 mt-4 w-96 bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">

                <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <h4 className="text-sm font-bold text-white">Notifications</h4>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">{notificationCount} NEW</span>
                </div>

                <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                  {notifications.map((notif,index) => (
                    <div key={index} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                      <div className="flex gap-3">
                        <div className={`mt-0.5 h-8 w-8 flex-shrink-0 rounded-lg flex items-center justify-center border ${
                          notif.type === 'REACTION' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          notif.type === 'POST_PUBLISHED' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                          {notif.type === 'REACTION' ? <SmilePlus className="h-4 w-4" /> : notif.type === 'POST_PUBLISHED' ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h5 className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{notif.type}</h5>
                            <span className="text-[10px] text-slate-500 font-mono">{new Date(notif.createdAt).toLocaleString("en-IN", { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: true })}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{notif.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <div className="p-3 bg-slate-950/50 text-center border-t border-white/5">
                  <button className="text-xs text-slate-500 hover:text-white transition-colors font-mono uppercase tracking-wider">Mark all as read</button>
                </div> */}
              </div>
            )}
          </div>

          <button className="group relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all duration-300 overflow-hidden" onClick={() => router.push("/postCreator")}>
            <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700"></div>
            <Plus className="h-5 w-5" />
            <span>New Post</span>
          </button>
        </div>
      </div>
    </div>
  )
}