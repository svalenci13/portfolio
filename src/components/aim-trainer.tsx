"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AimLeaderboard } from "@/components/aim-leaderboard"

type Target = { id: number; side: number; x: number; y: number; revision: number }
const initialTargets: Target[] = [
  { id: 3, side: 1, x: 65, y: 28, revision: 0 },
  { id: 4, side: 1, x: 25, y: 56, revision: 0 },
  { id: 5, side: 1, x: 60, y: 80, revision: 0 },
]

export function AimTrainer() {
  const [targets, setTargets] = useState(initialTargets)
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [status, setStatus] = useState<"idle" | "running" | "finished" | "board">("idle")
  const [remaining, setRemaining] = useState(60)
  const [muted, setMuted] = useState(false)
  const sound = useRef<{ context: AudioContext; buffer?: AudioBuffer; loading?: Promise<void> } | null>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const laneRef = useRef<HTMLDivElement>(null)
  const hudRef = useRef<HTMLDivElement>(null)
  const deadline = useRef(0)
  function closePanel() { setStatus("idle"); requestAnimationFrame(() => launcherRef.current?.focus()) }

  function prepareSound() {
    if (typeof AudioContext === "undefined") return
    if (!sound.current) sound.current = { context: new AudioContext() }
    const audio = sound.current
    void audio.context.resume().catch(() => {})
    if (!audio.buffer && !audio.loading) {
      audio.loading = fetch("/sounds/porphyr-hit.ogg")
        .then(response => { if (!response.ok) throw new Error("Sound unavailable"); return response.arrayBuffer() })
        .then(bytes => audio.context.decodeAudioData(bytes))
        .then(buffer => { audio.buffer = buffer })
        .catch(() => {})
        .finally(() => { audio.loading = undefined })
    }
  }

  useEffect(() => () => {
    const audio = sound.current
    sound.current = null
    if (audio) void audio.context.close().catch(() => {})
  }, [])

  useLayoutEffect(() => {
    if (status !== "running" || !hudRef.current || !laneRef.current) return
    const fitLane = () => {
      const hud = hudRef.current?.getBoundingClientRect()
      if (hud && laneRef.current) laneRef.current.style.top = `${hud.bottom + 24}px`
    }
    fitLane()
    const observer = new ResizeObserver(fitLane)
    observer.observe(hudRef.current)
    window.addEventListener("resize", fitLane)
    return () => { observer.disconnect(); window.removeEventListener("resize", fitLane) }
  }, [status])

  useEffect(() => {
    if (status !== "running") return
    const tick = () => {
      const seconds = Math.max(0, Math.ceil((deadline.current - performance.now()) / 1000))
      setRemaining(seconds)
      if (seconds === 0) setStatus("finished")
    }
    const timer = window.setInterval(tick, 100)
    const desktop = window.matchMedia("(min-width: 1100px) and (hover: hover) and (pointer: fine)")
    const resize = () => { if (!desktop.matches) setStatus("idle") }
    desktop.addEventListener("change", resize)
    return () => { window.clearInterval(timer); desktop.removeEventListener("change", resize) }
  }, [status])

  function start() {
    prepareSound()
    setTargets(initialTargets)
    setHits(0)
    setMisses(0)
    setRemaining(60)
    deadline.current = performance.now() + 60_000
    setStatus("running")
  }

  function active() {
    if (status !== "running") return false
    if (performance.now() >= deadline.current) {
      setRemaining(0)
      setStatus("finished")
      return false
    }
    return true
  }

  function hit(target: Target) {
    if (!active()) return
    const audio = sound.current
    if (!muted && audio?.buffer && audio.context.state === "running") {
      const source = audio.context.createBufferSource()
      const gain = audio.context.createGain()
      source.buffer = audio.buffer
      gain.gain.value = .12
      source.connect(gain).connect(audio.context.destination)
      source.onended = () => { source.disconnect(); gain.disconnect() }
      source.start()
    }
    setHits(value => value + 1)
    setTargets(current => {
      let x = target.x, y = target.y
      for (let attempt = 0; attempt < 40; attempt++) {
        const nextX = 15 + Math.random() * 70
        const nextY = 12 + Math.random() * 74
        const clear = current.every(other => other.side !== target.side || other.id === target.id || Math.hypot((other.x - nextX) * .6, other.y - nextY) > 19)
        if (clear && Math.hypot((target.x - nextX) * .6, target.y - nextY) > 20) {
          x = nextX; y = nextY; break
        }
      }
      return current.map(other => other.id === target.id ? { ...other, x, y, revision: other.revision + 1 } : other)
    })
  }

  return (
    <aside className="aim-trainer" aria-label="Side aim trainer">
      {status === "running" && [1].map(side => <div ref={laneRef} key={side} className={`aim-lane aim-lane-${side}`} onClick={event => {
        if (event.target === event.currentTarget && active()) setMisses(value => value + 1)
      }}>
        {targets.filter(target => target.side === side).map(target => <button
          key={`${target.id}-${target.revision}`}
          type="button"
          className="aim-target"
          style={{ left: `${target.x}%`, top: `${target.y}%` }}
          aria-label={`Hit target ${target.id + 1}`}
          onClick={() => hit(target)}
        />)}
      </div>)}
      {(status === "idle" || status === "running") && <div ref={hudRef} className="aim-hud">
        {status === "idle" ? <div className="aim-launcher">
          <button ref={launcherRef} className="aim-play" type="button" onClick={start} aria-label="Warm up: start a 60-second aim challenge"><span className="aim-play-icon" aria-hidden="true" /><span className="aim-play-label">Warm up</span><span className="aim-play-time">60s</span></button>
          <button className="aim-leaderboard-link" type="button" onClick={() => setStatus("board")}><span className="aim-leaderboard-label"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M2 14V8h4v6M6 14V3h4v11M10 14V10h4v4M1 14h14" /></svg>Leaderboard</span><span aria-hidden="true">↗</span></button>
        </div> : <div className="aim-session">
          <div className="aim-session-heading"><span>Session</span><button className="aim-sound-toggle" type="button" aria-label={muted ? "Unmute hit sound" : "Mute hit sound"} aria-pressed={muted} onClick={() => { if (muted) prepareSound(); setMuted(value => !value) }}><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 6h3l4-3v10l-4-3H2V6Z" />{muted ? <path d="m11 6 3 4m0-4-3 4" /> : <path d="M11 5c2 1.5 2 4.5 0 6" />}</svg></button></div>
          <div className="aim-clock" role="timer" aria-label="Time remaining">{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}</div>
          <div className="aim-time-track" aria-hidden="true"><div style={{ transform: `scaleX(${remaining / 60})` }} /></div>
          <dl className="aim-session-stats"><div><dt>Hits</dt><dd>{hits}</dd></div><div><dt>Accuracy</dt><dd>{hits + misses ? `${Math.round(hits / (hits + misses) * 100)}%` : "—"}</dd></div></dl>
          <div className="aim-actions"><button type="button" onClick={closePanel}>Exit</button></div>
        </div>}
      </div>}
      {(status === "finished" || status === "board") && <div className="aim-result-position">
        <AimLeaderboard result={status === "finished" ? { hits, accuracy: hits + misses ? Math.round(hits / (hits + misses) * 100) : 0 } : undefined} onClose={closePanel} onPlayAgain={start} />
      </div>}
    </aside>
  )
}
