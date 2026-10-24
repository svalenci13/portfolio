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
  const placements: { player: Player; top: string; left: string; width: number; tilt: string }[] = [
    { player: "ronaldinho", top: "0%", left: "-3%", width: 245, tilt: "-3deg" },
    { player: "neymar", top: "12%", left: "72%", width: 210, tilt: "2deg" },
    { player: "r9", top: "27%", left: "61%", width: 250, tilt: "-2deg" },
    { player: "kaka", top: "39%", left: "-8%", width: 310, tilt: "1deg" },
    { player: "pele", top: "53%", left: "4%", width: 330, tilt: "-2deg" },
    { player: "adriano", top: "67%", left: "69%", width: 290, tilt: "3deg" },
    { player: "messi", top: "80%", left: "52%", width: 265, tilt: "-1deg" },
    { player: "maradona", top: "95%", left: "-1%", width: 240, tilt: "2deg" },
  ]
  return <div className="soccer-art-trail" aria-hidden="true">
    {placements.map(({ player, top, left, width, tilt }) => (
      <div className="soccer-art-placement" key={player} style={{ top, left, width, transform: `rotate(${tilt})` }}>
        <SoccerBackdrop player={player} />
      </div>
    ))}
  </div>
}

