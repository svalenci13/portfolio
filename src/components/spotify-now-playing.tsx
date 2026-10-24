"use client"

import { useEffect, useState } from "react"

type Track = { status: "playing" | "idle" | "unavailable"; title?: string; artist?: string; songUrl?: string }
export function SpotifyNowPlaying() {
  const [track, setTrack] = useState<Track | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    let pending = false
    async function update() {
      if (pending || document.visibilityState !== "visible") return
      pending = true
      try {
        const response = await fetch("/api/spotify", { cache: "no-store", signal: controller.signal })
        const data = await response.json()
        if (!controller.signal.aborted) setTrack(response.ok ? data : { status: "unavailable" })
      } catch {
        if (!controller.signal.aborted) setTrack({ status: "unavailable" })
      } finally { pending = false }
    }
    void update()
    const interval = setInterval(update, 45000)
    document.addEventListener("visibilitychange", update)
    return () => { controller.abort(); clearInterval(interval); document.removeEventListener("visibilitychange", update) }
  }, [])
  return <p className="spotify-line">
    <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.5 17.3a.75.75 0 0 1-1 .3c-2.8-1.7-6.3-2.1-10.5-1.1a.75.75 0 0 1-.4-1.5c4.6-1 8.5-.6 11.7 1.3.4.2.5.7.2 1Zm1.4-3.3a.9.9 0 0 1-1.2.3c-3.2-2-8.2-2.5-12-1.4a.9.9 0 0 1-.5-1.7c4.3-1.3 9.8-.7 13.4 1.5.4.3.6.9.3 1.3Zm.2-3.4c-3.9-2.3-10.3-2.5-14-1.4a1.05 1.05 0 0 1-.6-2c4.3-1.3 11.3-1 15.7 1.6a1.05 1.05 0 0 1-1.1 1.8Z" /></svg>
    {track?.status === "playing" && track.songUrl ? <><span>Listening to </span><a href={track.songUrl} target="_blank" rel="noreferrer">{track.title}</a><span> by {track.artist}</span></> : <a href="https://open.spotify.com/user/sbstnvlncia" target="_blank" rel="noreferrer">{track?.status === "idle" ? "Not listening right now" : "Find me on Spotify"}</a>}
  </p>
}

