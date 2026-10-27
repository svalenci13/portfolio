import type { Match, Point } from "./kickabout-engine"

export function rotatePoint(point: Point, degrees: number): Point {
  const radians=degrees*Math.PI/180
  const snap=(value:number)=>Math.abs(value)<1e-12?0:Math.abs(Math.abs(value)-1)<1e-12?Math.sign(value):value
  const c=snap(Math.cos(radians)),s=snap(Math.sin(radians))
  return {x:point.x*c-point.y*s,y:point.x*s+point.y*c}
}
export function chanceView(m: Match, aspect = 300/380): string {
  // The snapshot is captured when the chance begins. Never chase moving
  // players or a new receiver with the camera during that possession.
  const points:Point[]=m.viewPoints.length ? m.viewPoints : [m.origin,...m.players]
  const rotated=points.map(p=>rotatePoint(p,m.rotation))
  const pad=m.kind==="corner"?28:48
  let left=Math.min(...rotated.map(p=>p.x))-pad,right=Math.max(...rotated.map(p=>p.x))+pad
  let top=Math.min(...rotated.map(p=>p.y))-pad,bottom=Math.max(...rotated.map(p=>p.y))+pad
  const centre={x:(left+right)/2,y:(top+bottom)/2}
  let width=Math.max(300,right-left),height=Math.max(330,bottom-top)
  if(width/height>aspect)height=width/aspect;else width=height*aspect
  left=centre.x-width/2;top=centre.y-height/2
  return `${left} ${top} ${width} ${height}`
}

export function strikeFrame(contact: Point, frame: {width:number;height:number}) {
  const scale=Math.min(frame.width/300,frame.height/380)
  return {x:contact.x*frame.width/300,y:contact.y*frame.height/380,radius:44*scale,scale}
}
