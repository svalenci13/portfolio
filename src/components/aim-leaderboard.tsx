"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
type Entry = { id: string; nickname: string; xHandle?: string; hits: number; accuracy: number }
type Result = { hits: number; accuracy: number }

export function AimLeaderboard({ result, onClose, onPlayAgain }: { result?: Result; onClose: () => void; onPlayAgain: () => void }) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [nickname, setNickname] = useState("")
  const [xHandle, setXHandle] = useState("")
  const [view, setView] = useState<"submit" | "board">(result ? "submit" : "board")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [submittedId, setSubmittedId] = useState("")
  const [local, setLocal] = useState(false)
  const [error, setError] = useState("")
  const nameRef = useRef<HTMLInputElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (view === "submit") nameRef.current?.focus()
    else headingRef.current?.focus()
  }, [view])
  useEffect(() => {
    const controller = new AbortController()
    try {
      setNickname(localStorage.getItem("warmup-nickname") || "")
      setXHandle(localStorage.getItem("warmup-x-handle") || "")
    } catch {}
    fetch("/api/leaderboard", { signal: controller.signal, cache: "no-store" }).then(async response => {
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setEntries(data.entries); setLocal(data.storage === "local")
    }).catch(error => { if (!controller.signal.aborted) setError(error.message) }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (saving || !result) return
    setSaving(true); setError("")
    try {
      const handle = xHandle.trim().replace(/^@/, "")
      const response = await fetch("/api/leaderboard", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nickname, xHandle: handle, ...result }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setEntries(data.entries); setLocal(data.storage === "local"); setSubmittedId(data.submittedId); setView("board")
      try { localStorage.setItem("warmup-nickname", nickname.trim()); localStorage.setItem("warmup-x-handle", handle) } catch {}
    } catch (error) { setError(error instanceof Error ? error.message : "Couldn’t save your score.") }
    finally { setSaving(false) }
  }

  return <div className="aim-result-panel" role="dialog" aria-labelledby="aim-result-title" onKeyDown={event => { if (event.key === "Escape" && !saving) onClose() }}>
    {view === "submit" && <div className="aim-result-topline"><span>Round complete</span></div>}
    <div className="aim-result-title-row"><h2 id="aim-result-title" ref={headingRef} tabIndex={-1}>{view === "submit" ? "Your score" : "Leaderboard"}</h2><button className="aim-panel-close" type="button" aria-label="Close leaderboard" onClick={onClose} disabled={saving}>×</button></div>
    {view === "submit" && result ? <>
      <div className="aim-final-score"><strong>{result.hits}</strong><span>hits<span>{result.accuracy}% accuracy</span></span></div>
      <form onSubmit={submit} className="aim-entry-form">
        <label htmlFor="aim-nickname">Name</label>
        <input ref={nameRef} id="aim-nickname" autoComplete="nickname" placeholder="What should we call you?" maxLength={16} required value={nickname} onChange={event => setNickname(event.target.value)} disabled={saving} />
        <label htmlFor="aim-x-handle">X / Twitter <span>optional</span></label>
        <div className="aim-handle-input"><span aria-hidden="true">@</span><input id="aim-x-handle" aria-label="X or Twitter username, optional" placeholder="username" maxLength={16} value={xHandle} onChange={event => setXHandle(event.target.value)} disabled={saving} autoCapitalize="none" spellCheck={false} /></div>
        {error && <p role="alert" className="aim-save-note">{error}</p>}
        <button className="aim-primary-action" type="submit" disabled={saving}>{saving ? "Submitting…" : "Post score"}<span aria-hidden="true">↗</span></button>
      </form>
      <button className="aim-skip" type="button" disabled={saving} onClick={() => { setError(""); setView("board") }}>Just show the leaderboard</button>
    </> : <>
      <div className="aim-board-caption"><span>Top 10 · ranked by hits</span>{local && <span>Local preview</span>}</div>
      {submittedId && <p className="aim-save-note" role="status">Score posted.</p>}
      {error && <p role="alert" className="aim-save-note">{error}</p>}
      {loading ? <p className="aim-board-empty">Loading…</p> : entries.length ? <div className="aim-board-scroll"><table><thead><tr><th scope="col">Player</th><th scope="col">Hits</th><th scope="col">Acc.</th></tr></thead><tbody>{entries.map((entry, index) => <tr key={entry.id} data-own={entry.id === submittedId}><td><span className="aim-rank">{String(index + 1).padStart(2, "0")}</span><div className="aim-player"><span title={entry.nickname}>{entry.nickname}</span>{entry.xHandle && <a href={`https://x.com/${encodeURIComponent(entry.xHandle)}`} target="_blank" rel="noreferrer">@{entry.xHandle}</a>}</div></td><td>{entry.hits}</td><td>{entry.accuracy}%</td></tr>)}</tbody></table></div> : !error && <p className="aim-board-empty">No scores yet.</p>}
      <button className="aim-primary-action" type="button" onClick={onPlayAgain}>{result ? "Play again" : "Try a round"}<span aria-hidden="true">↗</span></button>
    </>}
  </div>
}
