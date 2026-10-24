import rows from "@/lib/soccer-backdrop.json"

export function SoccerBackdrop() {
  return (
    <svg className="soccer-ascii-backdrop" viewBox="0 0 1440 558" aria-hidden="true" focusable="false">
      <g fill="currentColor" fontFamily="monospace" fontSize="10" xmlSpace="preserve">
        {rows.map((row, index) => (
          <text key={index} x="0" y={index * 9 + 9}>{row}</text>
        ))}
      </g>
    </svg>
  )
}

