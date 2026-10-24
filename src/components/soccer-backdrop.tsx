"use client"

import { useEffect, useRef } from "react"
import rows from "@/lib/soccer-backdrop.json"

export function SoccerBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = ref.current?.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, 1440, 558)
    ctx.font = "10px monospace"; ctx.textBaseline = "top"
    ctx.fillStyle = "#637f9a"
    for (let y = 0; y < rows.length; y++) for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] !== " ") ctx.fillText(rows[y][x], x * 6, y * 9)
    }
  }, [])
  return <canvas ref={ref} width={1440} height={558} className="soccer-ascii-backdrop" aria-hidden="true" />
}


