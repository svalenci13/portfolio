"use client"

import { useEffect, useRef } from "react"

export function AsciiBanner() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    let cancelled = false
    const image = new window.Image()
    image.onload = () => {
      if (cancelled) return
      const canvas = ref.current
      const ctx = canvas?.getContext("2d")
      if (!canvas || !ctx) return
      const sample = document.createElement("canvas")
      const cols = 180, rows = 32
      sample.width = cols; sample.height = rows
      const pixels = sample.getContext("2d")!
      // Match the original wide banner crop before converting it into character cells.
      const targetAspect = canvas.width / canvas.height
      const cropHeight = Math.min(image.height, image.width / targetAspect)
      pixels.drawImage(image, 0, (image.height - cropHeight) / 2, image.width, cropHeight, 0, 0, cols, rows)
      const data = pixels.getImageData(0, 0, cols, rows).data
      ctx.fillStyle = "#f7f9fb"; ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = "10px monospace"; ctx.textBaseline = "top"
      const glyphs = " .:;+%S8#@"
      const cellX = canvas.width / cols, cellY = canvas.height / rows
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const p = (y * cols + x) * 4
        const shade = 1 - (data[p] * .2126 + data[p+1] * .7152 + data[p+2] * .0722) / 255
        ctx.fillStyle = `rgba(66,87,115,${.18 + shade * .62})`
        ctx.fillText(glyphs[Math.min(9, Math.floor(shade * 10))], x * cellX, y * cellY)
      }
    }
    image.src = "/logos/wide.jpeg"
    return () => { cancelled = true }
  }, [])
  return <canvas ref={ref} width={1080} height={256} className="article-ascii-banner" role="img" aria-label="Soccer players warming up in a stadium, rendered in blue-gray ASCII characters" />
}

