"use client"

import { Suspense } from "react"
import { useUserInfo } from "@/lib/userInfo"
import { RealTimeProvider } from "@/components/RealtimeProvider"
import { RealTimeBridge } from "@/components/RealTimeBridge"
import { NotificationListener } from "@/components/NotificationListener"

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  const userId = useUserInfo((s) => s.userId)

  return (
    <Suspense>
      <NotificationListener />
      <RealTimeBridge />

      {userId && <RealTimeProvider userId={userId} />}

      {children}
    </Suspense>
  )
}
