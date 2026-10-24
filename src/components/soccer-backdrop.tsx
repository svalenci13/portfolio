import legends from "@/lib/soccer-legends.json"

type Player = keyof typeof legends
const names: Record<Player, string> = { messi: "Lionel Messi", neymar: "Neymar", r9: "Ronaldo Nazário", adriano: "Adriano", kaka: "Kaká" }

export function SoccerBackdrop({ player, side = "right" }: { player: Player; side?: "left" | "right" }) {
  const art = legends[player]
  return (
    <svg className={`soccer-ascii-backdrop soccer-art-${side}`} viewBox={`0 0 ${art.width} ${art.height}`} aria-hidden="true" focusable="false">
      <g fill="currentColor" fontFamily="monospace" fontSize="10" xmlSpace="preserve">
        {art.rows.map((row, index) => <text key={index} x="0" y={index * 10 + 9}>{row}</text>)}
      </g>
    </svg>
  )
}

export function SoccerArtCredits() {
  return <details className="soccer-art-credits">
    <summary>ASCII photo credits</summary>
    <ul>{(Object.keys(legends) as Player[]).map(player => {
      const art = legends[player]
      return <li key={player}><a href={art.source} target="_blank" rel="noreferrer">{names[player]}</a> · {art.artist} · <a href={art.licenseUrl} target="_blank" rel="noreferrer">{art.license}</a>. Cropped and converted to ASCII; adaptation under the same license.</li>
    })}</ul>
  </details>
}

