"use client"

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type KeyboardEvent, type CSSProperties } from "react"
import { CLUBS, ClubCrest, Football, StrikeScene } from "@/components/soccer-visuals"
import { useMobileGame } from "@/components/use-mobile-game"
import { chanceView, rotatePoint, strikeFrame } from "@/lib/kickabout-camera"
import { clamp, createMatch, distance, finishAction, prepareStrike, setAim, strike, strikePosition, strikeLimit, tickMatch, type Point, type Player, type Match } from "@/lib/kickabout-engine"

function PlayerMarker({ x, y, calling, id, kit, keeper = false, rotation = 0, scale = 1 }: Pick<Player, "x" | "y" | "calling" | "id"> & { kit: typeof CLUBS[number]; keeper?: boolean; rotation?: number; scale?: number }) {
  const shirt = keeper ? "#9aa975" : kit.shirt
  return <g transform={`translate(${x} ${y}) rotate(${-rotation}) scale(${scale})`}>
    <ellipse cy="12" rx="8" ry="3" fill="#344e4b24" />
    <path d="M-3 6l-1 5m7-5 2 5" stroke="#bda58e" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M-6-1l-3 5M6-1l3 5" stroke="#bea68f" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M-3-3-7-1l2 4 1-1v5h8V2l1 1 2-4-4-2Z" fill={shirt} stroke="#344e4b40" strokeWidth=".6" />
    {keeper ? <path d="M-4 0h8" stroke="#cedbb1" strokeWidth="2"/> : kit.crest === "barcelona" ? <><path d="M-3-2v8M1-2v8" stroke="#ad3857" strokeWidth="2"/><path d="M-2-3 0-1l2-2" stroke="#d9ba65" strokeWidth=".8" fill="none"/></> : <><path d="M-3-3 0-1l3-2" stroke={kit.crest === "madrid" ? "#b7a36d" : kit.crest === "spurs" ? "#1b3153" : "#fff"} strokeWidth="1.2" fill="none"/><path d="M-7-1-5 0m10 0 2-1" stroke={kit.crest === "madrid" ? "#b7a36d" : kit.crest === "spurs" ? "#1b3153" : "#fff"} strokeWidth="1.2"/></>}
    {!keeper && kit.crest==="arsenal" && <path d="M-5-2-7-1l2 4 1-1m9-4 2 1-2 4-1-1" fill="#fafafa" stroke="#fafafa" strokeWidth="1"/>}
    <path d="M-4 6h8v3H1L0 8l-1 1h-3Z" fill={keeper ? "#657550" : kit.shorts} />
    <circle cy="-6" r="3" fill="#bea68f" /><path d="M-3-7q3-4 6 0" stroke="#544b45" strokeWidth="2" fill="none" />
    <path d="M-6 12h3m6 0h4" stroke="#4b5661" strokeWidth="1.8" strokeLinecap="round" />
    <text y="4" textAnchor="middle" fontSize="4" fill={shirt === "#fafafa" || shirt === "#faf9f4" ? "#344e64" : "#fff"} fontFamily="monospace">{id}</text>
    {calling && <g><path d="M-15-29h30v12H4l-4 5v-5h-15Z" fill="#fff" stroke="#9eafbf" strokeWidth=".7" /><text y="-21" textAnchor="middle" fontSize="7" fill="#526b86" fontFamily="monospace">Here!</text></g>}
  </g>
}

