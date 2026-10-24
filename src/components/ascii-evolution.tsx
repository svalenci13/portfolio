"use client"

import { useEffect, useRef, useState } from "react"
import allFrames from "@/lib/digimon-frames.json"

const frames = allFrames.filter(frame => !["Botamon", "Koromon"].includes(frame.name))

export function AsciiEvolution() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  const elapsed = useRef(0)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx || !frames.length) return
    if (!Number.isFinite(elapsed.current)) elapsed.current = 0
    let frame = 0, previous = performance.now()
    let width = 0, height = 0, ratio = 1
    const cache = new Map<string, HTMLCanvasElement>()
    const buffers = new Map<number, HTMLCanvasElement>()
    function resize() {
      width = window.innerWidth; height = window.innerHeight
      ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.round(width * ratio); canvas!.height = Math.round(height * ratio)
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx!.imageSmoothingEnabled = false
      cache.clear(); buffers.clear()
    }
    function sprite(stage: number, size: number) {
      const key = `${stage}:${size}`
      const existing = cache.get(key)
      if (existing) return existing
      const layer = document.createElement("canvas")
      layer.width = Math.round(96 * size * ratio); layer.height = Math.round(96 * size * ratio)
      const ink = layer.getContext("2d")!
      ink.setTransform(ratio, 0, 0, ratio, 0, 0)
      ink.font = `${size * 1.6}px monospace`
      ink.textBaseline = "top"
      for (let y = 0; y < 64; y++) for (let x = 0; x < 96; x++) {
        const char = frames[stage]?.rows[y]?.[x] ?? " "
        if (char === " ") continue
        ink.fillStyle = "rgba(106,125,148,.14)"
        ink.fillRect(x * size, y * size * 1.5, size, size * 1.5)
        ink.fillStyle = "#3a4f6a"
        ink.fillText(char, x * size, y * size * 1.5)
      }
      cache.set(key, layer)
      return layer
    }
    function draw(now: number) {
      if (!ctx) return
      if (!paused) elapsed.current += Math.max(0, Math.min(now - previous, 100)) / 1000
      previous = now
      const t = elapsed.current
      ctx.clearRect(0, 0, width, height)
      const contentLeft = width / 2 - 325
      const creatures = [
        { x: width / 2 + 300, y: Math.min(height - 335, height * .56), size: 4, opacity: .31, seed: 7, delay: 0 },
        { x: contentLeft - 325, y: height * .18, size: 3, opacity: .23, seed: 31, delay: 3 },
      ]
      for (const creature of creatures) {
        const clock = Math.max(0, Number.isFinite(t) ? t : 0) + creature.delay
        const stage = Math.floor(clock / 14) % frames.length
        const progress = Math.max(0, Math.min(1, (clock % 14 - 12) / 2))
        const extent = 96 * creature.size
        // Move a cached raster at physical-pixel boundaries. Glyphs never rerasterize in motion.
        const x = Math.round((creature.x + Math.sin(t * .085 + creature.seed) * 24 + Math.sin(t * .037) * 12) * ratio) / ratio
        const y = Math.round((creature.y + Math.sin(t * .065 + creature.seed * .7) * 18) * ratio) / ratio
        let composite = buffers.get(creature.size)
        if (!composite) {
          composite = document.createElement("canvas")
          composite.width = Math.round(extent * ratio); composite.height = Math.round(extent * ratio)
          buffers.set(creature.size, composite)
        }
        const layer = composite.getContext("2d")!
        const old = sprite(stage, creature.size)
        const next = sprite((stage + 1) % frames.length, creature.size)
        layer.clearRect(0, 0, composite.width, composite.height)
        layer.drawImage(old, 0, 0)
        if (progress > 0) {
          // A single soft scan only during evolution; ordinary movement stays unchanged.
          const scanY = progress * (composite.height + 48 * ratio) - 24 * ratio
          layer.save()
          layer.beginPath(); layer.rect(0, 0, composite.width, Math.max(0, scanY)); layer.clip()
          layer.clearRect(0, 0, composite.width, composite.height)
          layer.drawImage(next, 0, 0)
          layer.restore()
          const glow = layer.createLinearGradient(0, scanY - 12 * ratio, 0, scanY + 12 * ratio)
          glow.addColorStop(0, "rgba(111,142,175,0)")
          glow.addColorStop(.5, "rgba(111,142,175,.07)")
          glow.addColorStop(1, "rgba(111,142,175,0)")
          layer.fillStyle = glow; layer.fillRect(0, scanY - 12 * ratio, composite.width, 24 * ratio)
        }
        ctx.save()
        ctx.globalAlpha = width < 700 ? .08 : creature.opacity
        ctx.drawImage(composite, x, y, extent, extent)
        ctx.restore()
      }
      frame = requestAnimationFrame(draw)
    }
    resize(); frame = requestAnimationFrame(draw)
    window.addEventListener("resize", resize)
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize) }
  }, [paused])
  return <><canvas ref={ref} className="ascii-evolution" aria-hidden="true" /><button className="background-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "animate background" : "pause background"}</button></>
}


