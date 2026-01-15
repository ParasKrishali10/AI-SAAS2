"use client"

import { Suspense, useState } from "react"
import { useUserInfo } from "@/lib/userInfo"
import { RealTimeProvider } from "@/components/RealtimeProvider"
import { RealTimeBridge } from "@/components/RealTimeBridge"
import { NotificationListener } from "@/components/NotificationListener"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  const userId = useUserInfo((s) => s.userId)
  const [queryClient]=useState(
    ()=> new QueryClient({
      defaultOptions:{
        queries:{
          staleTime:1000*60*2,
          refetchOnWindowFocus:false,
          retry:1
        }
      }
    })
  )

  return (
   <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        <NotificationListener />
        <RealTimeBridge />

        {userId && <RealTimeProvider userId={userId} />}

        {children}
      </Suspense>
    </QueryClientProvider>
  )
}
