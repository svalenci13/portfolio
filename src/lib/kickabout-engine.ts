export type Point = { x: number; y: number }
export type Phase = "setup" | "simulation" | "teammate" | "aim" | "strike" | "flight" | "dribble" | "result" | "halftime" | "fulltime"
export type ChanceKind = "pass" | "shot" | "dribble" | "corner" | "header" | "free-kick"
export type Layout = "central" | "left-channel" | "right-channel" | "touchline-left" | "touchline-right" | "corner-run" | "short-corner" | "inswinger" | "deep-cross" | "slalom"
export type Incoming = "still" | "left" | "right" | "drop" | "rise" | "bounce-in" | "bounce-left" | "bounce-right" | "centre-left" | "centre-right"
export type Player = Point & { id: number; team: "home" | "away"; calling?: boolean; pace?: number; anchor?: Point; anticipation?: number; run: number }
export type Ball = Point & { z: number; vx: number; vy: number; vz: number; bounces?: number }
export type Match = {
  phase: Phase; minute: number; speed: number; paused: boolean;
  home: number; away: number; goals: number; assists: number; passes: number; dribbles: number;
  elapsed: number; phaseTime: number; message: string; log: string[]; logTeams: ("home" | "away" | "neutral")[]; seed: number; rating: number; zone: "defence" | "midfield" | "attack"; difficulty: "open" | "crowded" | "wall";
  viewPoints: Point[]; deck: ChanceKind[]; layout: Layout; gate: {left: number; right: number; y: number}; bounds: {left: number; right: number}; counterThreat: number; nextChance: number; halfPlayed: boolean; kind: ChanceKind; incoming: Incoming; incomingDuration: number; bounceHeight: number; rotation: number; celebration: {kind: "goal" | "assist" | "opponent"; until: number} | null;
  players: Player[]; keeper: Point; keeperReaction: number; grace: number; ball: Ball; you: Point; origin: Point; aim: Point; contact: Point;
  dribbleTarget: Point; carrying: boolean; curve: number; landing: Point | null;
  pending: "shot" | "header" | null; pressure: number; attempt: number; wind: number; assistShot: boolean;
}
export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))
export const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)
function chanceDeck(seed: number): ChanceKind[] {
  const deck: ChanceKind[] = ["shot", "free-kick", "header", "pass", "dribble", "corner", "shot", "free-kick", "shot"]
  for (let i = deck.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    const j = seed % (i + 1); [deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return ["pass", "corner", "dribble", ...deck]
}
const schedule = [5, 12, 20, 28, 36, 43, 51, 59, 67, 75, 83, 88]
const blankBall = (x = 150, y = 290): Ball => ({ x, y, z: 0, vx: 0, vy: 0, vz: 0 })
const random = (m: Match) => { m.seed = (Math.imul(m.seed, 1664525) + 1013904223) >>> 0; return m.seed / 4294967296 }
const commentaryKey=(text:string)=>text.toLowerCase().replace(/\{home\}|\{away\}/g,"team").replace(/[^a-z ]/g,"").trim()
const note = (m: Match, text: string, side: "home" | "away" | "neutral" = "home") => {
  if(m.log.length && commentaryKey(text)===commentaryKey(m.message) && !/Goal!|score/.test(text))return
  m.logTeams = [side, ...m.logTeams].slice(0, 40)
  m.message = text; m.log = [`${Math.floor(m.minute)}′ ${text}`, ...m.log].slice(0, 40)
}
const changePhase = (m: Match, phase: Phase) => { m.phase = phase; m.phaseTime = 0 }
function move(player: Point, target: Point, amount: number) {
  const length = distance(player, target)
  if (length > 0) { player.x += (target.x - player.x) / length * Math.min(amount, length); player.y += (target.y - player.y) / length * Math.min(amount, length) }
}
export function createMatch(seed = Date.now()): Match {
  return {
    phase: "simulation", minute: 0, speed: 1, paused: false,
    home: 0, away: 0, goals: 0, assists: 0, passes: 0, dribbles: 0, elapsed: 0, phaseTime: 0,
    message: "Kick-off.", log: [], logTeams: [], rating: 6.5, zone: "midfield", difficulty: "open", seed: seed >>> 0, viewPoints: [], deck: chanceDeck(seed), layout: "central", gate: {left: 20, right: 280, y: 65}, bounds: {left: 16, right: 284}, counterThreat: 0, nextChance: 0, halfPlayed: false,
    kind: "pass", incoming: "still", incomingDuration: 3, bounceHeight: 55, rotation: 0, celebration: null, players: [], keeper: { x: 150, y: 66 }, keeperReaction: .28, grace: 1.5, ball: blankBall(),
    you: { x: 150, y: 290 }, origin: { x: 150, y: 290 }, aim: { x: 0, y: -75 }, contact: { x: 0, y: 0 },
    dribbleTarget: { x: 150, y: 290 }, carrying: false, curve: 0, landing: null, pending: null,
    pressure: 0, attempt: 0, wind: 0, assistShot: false,
  }
}
export function beginChance(m: Match, kind?: ChanceKind, incoming?: Incoming) {
  m.kind = kind ?? m.deck[m.nextChance % m.deck.length]
  const pick = <T,>(items: T[]): T => items[Math.floor(random(m) * items.length)]
  m.layout = m.kind === "corner" ? pick<Layout>(["short-corner", "inswinger", "deep-cross"])
    : m.kind === "dribble" ? pick<Layout>(["central", "touchline-left", "touchline-right", "corner-run", "slalom"])
    : pick<Layout>(["central", "left-channel", "right-channel"])
  m.incoming = incoming ?? (m.kind === "header" ? "drop" : pick<Incoming>(["left", "right", "bounce-left", "bounce-right", "centre-left", "centre-right", "bounce-in", "still"]))
  m.rotation = 0
  m.incomingDuration = m.incoming === "drop" ? 3.3 : m.incoming === "still" ? 5.8 : 2.5 + random(m)*.65
  m.bounceHeight = 38 + random(m)*38
  m.zone = m.kind === "pass" ? (m.deck.slice(0,m.nextChance).filter(kind=>kind==="pass").length % 2 === 0 ? "midfield" : "defence") : "attack"
  m.difficulty = m.kind === "free-kick" ? "wall" : m.kind === "shot" && (m.nextChance % 3 === 2 || random(m) > .45) ? "crowded" : "open"
  m.nextChance++; m.attempt = 0; m.pending = null; m.assistShot = false; m.counterThreat = 0
  m.bounds = {left: -180, right: 480}; m.gate = {left: 75, right: 225, y: 65}
  let x = m.layout === "left-channel" ? 55 + random(m) * 30 : m.layout === "right-channel" ? 215 + random(m) * 30 : 110 + random(m) * 80
  let y = m.kind === "pass" ? 290 : m.kind === "header" ? 170 + random(m)*55 : 220 + random(m)*55
  if (m.kind === "free-kick") {x=-55+random(m)*410;y=190+random(m)*165}
  if (m.kind === "corner") { x = random(m) > .5 ? -182 : 482; y = 53; m.rotation=x<150?270:90; m.incoming = "still"; m.incomingDuration=5.8 }
  if (m.kind === "dribble") {
    y = 300+random(m)*50; m.bounds={left:0,right:300}
    if (m.layout === "touchline-left") {x=-115; m.bounds={left:-182,right:-30}; m.gate={left:-160,right:-85,y:80}}
    else if (m.layout === "touchline-right") {x=415; m.bounds={left:330,right:482}; m.gate={left:385,right:460,y:80}}
    else if (m.layout === "corner-run") {x=random(m)>.5?270:30; y=300+random(m)*35; m.gate={left:90,right:200,y:105}}
    else if(m.layout==="slalom"){const side=random(m)>.5;x=side?245:55;m.bounds={left:-20,right:320};m.gate={left:side?25:165,right:side?135:275,y:65}}
    m.zone = m.layout === "corner-run" ? "attack" : "midfield"
  }
  m.ball = blankBall(x,y); m.origin = {x,y}; m.dribbleTarget = {x,y}; m.carrying = false
  m.aim = m.kind === "corner" ? {x:(150-x)*.55,y:35} : {x:0,y:-65}
  m.contact = {x:0,y:0}; m.landing = null
  m.keeper = {x:clamp(150+(x-150)*.18+(random(m)-.5)*28,120,180),y:66}
  m.keeperReaction = .24+random(m)*.16; m.grace = m.kind === "header" ? 2 : m.kind === "dribble" ? .25 : 1.5
  m.wind = 0
  const home = (id:number, px:number, py:number, calling=false): Player => ({id,team:"home",x:clamp(px,-160,460),y:clamp(py,85,850),calling,run:id%2?1:-1})
  const away = (id:number, px:number, py:number): Player => ({id,team:"away",x:clamp(px,-170,470),y:clamp(py,65,850),pace:.7+random(m)*.6,anticipation:random(m)<.35?6+random(m)*8:0,run:0})
  if (m.kind === "dribble") {
    const width = m.bounds.right-m.bounds.left
    const count=m.layout.startsWith("touchline")?2+Math.floor(random(m)*2):m.layout==="central"?4+Math.floor(random(m)*3):3+Math.floor(random(m)*2)
    m.players=Array.from({length:count},(_,i)=>away(i+4,m.bounds.left+width*(i%2?.73:.27)+(random(m)-.5)*25,245-i*(count>4?35:48)+(random(m)-.5)*16))
  } else if (m.kind === "corner") {
    const near = x < 150 ? 1 : -1
    m.players = m.layout === "short-corner"
      ? [home(1,x+near*90,115,true),home(2,150,150),home(3,210,100),away(4,95,150),away(5,205,180),away(6,150,105)]
      : [home(1,85+random(m)*40,110+random(m)*40,true),home(2,190+random(m)*40,95+random(m)*55,true),home(3,150,m.layout === "deep-cross" ? 205 : 165),away(4,120,165),away(5,205,175),away(6,150,95),away(7,65,180)]
  } else if (m.kind === "free-kick") {
    const dx=150-x,dy=45-y,len=Math.hypot(dx,dy),wallDistance=85+random(m)*25
    const wallX=x+dx/len*wallDistance,wallY=y+dy/len*wallDistance
    const count=2+Math.floor(random(m)*4)
    m.players=Array.from({length:1+Math.floor(random(m)*3)},(_,i)=>home(i+1,i%2?230:70,115+i*38,true))
    m.players.push(...Array.from({length:count},(_,i)=>away(i+4,wallX+(i-(count-1)/2)*17*(-dy/len),wallY+(i-(count-1)/2)*17*(dx/len))))
    m.players.push(away(10,x<150?235:65,100))
    m.incoming="still";m.incomingDuration=5.8
  } else if (m.kind === "pass") {
    const side=m.layout==="right-channel"?-1:1
    const shift=m.zone==="defence"?430:230
    m.ball.y+=shift;m.origin.y+=shift;m.dribbleTarget.y+=shift;y+=shift
    m.players=[home(1,x-side*(85+random(m)*60),y-30-random(m)*80,true),home(2,x+side*(100+random(m)*70),y-100-random(m)*35,true),home(3,x+side*90,y+55),away(4,x-155,y-165),away(5,x+155,y-160),away(6,x-side*110,y+20)]
  } else {
    m.players = [home(1,x<150?x+80:x-80,y-95,true),home(2,150,y-130,true),home(3,x<150?65:235,y-55),away(4,35,95),away(5,265,110),away(6,x<150?x+90:x-90,y+25)]
    if(m.difficulty==="crowded") m.players=[m.players[0],away(4,95,110),away(5,175,120),away(6,225,95),away(7,155,y-100),away(8,x<150?x+85:x-85,y-25)]
  }
  if(m.kind==="dribble" && m.layout!=="corner-run"){
    const offset=340+random(m)*120
    m.ball.y+=offset;m.origin.y+=offset;m.dribbleTarget.y+=offset;m.gate.y+=offset;y+=offset
    for(const player of m.players)player.y+=offset
  }
  if(m.kind==="dribble"){
    // Stagger the screen along the run rather than lining both flanks.
    const cap=m.layout==="corner-run"?9:10
    const extra=Math.min(cap-m.players.length,m.layout.startsWith("touchline")?2:3+Math.floor(random(m)*2))
    const width=m.bounds.right-m.bounds.left
    for(let i=0;i<extra;i++){
      const fraction=(i+1)/(extra+1)
      const px=m.bounds.left+width*(i%2?.78:.22)+(random(m)-.5)*width*.08
      const py=m.gate.y+30+fraction*(m.origin.y-m.gate.y-110)
      const p=away(20+i,px,py);p.anchor={x:p.x,y:p.y};p.pace=.85+random(m)*.2;m.players.push(p)
    }
    m.players=m.players.slice(0,cap)
  }
  // Preserve a genuine reaction window, including for headers and tight layouts.
  for(const p of m.players) if(p.team==="away" && distance(p,m.ball)<85){
    const dx=p.x-x,dy=p.y-y,len=Math.max(1,Math.hypot(dx,dy))
    p.x=clamp(x+dx/len*90,m.bounds.left+8,m.bounds.right-8);p.y=clamp(y+dy/len*90,55,1000)
    if(distance(p,m.ball)<80)p.y=clamp(y-92,55,1000)
  }
  m.you={x:m.ball.x,y:m.ball.y}
  m.viewPoints=[{...m.origin},...m.players.map(p=>({x:p.x,y:p.y}))]
  if(m.kind!=="pass" && m.kind!=="dribble" || m.layout==="corner-run")m.viewPoints.push({x:65,y:15},{x:235,y:210})
  if(m.kind==="dribble")m.viewPoints.push({x:m.bounds.left,y:m.gate.y-35},{x:m.bounds.right,y:m.origin.y+35})
  m.pressure=12
  const text = m.kind==="dribble" ? (m.layout.startsWith("touchline") ? "Carry it up the touchline." : m.layout==="corner-run" ? "Cut inside." : "Beat the press.")
    : m.kind==="corner" ? (m.layout==="short-corner" ? "A short corner is on." : m.layout==="deep-cross" ? "Corner to the far post." : "Corner to {home}.")
    : m.kind==="free-kick" ? "Free kick in range."
    : m.kind==="header" ? "A cross comes in."
    : m.kind==="pass" ? (m.zone==="defence" ? "Play out from the back." : "Find a pass in midfield.")
    : m.difficulty==="crowded" ? "A crowded box." : "A chance to shoot."
  note(m,text);changePhase(m,m.kind==="dribble"?"dribble":"aim")
}

export function setAim(m: Match, point: Point) {
  if (m.phase !== "aim") return
  const dx = m.ball.x - point.x, dy = m.ball.y - point.y
  const length = Math.max(1, Math.hypot(dx, dy)), scale = Math.min(1, 100 / length)
  m.aim = { x: dx * scale, y: dy * scale }
}
export function prepareStrike(m: Match) {
  if (m.phase !== "aim" || Math.hypot(m.aim.x, m.aim.y) < 10) return
  m.contact = { x: 0, y: 0 }
  changePhase(m, "strike")
}
export function strikeLimit(m: Match) { return m.incomingDuration }
export function strikePosition(m: Match): Point {
  const t = Math.max(0,m.phaseTime) / m.incomingDuration
  if(m.incoming==="left")return {x:-48+396*t,y:300}
  if(m.incoming==="right")return {x:348-396*t,y:300}
  if(m.incoming==="bounce-left" || m.incoming==="bounce-right")return {x:m.incoming==="bounce-left"?-48+396*t:348-396*t,y:307-Math.abs(Math.sin(t*Math.PI*2))*m.bounceHeight}
  if(m.incoming==="centre-left" || m.incoming==="centre-right")return {x:150+(m.incoming==="centre-left"?-210:210)*t,y:307-Math.abs(Math.sin(t*Math.PI*1.5))*m.bounceHeight}
  if(m.incoming==="drop")return {x:150+Math.sin(t*Math.PI)*20,y:-50+500*t}
  if(m.incoming==="bounce-in" || m.incoming==="rise")return {x:150+Math.sin(t*Math.PI*.5)*45,y:180+260*t-Math.abs(Math.sin(t*Math.PI*2))*m.bounceHeight*(1-t*.5)}
  return {x:150,y:300}
}

function stepBall(ball: Ball, dt: number, curve: number, wind: number) {
  const airborne = ball.z > .1 || ball.vz > 0
  ball.x += ball.vx * dt; ball.y += ball.vy * dt
  const speed=Math.max(1,Math.hypot(ball.vx,ball.vy)), oldX=ball.vx, oldY=ball.vy
  ball.vx += (-oldY/speed*curve+wind)*dt
  ball.vy += oldX/speed*curve*dt
  ball.z = Math.max(0, ball.z + ball.vz * dt)
  ball.vz -= 160 * dt
  if(ball.z===0 && ball.vz<0){
    if(ball.vz < -70 && (ball.bounces??0)<1){ball.vz=-ball.vz*.28;ball.bounces=(ball.bounces??0)+1;ball.vx*=.92;ball.vy*=.92}
    else ball.vz=0
  }
  const friction = Math.exp(-(airborne ? .18 : .85) * dt)
  ball.vx *= friction; ball.vy *= friction
}
export function predictLanding(ball: Ball, curve: number, wind: number): Point | null {
  if (ball.vz <= 0 && ball.z <= 0) return null
  const copy = { ...ball }
  for (let t = 0; t < 5; t += .02) {
    stepBall(copy, .02, curve, wind)
    if (t > .05 && copy.z <= 0) return { x: copy.x, y: copy.y }
  }
  return null
}
export function strike(m: Match, contact: Point) {
  if (m.phase !== "strike") return
  const timing = m.incoming === "drop" ? .8 + .2 * Math.max(0, 1 - Math.abs(strikePosition(m).y - 285) / 130) : 1
  const strength = timing
  m.contact = { x: clamp(contact.x, -1, 1), y: clamp(contact.y, -1, 1) }
  m.curve = -m.contact.x * 80
  m.ball = { ...blankBall(m.origin.x, m.origin.y), vx: m.aim.x * 3.15 * strength, vy: m.aim.y * 3.15 * strength, vz: Math.pow(Math.max(0, m.contact.y), 1.4) * 220 }
  m.landing = predictLanding(m.ball, m.curve, m.wind)
  m.attempt++
  changePhase(m, "flight")
}
export function finishAction(m: Match, text: string, pending: Match["pending"] = null) {
  const delta = /Assist!/.test(text) ? .65 : /^Goal!/.test(text) ? .85 : /beat the press/.test(text) ? .25 : !m.assistShot && /Tackled|Intercepted|Too long|Missed|wide|Over the bar|Out of play|runs loose|turns over|sails past/.test(text) ? -.22 : 0
  if(/^Goal!/.test(text))m.celebration={kind:m.assistShot?"assist":"goal",until:m.elapsed+1.5}
  m.rating = clamp(m.rating + delta, 3, 10)
  const turnover = !m.assistShot && /Tackled|Intercepted|Too long|Missed|Out of play|turns over/.test(text)
  m.counterThreat = turnover ? (m.zone === "defence" ? .42 : m.zone === "midfield" ? .28 : .18) : 0
  m.pending = pending; m.carrying = false
  note(m, text)
  changePhase(m, "result")
}
function received(m: Match, player: Player) {
  m.passes++; m.rating = clamp(m.rating + .12, 3, 10)
  if (m.kind === "corner" && m.layout === "deep-cross" && random(m) < .35) {
    finishAction(m, "Headed back across goal.", "header")
  } else if (m.kind === "pass") {
    finishAction(m, m.zone === "defence" ? "Pass complete." : "Pass complete.")
  } else {
    // Keep the camera on the receiver: their shot is played out, not rolled into a text result.
    m.assistShot = true; m.ball = blankBall(player.x, player.y)
    m.origin = { x: player.x, y: player.y }; m.landing = null
    note(m, "A teammate shapes to shoot.")
    changePhase(m, "teammate")
  }
}
export function continueMatch(m: Match) {
  if(m.celebration && m.elapsed<m.celebration.until)return
  if (m.phase === "halftime") {
    note(m, "Second half."); changePhase(m, "simulation"); return
  }
  if (m.phase !== "result") return
  const pending = m.pending
  m.pending = null
  if (pending) {
    // A linked chance belongs to this possession, not the next scheduled highlight.
    const index = m.nextChance
    beginChance(m, pending, pending === "header" ? "drop" : "right")
    m.nextChance = index
    return
  }
  if(m.counterThreat > 0){
    if(random(m)<m.counterThreat){m.away++;m.celebration={kind:"opponent",until:m.elapsed+1.5};note(m,"{away} score on the counter.","away")}
    else note(m,"{away} counter, but the defence gets back.","away")
    m.counterThreat=0
  }
  m.minute = Math.min(90, m.minute + .7)
  changePhase(m, "simulation")
}
export function tickMatch(m: Match, dt: number) {
  if (m.paused || m.phase === "setup" || m.phase === "fulltime") return
  dt = Math.max(0, Math.min(dt, .05))
  m.elapsed += dt
  if(m.celebration){
    if(m.elapsed<m.celebration.until)return
    const completedGoal=m.phase==="result" && /^Goal!/.test(m.message)
    m.celebration=null
    if(completedGoal){continueMatch(m);return}
  }
  m.phaseTime += dt
  if (m.phase === "halftime") { if(m.phaseTime>=1.5)continueMatch(m);return }
  if (m.phase === "result") { if (m.phaseTime > .9) continueMatch(m); return }
  if (m.phase === "teammate") {
    if (m.phaseTime >= .65) {
      const distanceToGoal = distance(m.ball, { x: 150, y: 45 })
      const anglePenalty = Math.abs(m.ball.x - 150) / 450
      const quality = clamp(.76 - distanceToGoal / 700 - anglePenalty, .38, .68)
      const roll = random(m)
      const farPost = m.keeper.x < 150 ? 196 : 104
      const targetX = roll < quality ? farPost + (random(m) - .5) * 4 : roll > .92 ? (farPost < 150 ? 83 : 217) : m.keeper.x + (random(m) - .5) * 8
      const chip = m.ball.y > 160 && random(m) < .3
      const pace = chip ? 255 + random(m)*25 : 350 + random(m)*35
      const travel = Math.max(25, m.ball.y - 45)
      // Solve ground-ball drag so the chosen spot is where the ball crosses the line.
      m.ball.vx = (targetX - m.ball.x) / travel * pace; m.ball.vy = -pace
      const time = chip ? travel / pace : 0
      m.ball.vz = chip ? 80*time + 8/Math.max(.3,time) : 0; m.curve = 0; m.wind = 0
      m.landing = predictLanding(m.ball,0,0)
      note(m, chip ? "They try a chip." : "They go for goal!"); changePhase(m, "flight")
    }
    return
  }
  if (m.phase === "simulation") {
    const before = m.minute
    m.minute = Math.min(90, m.minute + dt * 1.7 * m.speed)
    if (!m.halfPlayed && m.minute >= 45) { m.minute = 45; m.halfPlayed = true; note(m, "Half-time.", "neutral"); changePhase(m, "halftime"); return }
    if (m.minute >= 90) { note(m, "Full time.", "neutral"); changePhase(m, "fulltime"); return }
    if (m.minute >= (schedule[m.nextChance] ?? 95)) { beginChance(m); return }
    if (Math.floor(before / 2) !== Math.floor(m.minute / 2)) {
      const roll = random(m)
      if (roll < .095) { m.away++; m.celebration={kind:"opponent",until:m.elapsed+1.5}; note(m, "The visitors find a way through.", "away") }
      else if (roll > .975) { m.home++; m.celebration={kind:"goal",until:m.elapsed+1.5}; note(m, "We score at the other end!") }
      else {
        const side = roll < .5 ? "away" : "home"
        const shortLines=side==="home"
          ? ["{home} keep the ball.","A quick one-two.","A run down the left.","A run down the right.","The cross is blocked.","Offside.","A loose touch.","{home} switch play.","The keeper collects.","A shot goes wide.","{home} win a corner.","A through ball is cut out.","Space opens out wide.","{home} build again.","A dangerous low cross.","The defence clears."]
          : ["{away} push forward.","A cross from the left.","A cross from the right.","The shot is blocked.","Our keeper gathers.","{away} press high.","A dangerous counter.","The defence holds.","{away} win a free kick.","A header goes over.","{away} keep possession.","A late tackle.","The flag goes up.","{away} switch play.","A chance goes begging.","The ball runs out."]
        const choices=shortLines.filter(text=>commentaryKey(text)!==commentaryKey(m.message))
        note(m,choices[Math.floor(random(m)*choices.length)],side)
      }
    }
    return
  }
  if (m.phase === "aim" || m.phase === "dribble" || m.phase === "flight") {
    for (const player of m.players) {
      if (player.team === "away") {
        const pace = m.phase === "dribble" ? (m.layout.startsWith("touchline") ? 22 : 28) : m.phase === "aim" ? ((m.kind === "corner" || m.kind === "free-kick") ? 0 : 6 + (player.id === 6 ? 3 : 0)) : m.difficulty === "crowded" ? 27 : 23
        const protectedWindow = (m.phase === "aim" || m.phase === "dribble") && m.phaseTime < m.grace
        if (!protectedWindow) {
          const lead=(player.anticipation??0)/Math.max(1,distance(m.ball,m.dribbleTarget))
          const intercept=m.phase==="dribble"?{x:m.ball.x+(m.dribbleTarget.x-m.ball.x)*lead,y:m.ball.y+(m.dribbleTarget.y-m.ball.y)*lead}:m.ball
          const target=player.anchor && m.phase==="dribble" ? {x:clamp(m.ball.x,player.anchor.x-35,player.anchor.x+35),y:clamp(m.ball.y,player.anchor.y-30,player.anchor.y+30)} : intercept
          move(player,target,dt*pace*(player.pace??1))
        }
        if (!protectedWindow && m.phase !== "flight" && distance(player, m.ball) < 13) { finishAction(m, "Tackled. They win it back."); return }
      } else if (m.phase === "flight") {
        move(player, m.landing && m.ball.z > 12 ? m.landing : m.ball, dt * 34)
      } else if (m.phase === "aim") {
        player.x = clamp(player.x + (player.run || 1) * dt * (m.kind === "corner" ? 1.5 : 3), -170, 470)
        player.y = clamp(player.y - dt * 2.5, 80, 1000)
      }
    }
  }
  if (m.phase === "dribble") {
    if (m.carrying) {
      move(m.ball, m.dribbleTarget, dt * 78)
      m.you={x:m.ball.x,y:m.ball.y}
      if (m.ball.y <= m.gate.y && m.ball.x >= m.gate.left && m.ball.x <= m.gate.right) { m.dribbles++; finishAction(m, "You beat the press. Into the attack.", "shot"); return }
    }
    if (m.phaseTime > 14) finishAction(m, "Possession turns over.")
    return
  }
  if (m.phase === "aim") {
    m.pressure = Math.max(0, 12 - m.phaseTime)
    if (m.phaseTime > 12) finishAction(m, "Too long on the ball. The chance is gone.")
    return
  }
  if (m.phase === "strike") {
    const limit = strikeLimit(m)
    if (m.phaseTime > limit) finishAction(m, m.incoming === "drop" ? "The cross sails past you." : "Missed the touch.")
    return
  }
  if (m.phase !== "flight") return
  const previous = { ...m.ball }
  stepBall(m.ball, dt, m.curve, m.wind)
  if (m.kind !== "pass") {
    if (m.phaseTime > m.keeperReaction && m.ball.vy < -1) {
      const arrival = clamp((m.ball.y - m.keeper.y) / -m.ball.vy, 0, 1.5)
      const target = clamp(m.ball.x + m.ball.vx * arrival + .5 * (-m.ball.vy/Math.max(1,Math.hypot(m.ball.vx,m.ball.vy))*m.curve + m.wind) * arrival * arrival, 105, 195)
      m.keeper.x += clamp(target - m.keeper.x, -dt * 48, dt * 48)
    }
    if (m.ball.z < 22 && distance(m.ball, m.keeper) < 15) { finishAction(m, "Saved by the keeper."); return }
    if (previous.y > 45 && m.ball.y <= 45) {
      const crossingX = previous.x + (m.ball.x - previous.x) * (previous.y - 45) / Math.max(.001, previous.y - m.ball.y)
      if (crossingX >= 98 && crossingX <= 202) {
        if (m.ball.z > 27) finishAction(m, "Over the bar.")
        else { m.home++; if (m.assistShot) m.assists++; else m.goals++; finishAction(m, m.assistShot ? "Goal! Assist!" : m.kind === "header" ? "Goal! You meet the cross perfectly." : "Goal!") }
      } else finishAction(m, "Just wide.")
      return
    }
  }
  for (const player of m.players) {
    if (m.ball.z < 12 && m.phaseTime > .12 && distance(player, m.ball) < (player.team === "home" ? 17 : 12)) {
      if (player.team === "home") { if (m.assistShot) continue; received(m, player) }
      else finishAction(m, "Intercepted. They read the pass.")
      return
    }
  }
  if (m.ball.x < -190 || m.ball.x > 490 || m.ball.y < 45 || m.ball.y > 1095) { finishAction(m, "Out of play."); return }
  if (m.phaseTime > 3.5 || (m.phaseTime > .6 && Math.hypot(m.ball.vx, m.ball.vy) < 28 && m.ball.z === 0)) finishAction(m, "The ball runs loose.")
}
