"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BarChart3, CalendarDays, PenTool, Settings, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/lib/userInfo';
const FloatingSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userId=useUserInfo((s)=>s.userId)
  const router=useRouter()
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, active: false },
    { name: 'Analytics', icon: <BarChart3 size={18} />, active: true },
    { name: 'Scheduled Posts', icon: <CalendarDays size={18} />, active: false },
    { name: 'Post Generation', icon: <PenTool size={18} />, active: false },
    { name: 'Settings', icon: <Settings size={18} />, active: false },
  ];

  const handleRedirect=async(name:string)=>
  {
      if(name==='Dashboard'){
        router.push(`/dashboard?userId=${userId}`)
        return
      }else if(name==='Analytics'){
         router.push("/analytics")
        return
      }
      else if(name==='Scheduled Posts'){
         router.push("/scheduled")
        return

      }else if(name==='Post Generation'){
         router.push("/postCreator")
        return
      }else{
        router.push("/setting")
        return
      }
  }

  return (
    <>

      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 left-8 z-50 p-2 text-slate-400 hover:text-white transition-colors"
      >
        <Menu size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />


            <motion.div
              initial={{ x: -20, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} // Smooth "Cubic Bezier" animation
              className="fixed top-12 left-8 w-64 bg-[#1a1f2e]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl z-[70] overflow-hidden"
            >

              <div className="flex justify-between items-center mb-6 px-2">
                <span className="text-blue-400 font-semibold tracking-wide text-sm uppercase">Menu</span>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
                  <X size={18} />
                </button>
              </div>


              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button onClick={()=>handleRedirect(item.name)}
                    key={item.name}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                      ${item.active
                        ? 'bg-blue-600/30 text-blue-100 shadow-inner border border-white/5'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <span className={`${item.active ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium tracking-tight">{item.name}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingSidebar;