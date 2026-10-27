"use client"

import { useEffect, useRef, useState } from "react"

type Track = { status: "playing" | "idle" | "unavailable"; title?: string; artist?: string; songUrl?: string; album?: string; albumImageUrl?: string; durationMs?: number; progressMs?: number; fetchedAt?: number }
const time = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}`

function AsciiCover({ url, album }: { url: string; album?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    let cancelled = false, frame = 0, ready = false
    let last: { x: number; y: number } | null = null
    let brushDistance = 0
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    const link = canvas?.closest("a")
    if (!canvas || !ctx || !link) return
    setFailed(false)
    const layer = () => {
      const result = document.createElement("canvas")
      result.width = 168; result.height = 168
      return result
    }
    const ascii = layer(), colors = layer(), mask = layer(), revealed = layer()
    const asciiCtx = ascii.getContext("2d")!
    const colorCtx = colors.getContext("2d")!
    const maskCtx = mask.getContext("2d")!
    maskCtx.globalCompositeOperation = "lighter"
    const revealCtx = revealed.getContext("2d")!
    function draw() {
      frame = 0
      if (cancelled || !ready || !ctx) return
      ctx.clearRect(0, 0, 168, 168)
      ctx.drawImage(ascii, 0, 0)
      if (link?.matches(":focus-visible")) { ctx.drawImage(colors, 0, 0); return }
      revealCtx.clearRect(0, 0, 168, 168)
      revealCtx.globalCompositeOperation = "source-over"
      revealCtx.drawImage(colors, 0, 0)
      revealCtx.globalCompositeOperation = "destination-in"
      revealCtx.drawImage(mask, 0, 0)
      ctx.drawImage(revealed, 0, 0)
    }
    function requestDraw() { if (!frame) frame = requestAnimationFrame(draw) }
    function stamp(x: number, y: number) {
      const brush = maskCtx.createRadialGradient(x, y, 13, x, y, 18)
      brush.addColorStop(0, "rgba(255,255,255,.055)"); brush.addColorStop(1, "#ffffff00")
      maskCtx.fillStyle = brush
      maskCtx.fillRect(x - 18, y - 18, 36, 36)
    }
    const brush = (event: PointerEvent) => {
      if (!ready) return
      const bounds = canvas.getBoundingClientRect()
      const point = { x: (event.clientX - bounds.left) * 168 / bounds.width, y: (event.clientY - bounds.top) * 168 / bounds.height }
      if (!last) { stamp(point.x, point.y); brushDistance = 0 }
      else {
        const distance = Math.hypot(point.x - last.x, point.y - last.y)
        // Fixed travel spacing keeps reveal strength independent of mouse event rate.
        for (let d = 4 - brushDistance; d <= distance; d += 4) {
          stamp(last.x + (point.x - last.x) * d / distance, last.y + (point.y - last.y) * d / distance)
        }
        brushDistance = (brushDistance + distance) % 4
      }
      last = point
      requestDraw()
    }
    const leave = () => { last = null; brushDistance = 0 }
    canvas.addEventListener("pointerenter", brush)
    canvas.addEventListener("pointermove", brush)
    canvas.addEventListener("pointerleave", leave)
    link.addEventListener("focus", requestDraw)
    link.addEventListener("blur", requestDraw)
    const image = new window.Image()
    image.onload = () => {
      if (cancelled) return
      try {
        const sample = document.createElement("canvas")
        sample.width = 24; sample.height = 16
        const source = sample.getContext("2d")!
        source.drawImage(image, 0, 0, 24, 16)
        const pixels = source.getImageData(0, 0, 24, 16).data
        const buckets = new Map<string, { count: number; r: number; g: number; b: number }>()
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2]
          const luma = r * .2126 + g * .7152 + b * .0722
          if (luma < 30 || luma > 210) continue
          const key = `${r >> 5},${g >> 5},${b >> 5}`
          const bucket = buckets.get(key) || { count: 0, r: 0, g: 0, b: 0 }
          bucket.count++; bucket.r += r; bucket.g += g; bucket.b += b
          buckets.set(key, bucket)
        }
        const colors = [...buckets.values()].sort((a, b) => b.count - a.count).map(bucket => [Math.round(bucket.r / bucket.count), Math.round(bucket.g / bucket.count), Math.round(bucket.b / bucket.count)])
        const palette: number[][] = []
        for (const color of colors) {
          if (palette.every(other => Math.hypot(...color.map((value, index) => value - other[index])) > 65)) palette.push(color)
          if (palette.length === 4) break
        }
        if (!palette.length) palette.push([66, 87, 115])
        for (let i = 1; i <= 6; i++) link.style.setProperty(`--cover-note-color-${i}`, `rgb(${palette[(i - 1) % palette.length].join(",")})`)
        colorCtx.imageSmoothingEnabled = false
        colorCtx.drawImage(sample, 0, 0, 168, 168)
        asciiCtx.fillStyle = "#f4f6f7"; asciiCtx.fillRect(0, 0, 168, 168)
        asciiCtx.font = "11px monospace"; asciiCtx.textBaseline = "top"
        const glyphs = " .:;+%S8#@"
        for (let y = 0; y < 16; y++) for (let x = 0; x < 24; x++) {
          const i = (y * 24 + x) * 4
          const shade = 1 - (pixels[i] * .2126 + pixels[i + 1] * .7152 + pixels[i + 2] * .0722) / 255
          asciiCtx.fillStyle = `rgba(66,87,115,${.2 + shade * .7})`
          asciiCtx.fillText(glyphs[Math.min(9, Math.floor(shade * 10))], x * 7, y * 10.5)
        }
        ready = true
        requestDraw()
      } catch { if (!cancelled) setFailed(true) }
    }
    image.onerror = () => { if (!cancelled) setFailed(true) }
    image.src = `/_next/image?url=${encodeURIComponent(url)}&w=96&q=75`
    return () => {
      cancelled = true; cancelAnimationFrame(frame)
      canvas.removeEventListener("pointerenter", brush)
      canvas.removeEventListener("pointermove", brush)
      canvas.removeEventListener("pointerleave", leave)
      link.removeEventListener("focus", requestDraw)
      link.removeEventListener("blur", requestDraw)
      for (let i = 1; i <= 6; i++) link.style.removeProperty(`--cover-note-color-${i}`)
    }
  }, [url])
  return failed ? <span className="ascii-cover cover-placeholder" aria-label="Album art unavailable">♫</span> : <canvas ref={ref} width={168} height={168} className="ascii-cover" role="img" aria-label={`ASCII cover art${album ? ` for ${album}` : ""}`} />
}

function MusicNotes() {
  return <span className="spotify-hover-notes" aria-hidden="true">{[0, 1, 2, 3, 4, 5].map(index => <svg key={index} style={{ animationDelay: `${0.65 + index * 0.27}s` }} width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">{index % 2 ? <><path d="M6 11V3l7-1v8M6 5l7-1" /><ellipse cx="4" cy="12" rx="2" ry="1.5" /><ellipse cx="11" cy="11" rx="2" ry="1.5" /></> : <><path d="M9 11V2c0 3 4 2 4 5" /><ellipse cx="7" cy="12" rx="2" ry="1.5" /></>}</svg>)}</span>
}

export function SpotifyNowPlaying() {
  const [track, setTrack] = useState<Track | null>(null)
  const [now, setNow] = useState(0)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("portfolio:last-track") || "null")
      if (saved?.title && typeof saved.songUrl === "string" && saved.songUrl.startsWith("https://open.spotify.com/")) setTrack({ ...saved, status: "idle" })
    } catch { /* Storage is optional. */ }
    const controller = new AbortController()
    let pending = false
    async function update() {
      if (pending || document.visibilityState !== "visible") return
      pending = true
      try {
        const response = await fetch("/api/spotify", { cache: "no-store", signal: controller.signal })
        const data = await response.json()
        if (!controller.signal.aborted) {
          if (response.ok && data.title && data.songUrl) {
            setTrack(data)
            try { localStorage.setItem("portfolio:last-track", JSON.stringify(data)) } catch { /* Storage is optional. */ }
          } else setTrack(previous => ({ ...previous, status: response.ok ? data.status : "unavailable" }))
          setNow(Date.now())
        }
      } catch {
        if (!controller.signal.aborted) setTrack(previous => ({ ...previous, status: "unavailable" }))
      } finally { pending = false }
    }
    void update()
    const interval = setInterval(update, 45000)
    const ticker = setInterval(() => { if (document.visibilityState === "visible") setNow(Date.now()) }, 1000)
    document.addEventListener("visibilitychange", update)
    return () => { controller.abort(); clearInterval(interval); clearInterval(ticker); document.removeEventListener("visibilitychange", update) }
  }, [])
  if (!track?.songUrl) return <p className="spotify-line"><a href="https://open.spotify.com/user/sbstnvlncia" target="_blank" rel="noreferrer">♫ {track?.status === "idle" ? "Nothing playing right now" : "My Spotify ↗"}<MusicNotes /></a></p>
  const duration = track.durationMs || 0
  const progress = Math.min(duration, (track.progressMs || 0) + Math.max(0, now - (track.fetchedAt || now)))
  return <aside className="spotify-player" aria-label={track.status === "playing" ? "Currently listening on Spotify" : "Last listened on Spotify"}>
    <a className="spotify-art-link" href={track.songUrl} target="_blank" rel="noreferrer" aria-label={`Open ${track.title} on Spotify`}>
      {track.albumImageUrl ? <AsciiCover url={track.albumImageUrl} album={track.album} /> : <span className="ascii-cover cover-placeholder">♫</span>}
      <MusicNotes />
    </a>
    <div className="spotify-details">
      <span className="spotify-caption">{track.status === "playing" ? "Listening now · " : track.status === "idle" ? "Nothing playing · " : "Last played · "}<a href="https://open.spotify.com/user/sbstnvlncia" target="_blank" rel="noreferrer">My Spotify ↗<MusicNotes /></a></span>
      <a className="spotify-title" href={track.songUrl} target="_blank" rel="noreferrer"><span className="spotify-title-text">{track.title}</span><MusicNotes /></a>
      <span className="spotify-artist">{track.artist}</span>
      {track.status === "playing" && duration > 0 && <div className="spotify-timeline"><span>{time(progress)}</span><div className="spotify-progress" role="progressbar" aria-label="Track progress" aria-valuemin={0} aria-valuemax={Math.round(duration / 1000)} aria-valuenow={Math.round(progress / 1000)}><span style={{ width: `${progress / duration * 100}%` }} /></div><span>{time(duration)}</span></div>}
    </div>
  </aside>
}
