"use client"

import { useEffect, useState, type FormEvent } from "react"
type Entry = { id: string; nickname: string; hits: number; accuracy: number }

export function AimLeaderboard({ hits, accuracy }: { hits: number; accuracy: number }) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [nickname, setNickname] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [local, setLocal] = useState(false)
  const [error, setError] = useState("")
  useEffect(() => {
    const controller = new AbortController()
    try { setNickname(localStorage.getItem("warmup-nickname") || "") } catch {}
    fetch("/api/leaderboard", { signal: controller.signal, cache: "no-store" }).then(async response => {
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setEntries(data.entries); setLocal(data.storage === "local")
    }).catch(error => { if (!controller.signal.aborted) setError(error.message) }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (saving || saved) return
    setSaving(true); setError("")
    try {
      const response = await fetch("/api/leaderboard", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nickname, hits, accuracy }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setEntries(data.entries); setLocal(data.storage === "local"); setSaved(true)
      try { localStorage.setItem("warmup-nickname", nickname.trim()) } catch {}
    } catch (error) { setError(error instanceof Error ? error.message : "Couldn’t save your score.") }
    finally { setSaving(false) }
  }
  return <div className="aim-leaderboard">
    {saved ? <p className="aim-save-note" role="status">Score submitted.</p> : <form onSubmit={submit} className="aim-score-form">
      <label htmlFor="aim-nickname">Post your score</label>
      <div><input id="aim-nickname" aria-label="Leaderboard nickname" placeholder="Nickname" maxLength={16} required value={nickname} onChange={event => setNickname(event.target.value)} disabled={saving} /><button type="submit" disabled={saving}>{saving ? "…" : "Save"}</button></div>
    </form>}
    <div className="aim-board-heading"><span>Top 10</span>{local && <span>Local preview</span>}</div>
    {error && <p role="alert" className="aim-save-note">{error}</p>}
    {loading ? <p>Loading…</p> : entries.length ? <div className="aim-board-scroll"><table><thead><tr><th scope="col">Name</th><th scope="col">Hits</th><th scope="col">Acc.</th></tr></thead><tbody>{entries.map((entry, index) => <tr key={entry.id}><td title={entry.nickname}><span className="aim-rank">{index + 1}</span>{entry.nickname}</td><td>{entry.hits}</td><td>{entry.accuracy}%</td></tr>)}</tbody></table></div> : !error && <p>No scores yet.</p>}
  </div>
}

