"use client"

import { useEffect, useRef, useState } from "react"

const query="(max-width: 1099px), (hover: none), (pointer: coarse)"
let locks=0, savedY=0, savedStyle={overflow:"",position:"",top:"",width:""}

/** Full-screen game mode preserves the underlying page position on touch devices. */
export function useMobileGame(open: boolean, id: string, close: () => void) {
  const [mobile,setMobile]=useState(false)
  const closeRef=useRef(close)
  useEffect(()=>{closeRef.current=close},[close])
  useEffect(()=>{
    const media=window.matchMedia(query),update=()=>setMobile(media.matches)
    update();media.addEventListener("change",update)
    const otherGame=(event:Event)=>{if((event as CustomEvent<string>).detail!==id && media.matches)closeRef.current()}
    window.addEventListener("portfolio-game-open",otherGame)
    return()=>{media.removeEventListener("change",update);window.removeEventListener("portfolio-game-open",otherGame)}
  },[id])
  useEffect(()=>{
    if(!mobile||!open)return
    window.dispatchEvent(new CustomEvent("portfolio-game-open",{detail:id}))
    const previous=document.activeElement instanceof HTMLElement ? document.activeElement : null
    const surface=document.querySelector<HTMLElement>(`[data-game="${id}"]`)
    const focusable=()=>Array.from(surface?.querySelectorAll<HTMLElement>('button:not([disabled]):not(.game-backdrop),input:not([disabled]),a[href],[tabindex="0"]')??[]).filter(element=>element.getClientRects().length>0)
    const keydown=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){event.preventDefault();closeRef.current();return}
      if(event.key!=="Tab")return
      const items=focusable(),first=items[0],last=items[items.length-1]
      if(!first)return
      if(event.shiftKey&&(document.activeElement===first||!surface?.contains(document.activeElement))){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&(document.activeElement===last||!surface?.contains(document.activeElement))){event.preventDefault();first.focus()}
    }
    document.addEventListener("keydown",keydown)
    if(!surface?.contains(document.activeElement))focusable()[0]?.focus({preventScroll:true})
    if(locks++===0){
      savedY=window.scrollY
      const style=document.body.style
      savedStyle={overflow:style.overflow,position:style.position,top:style.top,width:style.width}
      Object.assign(style,{overflow:"hidden",position:"fixed",top:`-${savedY}px`,width:"100%"})
    }
    return()=>{document.removeEventListener("keydown",keydown);if(--locks===0){Object.assign(document.body.style,savedStyle);window.scrollTo({top:savedY,behavior:"instant"});if(previous?.isConnected)previous.focus({preventScroll:true})}}
  },[mobile,open,id])
  return mobile
}
