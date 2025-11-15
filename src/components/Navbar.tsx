"use client"
import axios from "axios";
import { Zap, FilePlus,Clock4,ChartColumn,Settings,LayoutDashboard } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [username,setUsername]=useState("")
      const searchParams=useSearchParams()
  const userId=searchParams.get('userId')
  useEffect(()=>{
    const fetchUser=async()=>{
      try{
          const res=await axios.get(`/api/user/?id=${userId}`)
          const useri=await res.data
          console.log(useri.discordUsername)
          const fullName=useri.discordUsername
            const parts = fullName.trim().split(" ")
            const first = parts[0]?.[0] || ""
            const last = parts[parts.length-1]?.[0] || ""
          setUsername((first + last).toUpperCase())

      }catch(error)
      {
        console.log(error);

      }
    }

      fetchUser()
  },[])
  const [id,setId]=useState(0);
  return (

    <div className=" w-84 bg-gray-900 p-6 rounded-xl min-h-screen ">

      <div className="flex gap-6 items-center">
        <div className="w-10 h-10 flex rounded-md items-center justify-center bg-gradient-to-br from-[#00d4ff] to-[#a855f7]">
          <Zap />
        </div>
        <div>
          <div className="font-bold text-2xl text-white">Discord AI</div>
          <div className="text-sm font-medium text-gray-400">Scheduler Pro</div>
        </div>
      </div>

      <div className="-mx-6  my-6 border-b border-cyan-500 opacity-70"></div>


      <div>
        <button onClick={()=>{setId(0)}} className={`flex gap-3  text-xl font-semibold cursor-pointer p-3 w-full rounded-md ${id==0?"bg-gradient-to-br  from-[#00d4ff] to-[#a855f7] ":" bg-gray-900 "} ${id==0?"text-white ":" text-gray-600 "} scale-100 hover:scale-110 transition duration-500 ease-in-out  hover:text-white`}>
          <LayoutDashboard className="mt-0.5"/>
          <span>Dashboard</span>
        </button>
      </div>
      <div className="mt-6">
        <button onClick={()=>{setId(1)}} className={`flex gap-3  text-xl font-semibold cursor-pointer p-3 w-full rounded-md ${id==1?"bg-gradient-to-br  from-[#00d4ff] to-[#a855f7] ":" bg-gray-900 "} ${id==1?"text-white ":"text-gray-600 "}  scale-100 hover:scale-110 transition duration-500 ease-in-out hover:text-white`} >
          <FilePlus className="mt-0.5"/>
          <span className="mt-0.5">Create Post</span>
        </button>
      </div>
      <div className="mt-6">
     <button onClick={()=>{setId(2)}} className={`flex gap-3  text-xl font-semibold cursor-pointer p-3 w-full rounded-md ${id==2?"bg-gradient-to-br  from-[#00d4ff] to-[#a855f7] ":" bg-gray-900 "} ${id==2?"text-white ":" text-gray-600 "} scale-100 hover:scale-110 transition duration-500 ease-in-out hover:text-white`} >
          <Clock4 className="mt-0.5"/>
          <span className="">Scheduled Post</span>
        </button>
      </div>
      <div className="mt-6">
        <button onClick={()=>{setId(3)}} className={`flex gap-3  text-xl font-semibold cursor-pointer p-3 w-full rounded-md ${id==3?"bg-gradient-to-br  from-[#00d4ff] to-[#a855f7] ":" bg-gray-900 "} ${id==3?"text-white ":" text-gray-600 "}  scale-100 hover:scale-110 transition duration-500 ease-in-out hover:text-white`} >
          <ChartColumn className="mt-0.5"/>
          <span className="mt-0.5">Analytics</span>
        </button>
      </div>
      <div className="mt-6">
        <button onClick={()=>{setId(4)}} className={`flex gap-3  text-xl font-semibold cursor-pointer p-3 w-full rounded-md ${id==4?"bg-gradient-to-br  from-[#00d4ff] to-[#a855f7] ":" bg-gray-900 "}  ${id==4?"text-white ":" text-gray-600 "} scale-100 hover:scale-110 transition duration-500 ease-in-out hover:text-white`} >
          <Settings className="mt-0.5"/>
          <span className="mt-0.5">Settings </span>
        </button>
      </div>

      <div className="-mx-6 mt-48  my-6 border-b border-cyan-500 opacity-70"></div>
      <div className="bg-[#0f1c2e] mr-2  rounded-md p-2 scale-100 hover:scale-110 transition duration-500 ease-in-out  cursor-pointer hover:bg-cyan-700 ">
        <div className="flex gap-4 text-center items-center ">
          <div className="rounded-full text-xl w-14 h-14  flex items-center justify-center bg-cyan-500">
             {username}
          </div>
          <div className="mt-1.5" >
            <div className="text-lg font-semibold">
            AI Discord

            </div>
            <div className="text-sm font-medium text-gray-700">
              Pro member
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
