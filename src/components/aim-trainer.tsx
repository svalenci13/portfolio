"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useMobileGame } from "@/components/use-mobile-game"
import { AimLeaderboard } from "@/components/aim-leaderboard"

const ROUND_SECONDS = 15

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
  const [remaining, setRemaining] = useState(ROUND_SECONDS)
  const [muted, setMuted] = useState(false)
  const sound = useRef<{ context: AudioContext; buffer?: AudioBuffer; loading?: Promise<void> } | null>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const laneRef = useRef<HTMLDivElement>(null)
  const hudRef = useRef<HTMLDivElement>(null)
  const deadline = useRef(0)
  const mobile = useMobileGame(status !== "idle", "warmup", () => setStatus("idle"))
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
    return () => window.clearInterval(timer)
  }, [status])

  function start() {
    prepareSound()
    setTargets(initialTargets)
    setHits(0)
    setMisses(0)
    setRemaining(ROUND_SECONDS)
    deadline.current = performance.now() + ROUND_SECONDS * 1000
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
      const lane=laneRef.current?.getBoundingClientRect()
      const separation=(a: {x:number;y:number},b: {x:number;y:number})=>mobile&&lane ? Math.hypot((a.x-b.x)*lane.width/100,(a.y-b.y)*lane.height/100) : Math.hypot((a.x-b.x)*.6,a.y-b.y)
      const gap=mobile?58:19
      for (let attempt = 0; attempt < 40; attempt++) {
        const nextX = 15 + Math.random() * 70
        const nextY = 12 + Math.random() * 74
        const clear = current.every(other => other.side !== target.side || other.id === target.id || separation(other,{x:nextX,y:nextY}) > gap)
        if (clear && separation(target,{x:nextX,y:nextY}) > gap) {
          x = nextX; y = nextY; break
        }
      }
      return current.map(other => other.id === target.id ? { ...other, x, y, revision: other.revision + 1 } : other)
    })
  }

  return (
    <>
    <aside className="aim-trainer" data-game="warmup" data-open={status !== "idle"} data-status={status} aria-label="Aim game">
      {mobile && status !== "idle" && <button className="game-backdrop" type="button" aria-label="Close aim game modal" tabIndex={-1} onClick={closePanel}/> }
      <div className="aim-game-surface" data-running={status === "running"}>
      {status === "running" && [1].map(side => <div ref={laneRef} key={side} className={`aim-lane aim-lane-${side}`} onPointerDown={event => {
        if (event.target === event.currentTarget && active()) setMisses(value => value + 1)
      }}>
        {targets.filter(target => target.side === side).map(target => <button
          key={`${target.id}-${target.revision}`}
          type="button"
          className="aim-target"
          style={{ left: `${target.x}%`, top: `${target.y}%` }}
          aria-label={`Hit target ${target.id + 1}`}
          onPointerDown={event => { event.preventDefault(); event.stopPropagation(); hit(target) }}
          onClick={event => { if (event.detail === 0) hit(target) }}
        />)}
      </div>)}
      {(status === "idle" || status === "running") && <div ref={hudRef} className="aim-hud">
        {status === "idle" ? <div className="aim-launcher">
          <button ref={launcherRef} className="aim-play" type="button" onClick={start} aria-label="Aim game: start a 15-second challenge"><span className="aim-play-icon" aria-hidden="true" /><span className="mobile-nav-category">Game<span className="aim-category-duration"> · 15s</span></span><span className="aim-play-label"><span className="aim-label-desktop">Aim game</span><span className="aim-label-mobile">Aim</span></span><span className="aim-play-time">15s</span></button>
          <button className="aim-leaderboard-link" aria-label="View aim game leaderboard" title="Aim game leaderboard" type="button" onClick={() => setStatus("board")}><span className="aim-leaderboard-label"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M2 14V8h4v6M6 14V3h4v11M10 14V10h4v4M1 14h14" /></svg>Leaderboard</span><span aria-hidden="true">↗</span></button>
        </div> : <div className="aim-session">
          <div className="aim-session-heading"><span>Aim game</span><div className="aim-session-tools"><button className="aim-session-close" type="button" onClick={closePanel} aria-label="Close aim game">×</button></div></div>
          <div className="aim-clock" role="timer" aria-label="Time remaining">{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}</div>
          <div className="aim-time-track" aria-hidden="true"><div style={{ transform: `scaleX(${remaining / ROUND_SECONDS})` }} /></div>
          <dl className="aim-session-stats"><div><dt>Hits</dt><dd>{hits}</dd></div><div><dt>Accuracy</dt><dd>{hits + misses ? `${Math.round(hits / (hits + misses) * 100)}%` : "—"}</dd></div></dl>
        </div>}
      </div>}
      {(status === "finished" || status === "board") && <div className="aim-result-position">
        <AimLeaderboard result={status === "finished" ? { hits, accuracy: hits + misses ? Math.round(hits / (hits + misses) * 100) : 0 } : undefined} onClose={closePanel} onPlayAgain={start} />
      </div>}
      </div>
    </aside>
    {status !== "idle" && <aside className="aim-trainer aim-persistent-nav" data-status="idle"><div className="aim-hud"><div className="aim-launcher">
          <button className="aim-play" type="button" onClick={start} aria-label="Aim game: start a 15-second challenge"><span className="aim-play-icon" aria-hidden="true" /><span className="mobile-nav-category">Game<span className="aim-category-duration"> · 15s</span></span><span className="aim-play-label"><span className="aim-label-desktop">Aim game</span><span className="aim-label-mobile">Aim</span></span><span className="aim-play-time">15s</span></button>
          <button className="aim-leaderboard-link" aria-label="View aim game leaderboard" title="Aim game leaderboard" type="button" onClick={() => setStatus("board")}><span className="aim-leaderboard-label"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M2 14V8h4v6M6 14V3h4v11M10 14V10h4v4M1 14h14" /></svg>Leaderboard</span><span aria-hidden="true">↗</span></button>
        </div></div></aside>}
    </>
  )
}
