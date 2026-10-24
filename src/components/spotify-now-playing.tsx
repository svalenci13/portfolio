"use client"

import { useEffect, useRef, useState } from "react"

type Track = { status: "playing" | "idle" | "unavailable"; title?: string; artist?: string; songUrl?: string; album?: string; albumImageUrl?: string; durationMs?: number; progressMs?: number; fetchedAt?: number }
const time = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}`

function AsciiCover({ url, album }: { url: string; album?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    let cancelled = false
    setFailed(false)
    const image = new window.Image()
    image.onload = () => {
      if (cancelled) return
      try {
        const sample = document.createElement("canvas")
        sample.width = 24; sample.height = 16
        const source = sample.getContext("2d")!
        source.drawImage(image, 0, 0, 24, 16)
        const pixels = source.getImageData(0, 0, 24, 16).data
        const ctx = ref.current?.getContext("2d")
        if (!ctx) return
        ctx.clearRect(0, 0, 168, 168)
        ctx.fillStyle = "#f4f6f7"; ctx.fillRect(0, 0, 168, 168)
        ctx.font = "11px monospace"; ctx.textBaseline = "top"
        const glyphs = " .:;+%S8#@"
        for (let y = 0; y < 16; y++) for (let x = 0; x < 24; x++) {
          const i = (y * 24 + x) * 4
          const luma = pixels[i] * .2126 + pixels[i + 1] * .7152 + pixels[i + 2] * .0722
          const shade = 1 - luma / 255
          ctx.fillStyle = `rgba(66,87,115,${.2 + shade * .7})`
          ctx.fillText(glyphs[Math.min(9, Math.floor(shade * 10))], x * 7, y * 10.5)
        }
      } catch { if (!cancelled) setFailed(true) }
    }
    image.onerror = () => { if (!cancelled) setFailed(true) }
    // Same-origin image proxy keeps canvas pixel access safe from cross-origin restrictions.
    image.src = `/_next/image?url=${encodeURIComponent(url)}&w=96&q=75`
    return () => { cancelled = true }
  }, [url])
  return failed ? <span className="ascii-cover cover-placeholder" aria-label="Album art unavailable">♫</span> : <canvas ref={ref} width={168} height={168} className="ascii-cover" role="img" aria-label={`ASCII cover art${album ? ` for ${album}` : ""}`} />
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
  if (!track?.songUrl) return <p className="spotify-line"><a href="https://open.spotify.com/user/sbstnvlncia" target="_blank" rel="noreferrer">♫ {track?.status === "idle" ? "Not listening right now" : "Find me on Spotify"}</a></p>
  const duration = track.durationMs || 0
  const progress = Math.min(duration, (track.progressMs || 0) + Math.max(0, now - (track.fetchedAt || now)))
  return <aside className="spotify-player" aria-label={track.status === "playing" ? "Currently listening on Spotify" : "Last listened on Spotify"}>
    <a href={track.songUrl} target="_blank" rel="noreferrer" aria-label={`Open ${track.title} on Spotify`}>
      {track.albumImageUrl ? <AsciiCover url={track.albumImageUrl} album={track.album} /> : <span className="ascii-cover cover-placeholder">♫</span>}
    </a>
    <div className="spotify-details">
      <span className="spotify-caption">{track.status === "playing" ? "Listening on " : track.status === "idle" ? "Nothing playing · Last listened on " : "Last listened on "}<a href="https://open.spotify.com/user/sbstnvlncia" target="_blank" rel="noreferrer">Spotify ↗</a></span>
      <a className="spotify-title" href={track.songUrl} target="_blank" rel="noreferrer">{track.title}</a>
      <span className="spotify-artist">{track.artist}</span>
      {track.status === "playing" && duration > 0 && <div className="spotify-timeline"><span>{time(progress)}</span><div className="spotify-progress" role="progressbar" aria-label="Track progress" aria-valuemin={0} aria-valuemax={Math.round(duration / 1000)} aria-valuenow={Math.round(progress / 1000)}><span style={{ width: `${progress / duration * 100}%` }} /></div><span>{time(duration)}</span></div>}
    </div>
  </aside>
}