function MatchReport({ match: m, home, away, replay, choose }: {match: Match; home: number; away: number; replay: () => void; choose: () => void}) {
  const heading = m.home > m.away ? "Full-time. A win." : m.home < m.away ? "Full-time. Next one." : "Full-time. All square."
  return <div className="soccer-result-card" role="dialog" aria-labelledby="soccer-result-heading" tabIndex={-1}>
    <p className="soccer-result-eyebrow">90 minutes played</p><h2 id="soccer-result-heading">{heading}</h2>
    <div className="soccer-final-score"><div><ClubCrest club={home} size={42}/><span>{CLUBS[home].name}</span></div><strong>{m.home}<span>–</span>{m.away}</strong><div><ClubCrest club={away} size={42}/><span>{CLUBS[away].name}</span></div></div>
    <div className="soccer-final-rating"><span>Match rating</span><strong>{m.rating.toFixed(1)}</strong></div>
    <dl className="soccer-final-stats">{[["Goals",m.goals],["Assists",m.assists],["Passes",m.passes],["Dribbles",m.dribbles]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <button type="button" className="soccer-kickoff" onClick={replay}>Play again</button><button type="button" className="soccer-change-teams" onClick={choose}>Change teams</button>
  </div>
}

export function SoccerGame() {
  const [homeClub, setHomeClub] = useState(0)
  const [awayClub, setAwayClub] = useState(1)
  const [open, setOpen] = useState(false)
  const [, render] = useState(0)
  const match = useRef(createMatch(1))
  const launchRef = useRef<HTMLButtonElement>(null)
  const feedRef = useRef<HTMLDivElement>(null)
  const [visibleRows,setVisibleRows] = useState(5)
  const pitchRef = useRef<SVGSVGElement>(null)
  const [frame, setFrame] = useState({width:300,height:380})
  const strikeRef = useRef<SVGSVGElement>(null)
  const worldRef = useRef<SVGGElement>(null)
  const dragging = useRef(false)
  const m = match.current
  const refresh = () => render(value => value + 1)
  const mobile = useMobileGame(open, "kickabout", () => setOpen(false))

  useEffect(() => {
    if (!open) return
    let frame = 0, previous = performance.now(), painted = 0
    const tick = (now: number) => {
      const delta = (now - previous) / 1000
      previous = now
      if (!document.hidden) {
        tickMatch(match.current, delta)
        if (now - painted > 32) { painted = now; render(value => value + 1) }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    pitchRef.current?.focus({ preventScroll: true })
    return () => cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    if (open && ["aim", "dribble", "strike"].includes(m.phase)) pitchRef.current?.focus({ preventScroll: true })
    if (open && m.phase === "fulltime") document.querySelector<HTMLElement>(".soccer-result-card")?.focus({preventScroll:true})
  }, [open, m.phase])

  function setup() { match.current = createMatch(Date.now()); match.current.phase = "setup"; setOpen(true); refresh() }
  function start() { match.current = createMatch(Date.now()); dragging.current = false; setOpen(true); refresh() }
  function close() { setOpen(false); dragging.current = false; requestAnimationFrame(() => launchRef.current?.focus()) }
  function point(event: PointerEvent<SVGSVGElement>): Point {
    const surface = m.phase === "strike" ? strikeRef.current : worldRef.current
    const matrix=surface?.getScreenCTM()
    if(!matrix)return {x:0,y:0}
    const mapped=new DOMPoint(event.clientX,event.clientY).matrixTransform(matrix.inverse())
    return {x:mapped.x,y:mapped.y}
  }
  function pointerDown(event: PointerEvent<SVGSVGElement>) {
    if (!event.isPrimary || event.button > 0) return
    if (m.paused || (m.celebration && m.elapsed<m.celebration.until)) return
    const p = point(event)
    if (m.phase === "strike") {
      const center = strikeFrame(strikePosition(m),frame)
      if (distance(center, p) <= center.radius) strike(m, { x: (p.x - center.x) / center.radius, y: (p.y - center.y) / center.radius })
      else finishAction(m, "Missed the ball.")
    } else if (m.phase === "dribble" || (m.phase === "aim" && distance(p, m.ball) < (event.pointerType === "touch" ? 65 : 25))) {
      dragging.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
      if (m.phase === "dribble") { m.carrying = true; m.dribbleTarget = {x:clamp(p.x,-180,480),y:clamp(p.y,m.gate.y-20,m.origin.y+40)} }
    }
    refresh()
  }
  function pointerMove(event: PointerEvent<SVGSVGElement>) {
    if (!event.isPrimary) return
    if (m.paused || (m.celebration && m.elapsed<m.celebration.until) || (!dragging.current && m.phase !== "dribble")) return
    const p = point(event)
    if (m.phase === "aim") setAim(m, p)
    else if (m.phase === "dribble") { m.carrying = true; m.dribbleTarget = { x: clamp(p.x, -180, 480), y: clamp(p.y, m.gate.y-20, m.origin.y+40) } }
    refresh()
  }
  function pointerUp(event: PointerEvent<SVGSVGElement>) {
    if (!dragging.current) return
    dragging.current = false; if (m.phase !== "dribble" || event.pointerType === "touch") m.carrying = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    if (m.phase === "aim" && !m.paused) prepareStrike(m)
    refresh()
  }
  function keyboard(event: KeyboardEvent<SVGSVGElement>) {
    if (event.key === "Escape") { close(); return }
    if (event.key.toLowerCase() === "p") { m.paused = !m.paused; refresh(); return }
    if (m.paused || (m.celebration && m.elapsed<m.celebration.until) || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter", " "].includes(event.key)) return
    event.preventDefault()
    const enter = event.key === "Enter" || event.key === " "
    const dx = event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : 0
    const dy = event.key === "ArrowUp" ? -1 : event.key === "ArrowDown" ? 1 : 0
    if (m.phase === "aim") {
      if (enter) prepareStrike(m)
      else { const direction=rotatePoint({x:dx,y:dy},-m.rotation); m.aim.x += direction.x * 6; m.aim.y += direction.y * 6; const scale = Math.min(1, 100 / Math.max(1, Math.hypot(m.aim.x, m.aim.y))); m.aim.x *= scale; m.aim.y *= scale }
    } else if (m.phase === "strike") {
      if (enter) strike(m, m.contact)
      else m.contact = { x: clamp(m.contact.x + dx * .15, -.7, .7), y: clamp(m.contact.y + dy * .15, -.7, .7) }
    } else if (m.phase === "dribble") { m.carrying = true; m.dribbleTarget = { x: clamp(m.ball.x + dx * 40, -180, 480), y: clamp(m.ball.y + dy * 40, m.gate.y-20, m.origin.y+40) } }
    refresh()
  }
  const sim = ["simulation", "halftime", "fulltime"].includes(m.phase)
  const hasGoal = (m.kind !== "pass" && m.kind !== "dribble") || (m.kind === "dribble" && m.layout === "corner-run")
  useLayoutEffect(()=>{
    const pitch=pitchRef.current
    if(!open||!pitch)return
    const measure=()=>{
      const {width,height}=pitch.getBoundingClientRect()
      if(width>0&&height>0)setFrame(previous=>Math.abs(previous.width-width)<1&&Math.abs(previous.height-height)<1?previous:{width:Math.round(width),height:Math.round(height)})
    }
    measure();const observer=new ResizeObserver(measure);observer.observe(pitch)
    return()=>observer.disconnect()
  },[open,sim])
  useLayoutEffect(()=>{
    const feed=feedRef.current
    if(!open||!feed)return
    const measure=()=>{
      const rowHeight=parseFloat(getComputedStyle(feed).getPropertyValue("--commentary-row"))||44
      setVisibleRows(Math.max(1,Math.floor((feed.clientHeight-2)/rowHeight)))
    }
    measure();const observer=new ResizeObserver(measure);observer.observe(feed)
    return()=>observer.disconnect()
  },[open,sim,mobile])
  const camera = chanceView(m,frame.width/frame.height)
  const spriteScale=Math.min(1.8,Math.max(1.2,14/(frame.width/Number(camera.split(" ")[2])*22)))
  const power=Math.min(1,Math.hypot(m.aim.x,m.aim.y)/100)
  const aimColor=`hsl(211 ${35+power*40}% ${76-power*43}%)`
  const contact = strikePosition(m)
  const lift = rotatePoint({x:0,y:-m.ball.z*.6},-m.rotation)
  const instructions = m.phase === "teammate" ? "Your teammate takes a touch…" : m.paused ? "Paused. Take your time." : m.phase === "aim" ? "Drag back from the ball. Release to pick your contact." : m.phase === "strike" ? m.incoming === "drop" ? "Meet the dropping ball. Tap the spot you want to head." : "Tap the moving ball. Lower contact chips; off-centre adds curl." : m.phase === "dribble" ? (mobile ? "Drag your finger to steer. Lift to stop. Reach the two markers." : "Move your mouse to steer. Find space between the defenders and reach the two markers.") : m.phase === "flight" ? (m.landing ? "The X marks where your chip will land." : "Watch the run…") : m.message
  const title = m.phase === "dribble" ? (m.layout.startsWith("touchline") ? "Touchline run" : m.layout === "corner-run" ? "Cut inside" : "Beat the press") : m.kind === "corner" ? "Corner kick" : m.kind === "free-kick" ? "Free kick" : m.kind === "header" ? "Meet the cross" : m.kind === "pass" ? (m.zone === "defence" ? "Playing out" : "Midfield") : m.difficulty === "crowded" ? "Crowded box" : "In the final third"
  return <aside className="soccer-game" data-game="kickabout" data-open={open} aria-label="Single-match football game">
    {mobile && open && <button className="game-backdrop" type="button" aria-label="Close Kickabout modal" tabIndex={-1} onClick={close}/> }
    {!open ? <button ref={launchRef} className="soccer-launch" type="button" onClick={setup}><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><circle cx="8" cy="8" r="6" /><path d="m8 5 3 2-1 3H6L5 7l3-2ZM8 2v3M2 7h3M4 13l2-3m4 0 2 3m-1-6h3" /></svg><span className="mobile-nav-category">Game</span><span className="kickabout-label">Kickabout</span><span className="kickabout-match-tag">Match</span></button> : <section className="soccer-panel soccer-match-panel" role={mobile ? "dialog" : undefined} aria-modal={mobile || undefined} aria-label="Kickabout" style={{"--home-color": CLUBS[homeClub].accent, "--away-color": CLUBS[awayClub].accent} as CSSProperties}>
      <header><span>Kickabout</span><button type="button" onClick={close} aria-label="Close football game">×</button></header>
      {m.phase === "setup" ? <div className="soccer-setup">
        <div className="soccer-matchup-preview"><ClubCrest club={homeClub} size={48}/><span>VS</span><ClubCrest club={awayClub} size={48}/></div>
        <div className="soccer-team-picker" role="group" aria-label="Your team"><span>Your team</span><div>{CLUBS.map((club,i) => <button type="button" key={club.name} aria-pressed={i === homeClub} onClick={() => {setHomeClub(i); if(i === awayClub)setAwayClub((i+1)%CLUBS.length)}}><ClubCrest club={i} size={28}/><span>{club.name}</span></button>)}</div></div>
        <div className="soccer-team-picker" role="group" aria-label="Opponent"><span>Opponent</span><div>{CLUBS.map((club,i) => <button type="button" key={club.name} disabled={i === homeClub} aria-pressed={i === awayClub} onClick={() => setAwayClub(i)}><ClubCrest club={i} size={28}/><span>{club.name}</span></button>)}</div></div>
        <button type="button" className="soccer-kickoff" onClick={start}><svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="m2 1 7 4-7 4Z" fill="currentColor"/></svg>Kick off</button>
      </div> : m.phase === "fulltime" ? <MatchReport match={m} home={homeClub} away={awayClub} replay={start} choose={setup}/> : <>
      <div className="soccer-scoreboard">
        <div className={`soccer-score-team ${["barcelona","arsenal"].includes(CLUBS[homeClub].crest) ? "is-dark" : "is-light"}`} style={{background: CLUBS[homeClub].score, borderColor:CLUBS[homeClub].accent}}><ClubCrest club={homeClub} size={19}/><span>{CLUBS[homeClub].name}</span><strong>{m.home}</strong></div>
        <span className="soccer-score-minute">{m.phase === "halftime" ? "HT" : `${Math.floor(m.minute)}′`}</span>
        <div className={`soccer-score-team ${["barcelona","arsenal"].includes(CLUBS[awayClub].crest) ? "is-dark" : "is-light"}`} style={{background: CLUBS[awayClub].score,borderColor:CLUBS[awayClub].accent}}><strong>{m.away}</strong><span>{CLUBS[awayClub].name}</span><ClubCrest club={awayClub} size={19}/></div>
      </div>
      <div className="soccer-player-stats"><span className="soccer-stat-label">Rating <strong className="soccer-rating">{m.rating.toFixed(1)}</strong></span><span className="soccer-stat-label">Goals <strong>{m.goals}</strong></span><span className="soccer-stat-label">Assists <strong>{m.assists}</strong></span></div>
      <div className="soccer-match-controls"><span>{m.phase === "halftime" ? "Half-time" : "Match controls"}</span><button type="button" onClick={() => {m.speed = m.speed === 1 ? 2 : m.speed === 2 ? 4 : 1;refresh()}} aria-label={`Change simulation speed, currently ${m.speed} times`}>Speed <strong>{m.speed}×</strong></button><button type="button" onClick={() => {m.paused=!m.paused;refresh()}}>{m.paused ? "▶ Resume" : "Ⅱ Pause"}</button></div>
      <div className="soccer-chance-label">{sim ? m.phase === "simulation" ? "Match in progress" : m.phase === "halftime" ? "A moment to recover" : "Match report" : title}{!sim && m.phase === "aim" && <span>{Math.ceil(m.pressure)}s</span>}</div>
      {sim ? <div ref={feedRef} className="soccer-match-feed" role="log" aria-label="Match commentary">
        <div className="soccer-feed-heading"><span>Match live</span><span>{Math.floor(m.minute)}′</span></div>
        {(m.log.length ? m.log.slice(0, visibleRows) : ["0′ Kick-off. We get things moving."]).map((line, i) => {
          const split = line.indexOf("′")
          const side = m.logTeams[i] ?? "neutral"
          const team = CLUBS[side === "away" ? awayClub : homeClub]
          const text = line.slice(split + 1).replaceAll("{home}", CLUBS[homeClub].name).replaceAll("{away}", CLUBS[awayClub].name).replace("The visitors", CLUBS[awayClub].name).replace("We score", `${CLUBS[homeClub].name} score`)
          const rowStyle = {"--event-color": side === "neutral" ? "#8091a5" : team.accent, "--event-bg": side === "neutral" ? "#eaf0f5" : team.score, "--event-ink": side === "neutral" ? "#61768e" : ["barcelona","arsenal"].includes(team.crest) ? "#fff" : "#243c59"} as CSSProperties
          return <div key={`${i}-${line}`} style={rowStyle} className="soccer-feed-row"><span>{line.slice(0, split + 1)}</span><p>{text}</p></div>
        })}
      </div> : <svg ref={pitchRef} className="soccer-pitch" viewBox={`0 0 ${frame.width} ${frame.height}`} tabIndex={0} role="application" aria-label="Football match. Arrow keys and Enter control actions. P pauses." aria-describedby="soccer-instructions" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerLeave={() => { if (m.phase === "dribble") m.carrying = false }} onPointerCancel={() => { dragging.current = false; m.carrying = false }} onKeyDown={keyboard}>
        <rect width={frame.width} height={frame.height} rx="3" fill={m.phase === "strike" ? "#b2cbdc" : "#d3e2d5"}/>
        {m.phase !== "strike" && <svg width={frame.width} height={frame.height} viewBox={camera} overflow="hidden">
        <g ref={worldRef} transform={`rotate(${m.rotation})`}>
        <defs><pattern id="soccer-net" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M8 0H0v8" fill="none" stroke="#bacbd7" strokeWidth=".7" /></pattern><pattern id="soccer-turf" width="110" height="160" patternUnits="userSpaceOnUse"><rect width="110" height="160" fill="#d7e5d8"/><rect width="110" height="80" fill="#ccdfce"/></pattern></defs>
        <rect x="-900" y="-900" width="2400" height="3000" fill="url(#soccer-turf)"/>
        <g fill="none" stroke="#f8fcf6" strokeWidth="2"><rect x="-190" y="45" width="680" height="1050"/><path d="M-190 570h680M-60 45v165h420V45M65 45v55h170V45M85 210q65 90 130 0M-60 1095V930h420v165"/><circle cx="150" cy="570" r="90"/><circle cx="150" cy="155" r="2" fill="#f8fcf6"/></g>
        {hasGoal && <g><rect x="98" y="21" width="104" height="24" fill="url(#soccer-net)" stroke="#9bafc4"/><path d="M98 46V21h104v25" fill="none" stroke="#718ca9" strokeWidth="2.5"/></g>}
        {<>
          {m.kind === "dribble" && <g><path d={`M${m.gate.left} ${m.gate.y}H${m.gate.right}`} stroke="#edf5ca" strokeWidth="3" strokeDasharray="5 4"/><circle cx={m.gate.left} cy={m.gate.y} r="3" fill="#edf5ca"/><circle cx={m.gate.right} cy={m.gate.y} r="3" fill="#edf5ca"/><text x={(m.gate.left+m.gate.right)/2} y={m.gate.y-9} textAnchor="middle" fill="#617960" fontSize="7" fontFamily="monospace">FINISH GATE</text></g>}
          {m.kind === "corner" && <g transform={`translate(${m.origin.x<150?-190:490} 45) scale(${m.origin.x<150?1:-1} 1)`}><path d="M0 20a20 20 0 0 0 20-20" fill="none" stroke="#fff" strokeWidth="2"/><path d="M-5 0v-25l18 5-18 7" fill="#c39859" stroke="#957952" strokeWidth="1.5"/></g>}
          {m.players.map(player => <PlayerMarker key={player.id} {...player} rotation={m.rotation} scale={spriteScale} kit={CLUBS[player.team === "home" ? homeClub : awayClub]} calling={player.team === "home" && m.phase === "aim" && (player.calling || Math.floor(m.elapsed*1.2+player.id)%5===0)} />)}
          {hasGoal && <PlayerMarker {...m.keeper} rotation={m.rotation} scale={spriteScale} id={1} kit={CLUBS[awayClub]} keeper />}
          {<g transform={`translate(${m.you.x} ${m.you.y}) rotate(${-m.rotation})`}><circle cy="14" r="6" fill={CLUBS[homeClub].shirt} stroke="#59718d"/><text y="29" textAnchor="middle" fill="#6e849b" fontSize="7" fontFamily="monospace">YOU</text></g>}
          {m.phase === "aim" && dragging.current && <><defs><marker id="kickabout-aim-tip" viewBox="0 0 14 14" refX="12" refY="7" markerUnits="userSpaceOnUse" markerWidth="21" markerHeight="21" orient="auto"><path d="M0 0 14 7 0 14 4 7Z" fill={aimColor}/></marker></defs><path d={`M${m.ball.x} ${m.ball.y}l${m.aim.x*1.4} ${m.aim.y*1.4}`} stroke={aimColor} strokeWidth={6+power*3} strokeLinecap="round" markerEnd="url(#kickabout-aim-tip)" fill="none"/><circle cx={m.ball.x} cy={m.ball.y} r="20" fill="none" stroke="#b6c7bb" strokeDasharray="2 4"/></>}
          {m.landing && m.ball.z > 1 && <g stroke="#8293a3" strokeWidth="1.2"><path d={`M${m.landing.x - 5} ${m.landing.y - 5}l10 10m0-10-10 10`} /><ellipse cx={m.landing.x} cy={m.landing.y} rx="10" ry="5" fill="none" opacity=".5" /></g>}
          <ellipse cx={m.ball.x} cy={m.ball.y} rx="6" ry="2" fill="#6b81952e" /><Football x={m.ball.x+lift.x} y={m.ball.y+lift.y} radius={9 + Math.min(2, m.ball.z / 40)} />
        </>}
        </g></svg>}
        {m.phase === "strike" && <svg ref={strikeRef} width={frame.width} height={frame.height} viewBox={`0 0 ${frame.width} ${frame.height}`}><StrikeScene frame={frame} club={homeClub} contact={contact} cursor={m.contact} header={m.incoming === "drop"} progress={1-m.phaseTime/strikeLimit(m)}/></svg>}

        {m.paused && <g><rect width={frame.width} height={frame.height} fill="#ffffffd9" /><text x={frame.width/2} y={frame.height/2} textAnchor="middle" fill="#6b819b" fontSize="14" fontFamily="monospace">Paused</text></g>}
      </svg>}
      {m.celebration && m.elapsed<m.celebration.until && <div key={`${m.celebration.until}`} className="soccer-celebration" style={{background:CLUBS[m.celebration.kind==="opponent"?awayClub:homeClub].score,color:["barcelona","arsenal"].includes(CLUBS[m.celebration.kind==="opponent"?awayClub:homeClub].crest)?"#fff":"#243c59",borderColor:CLUBS[m.celebration.kind==="opponent"?awayClub:homeClub].accent} as CSSProperties} role="status"><span className="soccer-scoring-club"><ClubCrest club={m.celebration.kind==="opponent"?awayClub:homeClub} size={22}/>{m.celebration.kind === "opponent" ? CLUBS[awayClub].name : CLUBS[homeClub].name}</span><strong>{m.celebration.kind === "assist" ? "ASSIST!" : "GOAL!"}</strong><span>{m.home} – {m.away}</span></div>}

      {!sim && <div id="soccer-instructions" className="soccer-instruction-panel" aria-live="polite">
        {m.phase === "aim" || m.phase === "strike" ? <><div className="soccer-action-steps"><span className={m.phase === "aim" ? "is-active" : ""}>1 · Aim</span><span className={m.phase === "strike" ? "is-active" : ""}>2 · Strike</span></div><strong>{m.phase === "aim" ? "Pull back from the ball, then release." : m.incoming === "drop" ? "Click the falling ball to head it." : "Click where your foot meets the ball."}</strong><p>{m.phase === "aim" ? "Pull farther for power. The arrow points where it goes." : "Centre: low drive · bottom: chip · sides: curl"}</p></> : <><strong>{m.phase === "dribble" ? "Guide the ball through the marked gate." : m.phase === "result" ? "The outcome" : "Watch the play"}</strong><p>{instructions}</p></>}
      </div>}



      </>}
    </section>}
  </aside>
}
