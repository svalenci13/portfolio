"use client"

import { useEffect, useRef } from "react"

type Point = [number, number]
// Filled pixel silhouettes, sampled into character cells rather than outline art.
const body: Point[] = [[22,25],[28,20],[30,13],[36,8],[42,10],[45,14],[53,16],[54,20],[47,23],[42,22],[40,29],[44,34],[43,44],[38,48],[29,47],[24,40],[20,35]]
const leg: Point[] = [[29,40],[35,41],[33,50],[27,55],[20,55],[22,52],[27,49]]
const arm: Point[] = [[38,28],[43,29],[48,35],[53,36],[52,40],[45,39],[39,34]]
const tail: Point[] = [[26,36],[20,41],[12,39],[5,32],[9,44],[17,48],[28,44]]
const horn: Point[] = [[30,14],[28,3],[35,10],[40,4],[42,12]]
const wing: Point[] = [[25,31],[8,7],[7,24],[11,22],[12,32],[17,29],[19,39]]
function inside(x: number, y: number, polygon: Point[]) {
  let hit = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i], [xj, yj] = polygon[j]
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) hit = !hit
  }
  return hit
}

export function AsciiEvolution() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0, last = -100, start = performance.now()
    let width = 0, height = 0
    function resize() {
      width = window.innerWidth; height = window.innerHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * ratio; canvas!.height = height * ratio
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    function draw(now: number) {
      if (!ctx) return
      if (now - last > 90) {
        last = now
        const t = motion.matches ? 32 : (now - start) / 1000
        const stage = Math.floor(t / 12) % 3
        const phase = (t % 12) / 12
        const fade = motion.matches ? 1 : Math.min(1, phase * 12, (1 - phase) * 12)
        ctx.clearRect(0, 0, width, height)
        ctx.font = "10px monospace"
        ctx.textBaseline = "top"
        // Multiple floating silhouettes, with the reading column kept clear.
        const creatures = [
          { x: -85 + Math.sin(t * .16) * 48, y: height * .13 + Math.cos(t * .24) * 22, size: 5.3, flip: false },
          { x: width - 250 + Math.sin(t * .12 + 2) * 65, y: height * .60 + Math.sin(t * .21) * 32, size: 5.8, flip: true },
          { x: width * .34 + Math.sin(t * .10) * 65, y: height * .83, size: 3.2, flip: false },
        ]
        for (const creature of creatures) {
          for (let y = 0; y < 58; y += 2) for (let x = 0; x < 58; x++) {
            const sway = Math.sin(t * 1.4 + y * .1)
            const px = x + (y > 36 ? sway * 1.6 : 0)
            const shapes = [body, leg, arm, tail]
            if (stage > 0) shapes.push(horn)
            if (stage === 2) shapes.push(wing)
            const filled = shapes.some(shape => inside(px, y, shape))
            if (!filled) continue
            const screenX = creature.x + (creature.flip ? 58 - x : x) * creature.size
            const screenY = creature.y + y * creature.size + Math.sin(t + x * .07) * 4
            const centerDistance = Math.abs(screenX - width / 2)
            const clearText = width < 700 ? .16 : Math.min(1, Math.max(.06, (centerDistance - 280) / 140))
            const shade = ((x * 17 + y * 31) % 11) / 11
            const alpha = (.22 + shade * .3) * fade * clearText
            ctx.fillStyle = `rgba(106,125,148,${alpha * .3})`
            ctx.fillRect(screenX, screenY, creature.size + .5, creature.size * 2)
            ctx.fillStyle = `rgba(66,87,115,${alpha})`
            const chars = ".:;%S8@#"
            ctx.fillText(chars[(x * 7 + y * 3 + Math.floor(t * 2)) % chars.length], screenX, screenY)
          }
        }
      }
      frame = requestAnimationFrame(draw)
    }
    resize(); frame = requestAnimationFrame(draw)
    window.addEventListener("resize", resize)
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize) }
  }, [])
  return <canvas ref={ref} className="ascii-evolution" aria-hidden="true" />
}

