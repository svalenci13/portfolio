"use client"

import { useEffect, useRef, type ReactNode } from "react"

export function HomeViewport({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const main = ref.current?.querySelector("main")
    if (!main) return
    const fit = () => {
      const available = window.visualViewport?.height ?? window.innerHeight
      const scale = Math.min(1, Math.max(0, available - 12) / main.offsetHeight)
      main.style.setProperty("--home-scale", String(scale))
    }
    const observer = new ResizeObserver(fit)
    observer.observe(main)
    window.addEventListener("resize", fit)
    window.visualViewport?.addEventListener("resize", fit)
    fit()
    return () => { observer.disconnect(); window.removeEventListener("resize", fit); window.visualViewport?.removeEventListener("resize", fit) }
  }, [])
  return <div ref={ref} className="portfolio-home">{children}</div>
}

