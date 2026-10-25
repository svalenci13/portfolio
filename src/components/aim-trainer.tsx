"use client"

import { useEffect, useRef, useState } from "react"
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
  const [status, setStatus] = useState<"idle" | "running" | "finished">("idle")
  const [remaining, setRemaining] = useState(60)
  const deadline = useRef(0)

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
      {status === "running" && [1].map(side => <div key={side} className={`aim-lane aim-lane-${side}`} onClick={event => {
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
      <div className="aim-hud">
        {status === "idle" ? <button className="aim-play" type="button" onClick={start} aria-label="Warm up: start a 60-second aim challenge"><span className="aim-play-icon" aria-hidden="true" /><span className="aim-play-label">Warm up</span><span className="aim-play-time">60s</span></button> : <div className={`aim-session${status === "finished" ? " aim-session-results" : ""}`}>
          <div className="aim-session-heading"><span>{status === "finished" ? "Session complete" : "Session"}</span><span className="aim-session-dot" data-finished={status === "finished"} /></div>
          <div className="aim-clock" role="timer" aria-label="Time remaining">{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}</div>
          <div className="aim-time-track" aria-hidden="true"><div style={{ transform: `scaleX(${remaining / 60})` }} /></div>
          <dl className="aim-session-stats">
            <div><dt>Hits</dt><dd>{hits}</dd></div>
            <div><dt>Accuracy</dt><dd>{hits + misses ? `${Math.round(hits / (hits + misses) * 100)}%` : "—"}</dd></div>
            {status === "finished" && <div><dt>Hits / sec</dt><dd>{(hits / 60).toFixed(2)}</dd></div>}
          </dl>
          {status === "finished" && <AimLeaderboard hits={hits} accuracy={hits + misses ? Math.round(hits / (hits + misses) * 100) : 0} />}
          <div className="aim-actions">
            {status === "finished" && <button type="button" onClick={start}>Play again</button>}
            <button type="button" onClick={() => setStatus("idle")}>{status === "running" ? "Exit" : "Close"}</button>
          </div>
        </div>}
      </div>
    </aside>
  )
}

