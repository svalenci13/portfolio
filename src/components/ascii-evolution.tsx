"use client"

import { useEffect, useRef, useState } from "react"
import allFrames from "@/lib/digimon-frames.json"

const frames = allFrames.filter(frame => !["Botamon", "Koromon"].includes(frame.name))

// Smooth seeded waypoints produce independent paths without a repeating bob cycle.
function wander(time: number, seed: number) {
  const segment = Math.floor(time)
  const fraction = time - segment
  const blend = fraction * fraction * fraction * (fraction * (fraction * 6 - 15) + 10)
  const value = (index: number) => {
    const hash = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453
    return (hash - Math.floor(hash)) * 2 - 1
  }
  return value(segment) * (1 - blend) + value(segment + 1) * blend
}

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
          { x: width - 350, y: Math.max(height * .56, height - 325), size: 3.7, opacity: .65, seed: 7, speed: 11 },
          { x: -105, y: height * .19, size: 3.3, opacity: .40, seed: 31, speed: 17 },
        ]
        for (const creature of creatures) {
          const travel = t / creature.speed
          const offsetX = wander(travel, creature.seed) * 105 + wander(travel * 2.3, creature.seed + 1) * 14
          const offsetY = wander(travel * .83, creature.seed + 2) * 80
          const angle = wander(travel * 1.17, creature.seed + 3) * .14
          const scale = 1 + wander(travel * .57, creature.seed + 4) * .045
          const cosine = Math.cos(angle), sine = Math.sin(angle)
          ctx.font = `${creature.size * 1.6}px monospace`
          const rows = frames[stage].rows
          for (let y = 0; y < rows.length; y++) for (let x = 0; x < rows[y].length; x++) {
            const char = rows[y][x]
            if (char === " ") continue
            const localX = (x - 48) * creature.size * scale
            const localY = (y - 32) * creature.size * 1.5 * scale
            const screenX = creature.x + 48 * creature.size + offsetX + localX * cosine - localY * sine
            const screenY = creature.y + 48 * creature.size + offsetY + localX * sine + localY * cosine
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


