"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import ContentGeneration from "@/components/content-generation"
import SmartScheduling from "@/components/smart-schedulling"
import Analytics from "@/components/analytics"
import DashboardPreview from "@/components/dashboard-preview"
import FinalCTA from "@/components/final-cta"



export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="bg-background text-foreground overflow-hidden">
      <Hero />
      <ContentGeneration />
      <SmartScheduling />
      <Analytics />
      <DashboardPreview />
      <FinalCTA />
    </main>
  )
}
