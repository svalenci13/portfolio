import legends from "@/lib/soccer-legends.json"

type Player = keyof typeof legends
const names: Record<Player, string> = { messi: "Lionel Messi", neymar: "Neymar", r9: "Ronaldo Nazário", adriano: "Adriano", kaka: "Kaká", pele: "Pelé · 1970", maradona: "Maradona · 1986", ronaldinho: "Ronaldinho · 2006" }

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
      return <li key={player}><a href={art.source} target="_blank" rel="noreferrer">{names[player]}</a> · {art.artist} · <a href={art.licenseUrl} target="_blank" rel="noreferrer">{art.license}</a>. Converted to ASCII. {art.license === "Public domain" ? "Source photograph in the public domain." : "Adaptation under the same license."}</li>
    })}</ul>
  </details>
}

export function SoccerArtTrail() {
  const order: Player[] = ["ronaldinho", "neymar", "r9", "kaka", "pele", "adriano", "messi", "maradona"]
  return <div className="soccer-art-trail" aria-hidden="true">
    {order.map((player, index) => <SoccerBackdrop key={player} player={player} side={index % 2 ? "right" : "left"} />)}
  </div>
}

