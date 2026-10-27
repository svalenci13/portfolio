import type { Match, Point } from "./kickabout-engine"

export function rotatePoint(point: Point, degrees: number): Point {
  const radians=degrees*Math.PI/180, c=Math.round(Math.cos(radians)), s=Math.round(Math.sin(radians))
  return {x:point.x*c-point.y*s,y:point.x*s+point.y*c}
}
export function chanceView(m: Match): string {
  // The snapshot is captured when the chance begins. Never chase moving
  // players or a new receiver with the camera during that possession.
  const points:Point[]=m.viewPoints.length ? m.viewPoints : [m.origin,...m.players]
  const rotated=points.map(p=>rotatePoint(p,m.rotation))
  let left=Math.min(...rotated.map(p=>p.x))-48,right=Math.max(...rotated.map(p=>p.x))+48
  let top=Math.min(...rotated.map(p=>p.y))-40,bottom=Math.max(...rotated.map(p=>p.y))+40
  const centre={x:(left+right)/2,y:(top+bottom)/2}
  let width=Math.max(300,right-left),height=Math.max(330,bottom-top)
  if(width/height>300/380)height=width*380/300;else width=height*300/380
  left=centre.x-width/2;top=centre.y-height/2
  return `${left} ${top} ${width} ${height}`
}
