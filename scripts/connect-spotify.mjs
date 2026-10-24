import { createServer } from "node:http"
import { randomBytes, createHash, timingSafeEqual } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

const clientId = process.env.SPOTIFY_CLIENT_ID || process.argv[2]
if (!clientId) throw new Error("Pass your Spotify client ID as the first argument.")
const redirect = "http://127.0.0.1:3000"
const verifier = randomBytes(48).toString("base64url")
const challenge = createHash("sha256").update(verifier).digest("base64url")
const state = randomBytes(24).toString("hex")
const authorize = new URL("https://accounts.spotify.com/authorize")
authorize.search = new URLSearchParams({ client_id: clientId, response_type: "code", redirect_uri: redirect, scope: "user-read-currently-playing", code_challenge_method: "S256", code_challenge: challenge, state, show_dialog: "true" }).toString()
let exchanging = false
const server = createServer(async (req, res) => {
  const url = new URL(req.url, redirect)
  const send = (status, message) => { res.writeHead(status, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'" }); res.end(`<html><body style="font:16px monospace;padding:60px">${message}</body></html>`) }
  if (url.pathname !== "/") return send(404, "Not found.")
  const returned = Buffer.from(url.searchParams.get("state") || "")
  const expected = Buffer.from(state)
  if (returned.length !== expected.length || !timingSafeEqual(returned, expected)) return send(400, "This is the Spotify connection callback. Complete authorization in the Spotify tab.")
  if (url.searchParams.has("error")) return send(400, "Spotify authorization was declined. You can retry the authorization link.")
  const code = url.searchParams.get("code")
  if (!code || exchanging) return send(400, "Invalid or already processing authorization.")
  exchanging = true
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: clientId, grant_type: "authorization_code", code, redirect_uri: redirect, code_verifier: verifier }), signal: AbortSignal.timeout(15000) })
    const data = await response.json()
    if (!response.ok || !data.refresh_token) throw new Error("Spotify rejected authorization. Restart setup and try again.")
    const file = resolve(".env.local")
    let existing = await readFile(file, "utf8").catch(() => "")
    existing = existing.split(/\r?\n/).filter(line => !/^SPOTIFY_(CLIENT_ID|CLIENT_SECRET|REFRESH_TOKEN)=/.test(line)).join("\n").trimEnd()
    await writeFile(file, `${existing}\nSPOTIFY_CLIENT_ID=${clientId}\nSPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`, { mode: 0o600 })
    send(200, 'Spotify connected. Your credentials were saved locally. Return to the portfolio at <a href="http://localhost:3000">localhost:3000</a>.')
    console.log("Spotify connected. Credentials saved to ignored .env.local; no secrets printed.")
    clearTimeout(timeout); server.close()
  } catch { exchanging = false; send(502, "Connection failed. Restart setup and try authorizing again. No credentials were printed.") }
})
const timeout = setTimeout(() => { console.error("Spotify connection timed out. Run setup again to retry."); server.close(); process.exitCode = 1 }, 15 * 60 * 1000)
server.listen(3000, "127.0.0.1", () => { console.log("Open this link to connect Spotify:"); console.log(authorize.href) })

