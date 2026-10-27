import type { ReactNode } from "react"

export function HomeViewport({ children }: { children: ReactNode }) {
  return <div className="portfolio-home">{children}</div>
}
