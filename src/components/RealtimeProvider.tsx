"use client"

import { useEffect } from "react"
import { pusherClient } from "@/lib/pusher-client"
import { emitNotification } from "@/lib/notificationStore"

export function RealTimeProvider({userId}:{ userId: string }){
    useEffect(()=>{

        if(!userId) return
console.log("Subscribed to:", `user-${userId}`)

        const channel=pusherClient.subscribe(`user-${userId}`)
        channel.bind("notification",(data:any)=>{
            emitNotification(data)
        })

        return ()=>{
            channel.unbind_all()
            pusherClient.unsubscribe(`user-${userId}`)
        }

    },[userId])
    return null
}