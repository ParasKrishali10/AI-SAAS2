"use client";

import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";
import { Clock4, Plus,TrendingUp,Activity } from "lucide-react";

export default function DashboardLayout() {
  return (
    <div className="flex bg-black text-white min-h-screen">

      <div className=" fixed top-0 left-0 h-full w-80 bg-gray-900  md:block hidden">
        <Navbar />
      </div>

      <div className="md:ml-80 w-full flex flex-col relative">

        <div className="fixed top-0 left-0 md:left-80 right-0 z-50">
          <Topbar />
        </div>

        <div className="mt-16 p-6 overflow-y-auto h-screen bg-[#0a0f1a]">
          <div className="">
            <div className="flex flex-col">
            <div className="text-3xl font-bold">
              Dashboard
            </div>
              <div className="mt-2 text-xl text-gray-600 font-medium">
                Welcome back! Here's your scheduling overview
              </div>
              <button className="flex cursor-pointer p-3 rounded-md w-40 mt-5 gap-2 bg-gradient-to-br  from-[#00d4ff] to-[#a855f7] scale-100 hover:scale-110 transition duration-500 ease-in-out hover:shadow-md shadow-cyan-600">
                  <Plus className="mt-0.5"/>
                  <span className="text-lg">New Post</span>
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
             <div className="mt-12 w-full flex justify-between items-center overflow-hidden p-8 bg-gray-900 border border-cyan-700 rounded-md transform transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl shadow-cyan-600">

                  <div className="flex flex-col">
                      <div className="text-gray-600 text-2xl font-semibold">
                        Scheduled Posts
                      </div>
                      <div className="text-3xl mt-3">
                        12
                      </div>
                  </div>
                  <div className="mt-2">
<div className="p-4  md:p-2 lg:p-4 rounded-2xl bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-400 flex items-center justify-center shadow-md shadow-cyan-500/20 ">
  <Clock4 className="w-7 h-7 text-white opacity-90" />
</div>


                  </div>
              </div>
     <div className="mt-12 w-full flex justify-between items-center overflow-hidden p-8 bg-gray-900 border border-cyan-700 rounded-md transform transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl shadow-cyan-600">

                  <div className="flex flex-col">
                      <div className="text-gray-600 text-2xl font-semibold">
                        Total Reach
                      </div>
                      <div className="text-3xl mt-3 font-semibold">
                        24.5K
                      </div>
                  </div>
                  <div className="mt-2">
<div className="p-4 md:p-2 lg:p-4 rounded-2xl bg-gradient-to-r from-purple-600/90 to-fuchsia-500/70 flex items-center justify-center shadow-md shadow-cyan-500/20 ">
  <TrendingUp className="w-7 h-7 text-white opacity-90" />
</div>


                  </div>
              </div>
<div className="mt-12 w-full flex justify-between items-center overflow-hidden p-8 bg-gray-900 border border-cyan-700 rounded-md transform transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl shadow-cyan-600">

                  <div className="flex flex-col">
                      <div className="text-gray-600 text-2xl font-semibold">
                        Scheduled Posts
                      </div>
                      <div className="text-3xl mt-3">
                        12
                      </div>
                  </div>
                  <div className="mt-2">
<div className="p-4 md:p-2 lg:p-4 rounded-2xl bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-400 flex items-center justify-center shadow-md shadow-cyan-500/20 ">
  <Activity className="w-7 h-7 text-white opacity-90" />
</div>


                  </div>
              </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
