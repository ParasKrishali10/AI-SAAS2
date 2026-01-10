"use client"

import { useUserInfo } from "@/lib/userInfo"
import axios from "axios"
import { useEffect,useRef,useState } from "react"

export function RealTimeBridge(){
    const wsRef=useRef<WebSocket|null>(null)
    const userId=useUserInfo((s)=>s.userId)
    useEffect(()=>{
        if(wsRef.current) return
        const wsUrl=process.env.NEXT_PUBLIC_WS_URL
        if(!wsUrl)
        {
            return
        }
        const ws=new WebSocket(wsUrl)
        wsRef.current=ws

        ws.onmessage=async(event)=>{
            const payload=JSON.parse(event.data)
            if(payload.type==="REACTION_UPDATE" || payload.type==="REACTION_DELETE"){
                console.log(payload)
                const eventName =
  payload.type === "REACTION_DELETE"
    ? "reaction-delete"
    : "reaction-update";
                window.dispatchEvent(
                    new CustomEvent(eventName,{
                        detail:payload
                    })
                )

          await axios.post("/api/analytics/reactions",payload)

            }
        }
        ws.onclose=()=>{
            wsRef.current=null
        }
        return ()=>ws.close()
    },[])
    return null
}