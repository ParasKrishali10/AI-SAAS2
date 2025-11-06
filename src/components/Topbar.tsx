"use client"
import { div } from 'framer-motion/client';
import { Search, Bell} from 'lucide-react';
import { useState } from 'react';
export default function Topbar(){
    const [open,setOpen]=useState(false)
    return <div>
        <div className="bg-gray-900 h-16 flex items-center justify-between px-6 border-b border-gray-800 sticky top-0 z-50 ">
            <div className=' gap-4 relative w-80'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 '/>
                <input type="text" name="search" id="" placeholder="Search posts , schdeules..." className="w-full bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" />
            </div>
            <div className='flex items-center gap-6 ml-6 relative'>
                 <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer relative"
        >
          <Bell className="text-gray-300 hover:text-cyan-400 transition" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </div>
        <div className="cursor-pointer rounded-full bg-cyan-700 text-lg w-10 h-10 flex items-center justify-center">
          U
        </div>

        {open && (
             <div className="absolute right-0 mt-80 w-80 bg-gray-800 rounded-xl shadow-lg border border-cyan-700 overflow-hidden">
            <div className="p-4 border-b border-cyan-700 text-sm font-semibold text-gray-200">
              Notifications
            </div>
            <div className="max-h-60 overflow-y-auto">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="p-4 hover:bg-gray-700 border-b border-cyan-700 last:border-none"
                  >
                    <p className="text-gray-300 text-sm">
                      Post scheduled for{" "}
                      <span className="text-cyan-400 cursor-pointer">2 hours</span>
                    </p>
                    <p className="text-xs text-gray-500">Just now</p>
                  </div>
                ))}
            </div>
          </div>
        )}

            </div>

        </div>
    </div>

}