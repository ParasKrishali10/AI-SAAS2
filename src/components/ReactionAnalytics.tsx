"use client"

import axios from "axios"
import { data } from "framer-motion/client"
import { useCallback, useEffect, useState } from "react"

type Reaction={
    emoji:string,
    count:number
}

type Props={
    messageId:string
}



export default function ReactionAnalytics({messageId}:Props){
    const [reactions,setReactions]=useState<Reaction[]>([])
    const [loading,setLoading]=useState(true)



    const fetchAnalytics=useCallback(async ()=>{
        setLoading(true)
        const res=await axios.get(`/api/analytics/reactions?messageId=${messageId}`)
        const reactions=await res.data.reactions
        const daily=await res.data.daily
        setReactions(reactions||[])
        setLoading(false)
    },[messageId])

    useEffect(()=>{
        fetchAnalytics()
    },[fetchAnalytics])


    useEffect(()=>{
        const ws=new WebSocket("ws://localhost:3002")
        ws.onmessage=(event)=>{
            const payload=JSON.parse(event.data)
            if(payload.type==="REACTION_UPDATE" &&
                payload.messageId===messageId
            ){
                fetchAnalytics()
            }
        }
        return ()=>{
            ws.close()
        }
    },[messageId,fetchAnalytics])

     if (loading) {
    return <div className="text-sm text-slate-400">Loading engagement…</div>;
  }

  if (reactions.length === 0) {
    return <div className="text-sm text-slate-500">No engagement yet</div>;
  }

  return (
    <div className="flex gap-4 mt-2">
      {reactions.map((r) => (
        <div key={r.emoji} className="text-sm flex gap-1">
          <span>{r.emoji}</span>
          <span>{r.count}</span>
        </div>
      ))}
    </div>
  );
}


