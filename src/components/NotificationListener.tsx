"use client"

import { onNotification } from "@/lib/notificationStore"
import { useEffect } from "react"
import toast from "react-hot-toast"

export function NotificationListener(){
    useEffect(()=>{
        return onNotification((data)=>{
            if(data?.message)
            {
                toast(data.message)
            }
        })
    })
    return null
}