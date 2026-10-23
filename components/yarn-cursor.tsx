"use client"

import { useEffect, useRef } from "react"

type Point = { x: number; y: number; t: number; size: number; hue: number }

const LIFETIME = 900 // ms a point stays on screen
const MAX_POINTS = 80
const SAMPLE_MS = 16 // record at most one point per frame

/**
 * Beaded "yarn" trail that follows the mouse, re-implemented from kynq.in/match:
 * tapering violet→magenta segments with round beads at each sample, screen-blended.
 * Disabled on touch-only devices and for users who prefer reduced motion.
 */
export function YarnCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    let points: Point[] = []
    let lastSample = 0
    let frame = 0
    let width = 0
    let height = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastSample < SAMPLE_MS) return
      lastSample = now
      points.push({ x: e.clientX, y: e.clientY, t: now, size: 3 + 2 * Math.random(), hue: 270 + 30 * Math.random() })
      if (points.length > MAX_POINTS) points.shift()
    }

    const draw = () => {
      const now = performance.now()
      ctx.clearRect(0, 0, width, height)
      points = points.filter((p) => now - p.t < LIFETIME)

      ctx.lineCap = "round"
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1]
        const b = points[i]
        const age = (now - b.t) / LIFETIME
        const alpha = (1 - age) * 0.55
        if (alpha <= 0) continue
        ctx.strokeStyle = `hsla(${b.hue}, 75%, 65%, ${alpha})`
        ctx.lineWidth = b.size * (1 - age)
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
      for (const p of points) {
        const age = (now - p.t) / LIFETIME
        const alpha = (1 - age) * 0.85
        if (alpha <= 0) continue
        ctx.fillStyle = `hsla(${p.hue}, 75%, 65%, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (1 - 0.5 * age), 0, Math.PI * 2)
        ctx.fill()
      }
      frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMove, { passive: true })
    frame = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
