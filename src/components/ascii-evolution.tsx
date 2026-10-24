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
    let width = 0, height = 0, anchorX = 0, anchorY = 0
    function resize() {
      width = window.innerWidth; height = window.innerHeight
      const content = document.querySelector(".portfolio-content")?.getBoundingClientRect()
      anchorX = content?.left ?? (width - 650) / 2
      anchorY = content?.top ?? 76
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
          { x: anchorX + 485, y: anchorY + 445, size: 3.7, opacity: .65, seed: 7, speed: 11 },
          { x: anchorX - 205, y: anchorY + 110, size: 3.3, opacity: .40, seed: 31, speed: 17 },
        ]
        for (const creature of creatures) {
          // Translate the intact silhouette; avoid rotating individual glyphs.
          const offsetX = Math.sin(t * .075 + creature.seed) * 24 + Math.sin(t * .033 + creature.seed * 2) * 14
          const offsetY = Math.sin(t * .058 + creature.seed * .7) * 18
          const clock = Math.max(0, Number.isFinite(t) ? t : 0) + (creature.seed === 7 ? 0 : 3)
          const cycle = Math.floor(clock / 11)
          const stage = cycle % frames.length
          const current = frames[stage] ?? frames[0]
          const next = frames[(stage + 1) % frames.length] ?? current
          if (!current?.rows || !next?.rows) continue
          const progress = Math.max(0, Math.min(1, (clock % 11 - 8.5) / 2.5))
          const pulse = Math.sin(progress * Math.PI)
          if (progress > 0) {
            const cx = creature.x + offsetX + 48 * creature.size
            const cy = creature.y + offsetY + 48 * creature.size
            const energy = Math.sin(progress * Math.PI)
            ctx.save()
            ctx.strokeStyle = `rgba(100,127,157,${energy * .17})`
            ctx.lineWidth = .65
            ctx.setLineDash([2, 8])
            ctx.lineDashOffset = -progress * 45
            for (const tilt of [-.38, .38]) {
              ctx.beginPath()
              ctx.ellipse(cx, cy, creature.size * (40 + energy * 4), creature.size * 12, tilt, 0, Math.PI * 2)
              ctx.stroke()
            }
            ctx.font = "8px monospace"
            for (let n = 0; n < 16; n++) {
              const angle = n / 16 * Math.PI * 2 + progress * 2
              ctx.fillStyle = `rgba(100,127,157,${energy * .23})`
              ctx.fillText(n % 2 ? "1" : "0", cx + Math.cos(angle) * creature.size * 43, cy + Math.sin(angle) * creature.size * 17)
            }
            ctx.restore()
          }
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
            if (scan && (oldChar !== " " || newChar !== " ")) char = "01:#"[(x + y) % 4]
            if (char === " ") continue
            const screenX = creature.x + offsetX + x * creature.size
            const screenY = creature.y + offsetY + y * creature.size * 1.5
            const centerDistance = Math.abs(screenX - (anchorX + 325))
            const readingFade = .30 + Math.min(.70, Math.max(0, (centerDistance - 260) / 140))
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






