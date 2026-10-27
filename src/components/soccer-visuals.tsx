"use client"

import { useId, useEffect, useRef } from "react"
import { strikeFrame } from "@/lib/kickabout-camera"
import type { Point } from "@/lib/kickabout-engine"

export const CLUBS = [
  { name: "Spurs", full: "Tottenham Hotspur", crest: "spurs", stadium: "Tottenham Hotspur Stadium", accent: "#172b4e", score: "#f3f4f7", shirt: "#fafafa", stripe: "#293d5a", shorts: "#293d5a" },
  { name: "Barça", full: "FC Barcelona", crest: "barcelona", stadium: "Camp Nou", accent: "#8f254c", score: "#173972", shirt: "#294d83", stripe: "#b6516c", shorts: "#294366" },
  { name: "Arsenal", full: "Arsenal", crest: "arsenal", stadium: "Emirates Stadium", accent: "#b92032", score: "#c72b3c", shirt: "#d33242", stripe: "#fafafa", shorts: "#f7f7f3" },
  { name: "Real Madrid", full: "Real Madrid", crest: "madrid", stadium: "Bernabéu", accent: "#304681", score: "#f0eee7", shirt: "#faf9f4", stripe: "#cab98a", shorts: "#e8e8e1" },
]

export function ClubCrest({ club, size = 32 }: { club: number; size?: number }) {
  const canvas=useRef<HTMLCanvasElement>(null)
  const pixelated=size<=22
  useEffect(()=>{
    if(!pixelated)return
    const image=new Image(),context=canvas.current?.getContext("2d")
    let active=true
    image.onload=()=>{
      if(!active||!context)return
      const scale=Math.min(14/image.width,14/image.height),width=image.width*scale,height=image.height*scale
      context.clearRect(0,0,14,14);context.imageSmoothingEnabled=true;context.imageSmoothingQuality="high"
      context.drawImage(image,(14-width)/2,(14-height)/2,width,height)
    }
    image.src=`/logos/clubs/${CLUBS[club].crest}.png`
    return()=>{active=false}
  },[club,pixelated])
  return pixelated ? <canvas ref={canvas} className="soccer-crest soccer-crest-pixel" width="14" height="14" style={{width:size,height:size,imageRendering:"pixelated"}} aria-hidden="true"/> : <img className="soccer-crest" src={`/logos/clubs/${CLUBS[club].crest}.png`} alt="" width={size} height={size} draggable={false}/>
}

export function Football({ x, y, radius = 7 }: Point & { radius?: number }) {
  const id = useId()
  return <g transform={`translate(${x} ${y}) scale(${radius / 50})`}>
    <defs><radialGradient id={id} cx="32%" cy="23%" r="78%"><stop offset="0" stopColor="#fff"/><stop offset=".55" stopColor="#f4f5f3"/><stop offset="1" stopColor="#a8b4bc"/></radialGradient></defs>
    <circle r="49" fill={`url(#${id})`} stroke="#415166" strokeWidth="1.2"/>
    <defs><clipPath id={`${id}-clip`}><circle r="48.5"/></clipPath></defs>
    <g clipPath={`url(#${id}-clip)`}>
      <g fill="#243e62" stroke="#1b3151" strokeWidth=".75">
        <path d="m0-25 6.2 17.8L25-7.7 9.8 3.4l5.7 18.2L0 10.5l-15.5 11.1 5.7-18.2L-25-7.7l18.8.5Z"/>
        {[[-42,-31,-24],[40,-30,35],[-45,29,-35],[43,30,24],[0,56,0]].map(([x,y,angle],i)=><path key={i} transform={`translate(${x} ${y}) rotate(${angle}) scale(.8)`} d="m0-25 6.2 17.8L25-7.7 9.8 3.4l5.7 18.2L0 10.5l-15.5 11.1 5.7-18.2L-25-7.7l18.8.5Z"/>)}
      </g>
      <g stroke="#a8b6c2" strokeWidth=".8" fill="none"><path d="M0-25v-24M25-8l18-13M16 22l14 18M-16 22l-14 18M-25-8l-19-13"/></g>
    </g>
    <path d="M-32-31Q-8-49 17-33" fill="none" stroke="#fff" strokeWidth="3" opacity=".65"/>
  </g>
}
export function StatIcon({ kind }: { kind: "goal" | "assist" }) {
  return <svg width="12" height="12" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">{kind === "goal" ? <><circle cx="9" cy="9" r="7"/><path d="m9 5 4 3-2 4H7L5 8Z M9 2v3m7 3h-3m-2 4 2 3m-6-3-2 3M2 8h3"/></> : <><path d="M4 3h5v6l6 2q2 1 1 4H3V9l1-6Z M3 12h9m-2-5 2 1m-2 1 2 1"/><path d="M4 15v2m4-2v2m5-2v2"/></>}</svg>
}

