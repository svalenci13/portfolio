"use client"

import { useEffect, useRef, useState } from "react"
import frames from "@/lib/digimon-frames.json"

// Character density is sampled from the reference artwork for each evolution.
export function AsciiEvolution() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  const elapsed = useRef(0)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    let frame = 0, last = 0, previous = performance.now()
    let width = 0, height = 0
    function resize() {
      width = window.innerWidth; height = window.innerHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * ratio; canvas!.height = height * ratio
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    function draw(now: number) {
      if (!ctx) return
      if (!paused) elapsed.current += Math.min(now - previous, 100) / 1000
      previous = now
      if (now - last > 50) {
        last = now
        const t = elapsed.current
        const stage = Math.floor(t / 8) % frames.length
        const phase = t % 8
        const fade = Math.min(1, (phase + .5) * 2, (8 - phase) * 2)
        ctx.clearRect(0, 0, width, height)
        ctx.textBaseline = "top"
        const creatures = [
          { x: width - 365 + Math.sin(t * .45) * 30, y: Math.max(height * .56, height - 325) + Math.sin(t * .8) * 15, size: 3.7, opacity: .65 },
          { x: -105 + Math.sin(t * .35 + 1) * 35, y: height * .12 + Math.cos(t * .6) * 20, size: 3.3, opacity: .40 },
        ]
        for (const creature of creatures) {
          ctx.font = `${creature.size * 1.6}px monospace`
          const rows = frames[stage].rows
          for (let y = 0; y < rows.length; y++) for (let x = 0; x < rows[y].length; x++) {
            const char = rows[y][x]
            if (char === " ") continue
            const screenX = creature.x + x * creature.size
            const screenY = creature.y + y * creature.size * 1.5 + Math.sin(t * 1.3 + x * .055) * 2
            const centerDistance = Math.abs(screenX - width / 2)
            const readingFade = width < 700 ? .22 : Math.min(1, Math.max(.05, (centerDistance - 275) / 100))
            const alpha = creature.opacity * fade * readingFade
            ctx.fillStyle = `rgba(106,125,148,${alpha * .14})`
            ctx.fillRect(screenX, screenY, creature.size, creature.size * 1.5)
            ctx.fillStyle = `rgba(58,79,106,${alpha})`
            ctx.fillText(char, screenX, screenY)
          }
        }
      }
      frame = requestAnimationFrame(draw)
    }
    resize(); frame = requestAnimationFrame(draw)
    window.addEventListener("resize", resize)
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize) }
  }, [paused])
  return <><canvas ref={ref} className="ascii-evolution" aria-hidden="true" /><button className="background-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "animate background" : "pause background"}</button></>
}

