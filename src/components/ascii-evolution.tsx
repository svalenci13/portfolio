"use client"

import { useEffect, useRef, useState } from "react"
import allFrames from "@/lib/digimon-frames.json"
import gabumonFrames from "@/lib/gabumon-frames.json"

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
          { x: anchorX + 485, y: anchorY + 445, size: 3.7, opacity: .65, seed: 7, chain: gabumonFrames },
          { x: anchorX - 205, y: anchorY + 110, size: 3.3, opacity: .40, seed: 31, chain: frames },
        ]
        for (const creature of creatures) {
          const chain = creature.chain
          // Translate the intact silhouette; avoid rotating individual glyphs.
          const offsetX = Math.sin(t * .05 + creature.seed) * 12 + Math.sin(t * .025 + creature.seed * 2) * 7
          const offsetY = Math.sin(t * .04 + creature.seed * .7) * 9
          const clock = Math.max(0, Number.isFinite(t) ? t : 0)
          const cycle = Math.floor(clock / 11)
          const stage = cycle % chain.length
          const current = chain[stage] ?? chain[0]
          const next = chain[(stage + 1) % chain.length] ?? current
          if (!current?.rows || !next?.rows) continue
          const progress = Math.max(0, Math.min(1, (clock % 11 - 8.5) / 2.5))
          const size = creature.size
          const originX = creature.x
          const originY = creature.y
          // Sample both forms at their own final size throughout the scan.
          const sample = (index: number, x: number, y: number) => {
            const scale = ["Agumon", "Gabumon"].includes(chain[index]?.name) ? .75 : 1
            const sx = Math.floor(48 + (x - 48) / scale)
            const sy = Math.floor(64 + (y - 64) / scale)
            return sx >= 0 && sx < 96 && sy >= 0 && sy < 64 ? chain[index]?.rows[sy]?.[sx] ?? " " : " "
          }
          const pulse = Math.sin(progress * Math.PI)
          if (progress > 0) {
            const cx = originX + offsetX + 48 * size
            const cy = originY + offsetY + 48 * size
            const energy = Math.sin(progress * Math.PI)
            ctx.save()
            ctx.strokeStyle = `rgba(100,127,157,${energy * .17})`
            ctx.lineWidth = .65
            ctx.setLineDash([2, 8])
            ctx.lineDashOffset = -progress * 45
            for (const tilt of [-.38, .38]) {
              ctx.beginPath()
              ctx.ellipse(cx, cy, size * (40 + energy * 4), size * 12, tilt, 0, Math.PI * 2)
              ctx.stroke()
            }
            ctx.font = "8px monospace"
            for (let n = 0; n < 16; n++) {
              const angle = n / 16 * Math.PI * 2 + progress * 2
              ctx.fillStyle = `rgba(100,127,157,${energy * .23})`
              ctx.fillText(n % 2 ? "1" : "0", cx + Math.cos(angle) * size * 43, cy + Math.sin(angle) * size * 17)
            }
            ctx.restore()
          }
          ctx.font = `${size * 1.6}px monospace`
          for (let y = 0; y < 64; y++) for (let x = 0; x < 96; x++) {
            const oldChar = sample(stage, x, y)
            const newChar = sample((stage + 1) % chain.length, x, y)
            // A gently staggered scan reconstructs the next form in place.
            const stagger = ((x * 17 + y * 31) % 29) / 29
            const threshold = .12 + y / 64 * .62 + stagger * .16
            const changed = progress > threshold
            let char = changed ? newChar : oldChar
            const scan = progress > 0 && Math.abs(progress - threshold) < .055
            if (scan && (oldChar !== " " || newChar !== " ")) char = "01:#"[(x + y) % 4]
            if (char === " ") continue
            const screenX = originX + offsetX + x * size
            const screenY = originY + offsetY + y * size * 1.5
            const centerDistance = Math.abs(screenX - (anchorX + 325))
            const readingFade = .30 + Math.min(.70, Math.max(0, (centerDistance - 260) / 140))
            const alpha = creature.opacity * readingFade * (scan ? .55 : 1 - pulse * .12)
            ctx.fillStyle = `rgba(106,125,148,${alpha * .14})`
            ctx.fillRect(screenX, screenY, size, size * 1.5)
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











