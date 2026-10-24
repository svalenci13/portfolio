import katex from "katex"
import "katex/dist/katex.min.css"

export function Equation({ tex, label, compact = false }: { tex: string; label: string; compact?: boolean }) {
  const html = katex.renderToString(tex, { displayMode: true, throwOnError: true, trust: false, output: "htmlAndMathml" })
  return <div className={`typeset-equation${compact ? " compact-equation" : ""}`} role="group" aria-label={label} dangerouslySetInnerHTML={{ __html: html }} />
}

