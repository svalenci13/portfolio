import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { createClient } from "redis"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
type Entry = { id: string; nickname: string; hits: number; accuracy: number; createdAt: string }
const key = "portfolio:warmup:v1"
const localFile = path.join(process.cwd(), ".next", "cache", "warmup-leaderboard.json")
let localQueue: Promise<unknown> = Promise.resolve()
const newClient = () => createClient({ url: process.env.REDIS_URL, socket: { connectTimeout: 5000, reconnectStrategy: false }, disableOfflineQueue: true })
let connection: Promise<ReturnType<typeof newClient>> | undefined
const reply = (body: object, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } })

function config() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  return url && token ? { url: url.replace(/\/$/, ""), token } : null
}
async function redis(commands: (string | number)[][]) {
  const connection = config()!
  const response = await fetch(`${connection.url}/multi-exec`, {
    method: "POST", headers: { Authorization: `Bearer ${connection.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands), cache: "no-store", signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error("Leaderboard storage unavailable")
  const results: { result?: unknown; error?: string }[] = await response.json()
  if (!Array.isArray(results) || results.some(result => result.error)) throw new Error("Leaderboard storage unavailable")
  return results
}
async function localEntries(): Promise<Entry[]> {
  try { return JSON.parse(await readFile(localFile, "utf8")) }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error }
}
async function leaderboard(entry?: Entry) {
  if (process.env.REDIS_URL) {
    if (!connection) {
      const client = newClient()
      client.on("error", () => { connection = undefined })
      connection = client.connect().then(() => client).catch(() => { connection = undefined; throw new Error("Leaderboard storage unavailable") })
    }
    const client = await connection!
    const transaction = client.multi()
    if (entry) {
      transaction.zAdd(key, { score: entry.hits, value: JSON.stringify(entry) })
      transaction.zRemRangeByRank(key, 0, -101)
    }
    transaction.zRange(key, 0, 9, { REV: true })
    const results = await transaction.exec()
    return { entries: (results.at(-1) as unknown as string[]).map(value => JSON.parse(value) as Entry), storage: "shared" }
  }
  if (config()) {
    const commands: (string | number)[][] = entry ? [
      ["ZADD", key, entry.hits, JSON.stringify(entry)],
      ["ZREMRANGEBYRANK", key, 0, -101],
    ] : []
    commands.push(["ZREVRANGE", key, 0, 9])
    const results = await redis(commands)
    return { entries: (results.at(-1)!.result as string[]).map(value => JSON.parse(value) as Entry), storage: "shared" }
  }
  if (process.env.NODE_ENV === "production") throw new Error("Leaderboard storage not connected")
  const operation = localQueue.then(async () => {
    let entries = await localEntries()
    if (entry) {
      entries = [...entries, entry].sort((a,b) => b.hits - a.hits).slice(0, 100)
      await mkdir(path.dirname(localFile), { recursive: true })
      await writeFile(localFile, JSON.stringify(entries), "utf8")
    }
    return { entries: entries.slice(0, 10), storage: "local" }
  })
  localQueue = operation.catch(() => {})
  return operation
}

export async function GET() {
  try { return reply(await leaderboard()) }
  catch { return reply({ error: "Leaderboard is temporarily unavailable." }, 503) }
}
export async function POST(request: Request) {
  let body
  try { body = await request.json() } catch { return reply({ error: "Invalid submission." }, 400) }
  // Input shape only; scores are casual and are not verified against gameplay.
  if (!body || typeof body.nickname !== "string" || !body.nickname.trim() || body.nickname.trim().length > 16 || !Number.isSafeInteger(body.hits) || body.hits < 0 || typeof body.accuracy !== "number" || !Number.isFinite(body.accuracy) || body.accuracy < 0 || body.accuracy > 100) {
    return reply({ error: "Enter a nickname of up to 16 characters." }, 400)
  }
  try {
    return reply(await leaderboard({ id: crypto.randomUUID(), nickname: body.nickname.trim(), hits: body.hits, accuracy: Math.round(body.accuracy), createdAt: new Date().toISOString() }))
  } catch { return reply({ error: "Couldn’t save your score. Try again." }, 503) }
}

