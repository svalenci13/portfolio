"use client"

import { useEffect, useId, useRef, useState } from "react"

const videos = [
  { title: "Stewie2k B Hold CSGO Boston Major Final", src: "/videos/stew.mp4", preview: 22, category: "Counter-Strike" },
  { title: "Messi Game Winner vs Real Madrid", src: "/videos/messi-bernabeu.mp4", preview: 2, category: "Football" },
  { title: "Kakashi vs. Obito", src: "/videos/kakashi-obito.mp4", preview: 65, category: "Naruto Shippuden" },
]

function PeakPlayer({ src, title, onEnded }: { src: string; title: string; onEnded: () => void }) {
  const media = useRef<HTMLVideoElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(.17)
  const [fullscreen, setFullscreen] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [hovered, setHovered] = useState(false)
  const touchInteraction = useRef(false)
  const seeking = useRef(false)
  const started = useRef(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const revealControls = () => {
    setControlsVisible(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => { if (!seeking.current) setControlsVisible(false) }, 2000)
  }
  useEffect(() => {
    const update = () => { setFullscreen(document.fullscreenElement === frame.current); revealControls() }
    document.addEventListener("fullscreenchange", update)
    return () => { document.removeEventListener("fullscreenchange", update); if (hideTimer.current) clearTimeout(hideTimer.current) }
  }, [])
  const startPlayback = () => {
    const video = media.current
    if (!video || started.current) return
    void video.play().catch(() => {
      // Mobile browsers may require muted playback outside the original tap.
      video.muted = true
      setVolume(0)
      void video.play().catch(() => setPlaying(false))
    })
  }
  const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`
  const toggle = () => { const video = media.current; if (!video) return; if (video.paused) void video.play().catch(() => {}); else video.pause() }
  const changeVolume = (value: number) => { setVolume(value); if (media.current) { media.current.muted = value === 0; media.current.volume = value } }
  useEffect(() => { revealControls(); if (media.current) { media.current.volume = .17; startPlayback() } }, [])
  return <div ref={frame} className="peak-themed-player" data-controls-visible={controlsVisible || (!fullscreen && hovered)} onPointerEnter={event => { if (event.pointerType === "mouse") { setHovered(true); revealControls() } }} onPointerLeave={event => { if (event.pointerType === "mouse") { setHovered(false); setControlsVisible(false) } }} onPointerMove={event => { if (fullscreen || event.pointerType !== "mouse") revealControls() }} onPointerDown={revealControls} onFocusCapture={revealControls}>
    <div className="peak-video-stage">
      <video ref={media} src={src} autoPlay poster={src.replace(".mp4", ".jpg")} playsInline preload="auto" aria-label={title} onPointerDown={event => { touchInteraction.current = event.pointerType !== "mouse" }} onClick={() => { if (touchInteraction.current) revealControls(); else toggle() }} onCanPlay={startPlayback} onPlay={() => { started.current = true; setPlaying(true) }} onPause={() => setPlaying(false)} onTimeUpdate={event => setTime(event.currentTarget.currentTime)} onLoadedMetadata={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)} onEnded={onEnded}/>
      {!playing && <button className="peak-resume" type="button" onClick={toggle} aria-label="Play video">▶</button>}
    </div>
    <div className="peak-player-controls">
      <input className="peak-seek" type="range" min="0" max={duration || 1} step="0.1" value={time} aria-label="Seek video" onPointerDown={() => { seeking.current = true; revealControls() }} onPointerUp={() => { seeking.current = false; revealControls() }} onPointerCancel={() => { seeking.current = false; revealControls() }} onChange={event => { const value = Number(event.target.value); if (media.current) media.current.currentTime = value; setTime(value) }}/>
      <div className="peak-controls-row">
        <button type="button" onClick={toggle} aria-label={playing ? "Pause video" : "Play video"}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">{playing ? <path d="M5 3v10M11 3v10"/> : <path d="m5 3 8 5-8 5Z"/>}</svg></button>
        <span className="peak-playback-time">{clock(time)} <span>/ {clock(duration)}</span></span>
        <div className="peak-volume-control"><button type="button" onClick={() => changeVolume(volume ? 0 : .17)} aria-label={volume ? "Mute video" : "Unmute video"}><svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 6h3l4-3v10l-4-3H2Z"/>{volume ? <path d="M11 5q4 3 0 6"/> : <path d="m11 6 4 4m0-4-4 4"/>}</svg></button><input type="range" min="0" max="1" step="0.01" value={volume} aria-label="Video volume" onChange={event => changeVolume(Number(event.target.value))}/></div>
        <button type="button" aria-label="Fullscreen video" onClick={() => { const nativeFullscreen = () => (media.current as HTMLVideoElement & { webkitEnterFullscreen?: () => void })?.webkitEnterFullscreen?.(); if (document.fullscreenElement) void document.exitFullscreen(); else if (frame.current?.requestFullscreen) void frame.current.requestFullscreen().catch(nativeFullscreen); else nativeFullscreen() }}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 6V2h4m4 0h4v4m0 4v4h-4m-4 0H2v-4"/></svg></button>
      </div>
    </div>
  </div>
}

export function FavouriteVideos() {
  const [current, setCurrent] = useState(0)
  const id = useId()
  const [visible, setVisible] = useState(false)
  const [desktopTop, setDesktopTop] = useState(78)
  const launch = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (visible) dialog.current?.showModal()
    else if (dialog.current?.open) dialog.current.close()
  }, [visible])
  useEffect(() => {
    const soccer = document.querySelector<HTMLElement>(".soccer-game")
    if (!soccer) return
    const update = () => setDesktopTop(soccer.dataset.open === "true" ? soccer.getBoundingClientRect().bottom + 12 : 78)
    const size = new ResizeObserver(update)
    const attributes = new MutationObserver(update)
    size.observe(soccer)
    attributes.observe(soccer, { attributes: true, attributeFilter: ["data-open"] })
    window.addEventListener("resize", update)
    update()
    return () => { size.disconnect(); attributes.disconnect(); window.removeEventListener("resize", update) }
  }, [])
  const close = () => { setVisible(false); launch.current?.focus() }
  const video = videos[current]
  return <div className="peak-videos" style={{ "--peak-desktop-top": `${desktopTop}px` } as import("react").CSSProperties}>
    <button ref={launch} type="button" className="peak-launch" onClick={() => { setCurrent(Math.floor(Math.random() * videos.length)); setVisible(true) }} aria-haspopup="dialog"><svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><rect x="1.5" y="3.5" width="9" height="9" rx="1.5"/><path d="m10.5 6 4-2v8l-4-2Z"/></svg><span>Peak</span></button>
    <dialog ref={dialog} className="peak-dialog peak-player-dialog" aria-labelledby={`${id}-heading`} onCancel={close} onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close() } }}>
      <header><div className="peak-title"><h2 id={`${id}-heading`}>Peak<svg className="peak-header-mark" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><rect x="1.5" y="3.5" width="9" height="9" rx="1.5"/><path d="m10.5 6 4-2v8l-4-2Z"/></svg></h2><span>A few favourites</span></div><button type="button" onClick={close} aria-label="Close videos">×</button></header>
      <div className="peak-main-player">
        {visible && <PeakPlayer key={video.src} src={video.src} title={video.title} onEnded={() => setCurrent((current + 1) % videos.length)} />}
      </div>
      <div className="peak-playing-title"><span className="peak-playing-dot" aria-hidden="true"/><h3 className="peak-current-title">{video.title}</h3><span className="peak-title-count">{String(current + 1).padStart(2, "0")} / 03</span></div>
      <div className="peak-carousel-heading"><span>In the rotation</span><div><button type="button" onClick={() => setCurrent((current + videos.length - 1) % videos.length)} aria-label="Previous video">←</button><button type="button" onClick={() => setCurrent((current + 1) % videos.length)} aria-label="Next video">→</button></div></div>
      <ul className="peak-next-videos">{videos.map((next, index) => <li key={next.src}>
        <button type="button" onClick={() => setCurrent(index)} aria-current={index === current ? "true" : undefined} disabled={index === current} aria-label={`Play ${next.title}`}>
          <span className="peak-thumbnail" aria-hidden="true"><img src={next.src.replace(".mp4", ".jpg")} alt="" width="640" height="360" loading="eager" decoding="async"/><span className="peak-thumbnail-play"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="m6 3 7 5-7 5Z"/></svg></span></span>
          <span className="peak-next-title">{next.title}</span><span className="peak-filmstrip-indicator" aria-hidden="true"/>
        </button>
      </li>)}</ul>
    </dialog>
  </div>
}
