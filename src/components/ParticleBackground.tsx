"use client"

import { useEffect, useRef } from "react"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()

    let time = 0

    const animate = () => {
      time += 0.005

      // Clear canvas with slight trail effect for glow
      ctx.fillStyle = "rgba(10, 14, 39, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const scale = Math.min(canvas.width, canvas.height) * 0.25

      // Draw first energy ribbon (Cyan)
      ctx.strokeStyle = "rgba(0, 212, 255, 0.8)"
      ctx.lineWidth = 8
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Create glow effect for first ribbon
      ctx.shadowColor = "rgba(0, 212, 255, 0.6)"
      ctx.shadowBlur = 30

      ctx.beginPath()
      for (let i = 0; i < 200; i++) {
        const t = (i / 200) * Math.PI * 2 + time
        const x = centerX + Math.cos(t) * Math.sin(time * 0.5) * scale + Math.sin(t * 1.5 + time) * scale * 0.3
        const y = centerY + Math.sin(t) * Math.cos(time * 0.5) * scale + Math.cos(t * 1.5 + time) * scale * 0.3

        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Draw second energy ribbon (Magenta)
      ctx.strokeStyle = "rgba(168, 85, 247, 0.8)"
      ctx.shadowColor = "rgba(168, 85, 247, 0.6)"
      ctx.shadowBlur = 30

      ctx.beginPath()
      for (let i = 0; i < 200; i++) {
        const t = (i / 200) * Math.PI * 2 + time + Math.PI / 1.5
        const x =
          centerX +
          Math.cos(t) * Math.sin(time * 0.5 + Math.PI / 2) * scale +
          Math.sin(t * 1.5 + time + Math.PI / 3) * scale * 0.3
        const y =
          centerY +
          Math.sin(t) * Math.cos(time * 0.5 + Math.PI / 2) * scale +
          Math.cos(t * 1.5 + time + Math.PI / 3) * scale * 0.3

        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      ctx.shadowColor = "transparent"

      // Draw soft glowing particles
      const particleCount = 40
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2
        const distance = (Math.sin(time * 0.3 + i * 0.2) + 1) * scale * 0.5
        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance

        const size = Math.sin(time * 0.4 + i * 0.1) * 1.5 + 1.5

        // Alternate particle colors
        const isFirstColor = i % 2 === 0
        ctx.fillStyle = isFirstColor
          ? `rgba(0, 212, 255, ${0.3 + Math.sin(time * 0.2 + i) * 0.3})`
          : `rgba(168, 85, 247, ${0.3 + Math.cos(time * 0.2 + i) * 0.3})`

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow to particles
        ctx.fillStyle = isFirstColor
          ? `rgba(0, 212, 255, ${0.1 + Math.sin(time * 0.2 + i) * 0.1})`
          : `rgba(168, 85, 247, ${0.1 + Math.cos(time * 0.2 + i) * 0.1})`
        ctx.beginPath()
        ctx.arc(x, y, size * 2.5, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => setCanvasSize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-80" />
}
