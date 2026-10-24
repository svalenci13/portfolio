export const dynamic = "force-dynamic"

type Track = { name: string; type?: string; artists?: { name: string }[]; external_urls?: { spotify?: string } }
let tokenCache: { value: string; until: number } | undefined
let snapshot: { value: object; until: number } | undefined

const reply = (body: object, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } })

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
  if (!clientId || !refreshToken) return reply({ status: "unavailable", isPlaying: false }, 503)
  if (snapshot && snapshot.until > Date.now()) return reply(snapshot.value)
  try {
    if (!tokenCache || tokenCache.until <= Date.now()) {
      const secret = process.env.SPOTIFY_CLIENT_SECRET
      const body = new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken })
      const headers: Record<string, string> = { "Content-Type": "application/x-www-form-urlencoded" }
      // PKCE credentials need no client secret. Existing confidential-client tokens remain supported.
      if (secret) headers.Authorization = `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`
      else body.set("client_id", clientId)
      const response = await fetch("https://accounts.spotify.com/api/token", { method: "POST", headers, body, cache: "no-store", signal: AbortSignal.timeout(8000) })
      if (!response.ok) return reply({ status: "unavailable", isPlaying: false }, 503)
      const token = await response.json()
      if (typeof token.access_token !== "string") return reply({ status: "unavailable", isPlaying: false }, 503)
      tokenCache = { value: token.access_token, until: Date.now() + Math.max(0, Number(token.expires_in || 3600) - 60) * 1000 }
    }
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers: { Authorization: `Bearer ${tokenCache.value}` }, cache: "no-store", signal: AbortSignal.timeout(8000) })
    if (response.status === 401) tokenCache = undefined
    if (response.status !== 204 && !response.ok) return reply({ status: "unavailable", isPlaying: false }, 503)
    let result: object = { status: "idle", isPlaying: false }
    if (response.status !== 204) {
      const playback = await response.json()
      const item = playback.item as Track | null
      if (playback.is_playing && item?.name && item.type === "track" && item.external_urls?.spotify) {
        result = { status: "playing", isPlaying: true, title: item.name, artist: item.artists?.map(artist => artist.name).join(", ") || "", songUrl: item.external_urls.spotify }
      }
    }
    snapshot = { value: result, until: Date.now() + 20000 }
    return reply(result)
  } catch {
    return reply({ status: "unavailable", isPlaying: false }, 503)
  }
}

