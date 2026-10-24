"use client"

import { useEffect, useRef, useState } from "react"
import allFrames from "@/lib/digimon-frames.json"

const frames = allFrames.filter(frame => !["Botamon", "Koromon"].includes(frame.name))

// Character density is sampled from the reference artwork for each evolution.
export function AsciiEvolution() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  const elapsed = useRef(0)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx || frames.length === 0) return
    if (!Number.isFinite(elapsed.current)) elapsed.current = 0
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
      if (now - last > 30) {
        last = now
        const t = elapsed.current
        ctx.clearRect(0, 0, width, height)
        ctx.textBaseline = "top"
        const creatures = [
          { x: width - 350, y: Math.max(height * .56, height - 325), size: 3.7, opacity: .65, seed: 7, speed: 11 },
          { x: -105, y: height * .19, size: 3.3, opacity: .40, seed: 31, speed: 17 },
        ]
        for (const creature of creatures) {
          // Translate the intact silhouette; avoid rotating individual glyphs.
          const offsetX = Math.sin(t * .085 + creature.seed) * 30 + Math.sin(t * .037 + creature.seed * 2) * 18
          const offsetY = Math.sin(t * .065 + creature.seed * .7) * 22
          const clock = Math.max(0, Number.isFinite(t) ? t : 0) + (creature.seed === 7 ? 0 : 3)
          const cycle = Math.floor(clock / 14)
          const stage = cycle % frames.length
          const current = frames[stage] ?? frames[0]
          const next = frames[(stage + 1) % frames.length] ?? current
          if (!current?.rows || !next?.rows) continue
          const progress = Math.max(0, Math.min(1, (clock % 14 - 12) / 2))
          const pulse = Math.sin(progress * Math.PI)
          ctx.font = `${creature.size * 1.6}px monospace`
          for (let y = 0; y < 64; y++) for (let x = 0; x < 96; x++) {
            const oldChar = current.rows[y]?.[x] ?? " "
            const newChar = next.rows[y]?.[x] ?? " "
            // A gently staggered scan reconstructs the next form in place.
            const stagger = ((x * 17 + y * 31) % 29) / 29
            const threshold = .12 + y / 64 * .62 + stagger * .16
            const changed = progress > threshold
            let char = changed ? newChar : oldChar
            const scan = progress > 0 && Math.abs(progress - threshold) < .055
            if (scan && (oldChar !== " " || newChar !== " ")) char = ".:+"[(x + y) % 3]
            if (char === " ") continue
            const screenX = creature.x + offsetX + x * creature.size
            const screenY = creature.y + offsetY + y * creature.size * 1.5
            const centerDistance = Math.abs(screenX - width / 2)
            const readingFade = width < 700 ? .22 : Math.min(1, Math.max(.05, (centerDistance - 275) / 100))
            const alpha = creature.opacity * readingFade * (scan ? .55 : 1 - pulse * .12)
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