// Original stadium illustrations: roof and bowl silhouettes reference each ground.
export function StrikeScene({ club, contact, cursor, progress, header, frame = {width:300,height:380} }: { club: number; contact: Point; cursor: Point; progress: number; header: boolean; frame?: {width:number;height:number} }) {
  const id = useId(), team = CLUBS[club]
  const ball=strikeFrame(contact,frame)
  return <g>
    <defs>
      <linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor="#a9c8dc"/><stop offset="1" stopColor="#e0eaf0"/></linearGradient>
      <linearGradient id={`${id}-grass`} x2="0" y2="1"><stop stopColor="#7c9d79"/><stop offset="1" stopColor="#406d55"/></linearGradient>
      <pattern id={`${id}-crowd`} width="13" height="12" patternUnits="userSpaceOnUse"><rect width="13" height="12" fill={team.accent}/><circle cx="3" cy="3" r="1.4" fill="#d3b49a"/><path d="M1 6h4" stroke={team.shirt} strokeWidth="3"/><circle cx="10" cy="8" r="1.4" fill="#a18a75"/><path d="M8 11h4" stroke={team.stripe} strokeWidth="3"/></pattern>
      <filter id={`${id}-grain`}><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="2" seed="8"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".1"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter><pattern id={`${id}-blades`} width="11" height="9" patternUnits="userSpaceOnUse"><path d="m1 9 1-4 1 4m5-1 1-3" stroke="#d2deba" strokeWidth=".5" opacity=".3"/></pattern>
    </defs>
    <g transform={`scale(${frame.width/300} ${frame.height/380})`}>
    <rect width="300" height="380" rx="3" fill={`url(#${id}-sky)`}/>
    <g fill="#f5f9fb" opacity=".45"><path d="M20 69q12-10 25 0 13-6 22 3H20Z"/><path d="M210 103q14-11 25 0 15-5 28 4h-53Z"/></g>
    <path d="M0 177q150-32 300 0v105H0Z" fill={`url(#${id}-crowd)`}/>
    {[196,222,246].map(y=><path key={y} d={`M0 ${y}q150-13 300 0`} stroke="#cbd4d7" strokeWidth="4" fill="none"/>)}
    {team.crest === "spurs" ? <><path d="M0 165Q150 98 300 165L280 184Q150 139 20 184Z" fill="#dce3e6"/><path d="M0 166Q150 120 300 166" fill="none" stroke="#8195a4" strokeWidth="3"/><path d="M15 174v42m270-42v42" stroke="#c4cdd2" strokeWidth="3"/></> : team.crest === "madrid" ? <><path d="M0 158Q150 89 300 158v29Q150 130 0 187Z" fill="#afbfc9"/>{[0,1,2,3].map(i=><path key={i} d={`M0 ${162+i*5}Q150 ${100+i*10} 300 ${162+i*5}`} fill="none" stroke="#dde5e8" strokeWidth="2"/>)}</> : team.crest === "arsenal" ? <><path d="M0 174Q150 116 300 174l-14 14Q150 145 14 188Z" fill="#e5e7e8"/><path d="M0 173Q150 131 300 173" fill="none" stroke="#a5b3bf" strokeWidth="3"/>{[35,80,125,175,220,265].map(x=><path key={x} d={`M${x} 156v24`} stroke="#c2cbd2" strokeWidth="1.5"/>)}</> : <><path d="M0 170Q150 135 300 170" stroke="#c8d2d8" strokeWidth="6" fill="none"/><path d="M20 170v-24m260 24v-24" stroke="#778e9e" strokeWidth="3"/><path d="M8 146h25m234 0h25" stroke="#f6f6e8" strokeWidth="4"/></>}
    <path d="M0 180q150-30 300 0v12q-150-30-300 0Z" fill="#1b3146" opacity=".22"/>
    {[12,288].map(x=><g key={x}><path d={`M${x} 140v75`} stroke="#b7c5ce" strokeWidth="2"/><path d={`M${x-9} 138h18`} stroke="#edf3f4" strokeWidth="4"/></g>)}
    <rect y="270" width="300" height="15" fill={team.accent}/><text x="150" y="280" textAnchor="middle" fontSize="6.5" letterSpacing="1" fill="#fff" fontFamily="monospace">{team.stadium.toUpperCase()}</text>
    <path d="M0 285h300v95H0Z" fill={`url(#${id}-grass)`} filter={`url(#${id}-grain)`}/><path d="M0 305h300v15H0Zm0 38h300v21H0Z" fill="#c6d8ac" opacity=".07"/><path d="M0 285h300v95H0Z" fill={`url(#${id}-blades)`}/>
    <path d="M115 285 65 380m120-95 50 95M0 353h300" stroke="#e7eee2" opacity=".5" fill="none"/>
    </g>
    <text x={frame.width/2} y={33*frame.height/380} textAnchor="middle" fill="#4c647c" fontSize={9*ball.scale} fontFamily="monospace">{header ? "MEET THE CROSS" : "PICK YOUR CONTACT"}</text>
    <ellipse cx={ball.x} cy={345*frame.height/380} rx={32*ball.scale} ry={5*ball.scale} fill="#1f423d" opacity=".28"/>
    <Football x={ball.x} y={ball.y} radius={ball.radius}/>
    {(cursor.x!==0||cursor.y!==0)&&<path d={`M${ball.x+cursor.x*ball.radius-4*ball.scale} ${ball.y+cursor.y*ball.radius}h${8*ball.scale}m${-4*ball.scale} ${-4*ball.scale}v${8*ball.scale}`} stroke="#5d7890" strokeWidth={ball.scale}/>}
    <g transform={`translate(${18*frame.width/300} ${frame.height-18*ball.scale}) scale(${ball.scale})`}><rect width="76" height="4" rx="2" fill="#183f3970"/><rect width={76*Math.max(0,progress)} height="4" rx="2" fill="#ceded1"/></g>
  </g>
}
