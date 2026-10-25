# Warm-up leaderboard

Completed 60-second rounds can submit a nickname, hits and accuracy. Scores are ranked by hits. Scores are casual: there is no gameplay verification or player authentication. Input checks only keep malformed records out of storage.

## Vercel

Connect a free Redis database to this portfolio project from Vercel Storage / Marketplace. Include Production and Development environments. The server supports the Redis integration's `REDIS_URL` directly using node-redis. Alternatively it supports Upstash REST variables:

- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- or `KV_REST_API_URL` and `KV_REST_API_TOKEN`

Keep the token server-side. Do not use `NEXT_PUBLIC_` names. Redeploy after connecting storage.

The Redis key is `portfolio:warmup:v1`. It retains the top 100 rounds and returns the top 10. A submission and leaderboard refresh use one atomic transaction.

## Local preview

Without Redis credentials, development uses `.next/cache/warmup-leaderboard.json`, labeled **Local preview** in the results. This is development data, not a shared production leaderboard. Deleting `.next` clears it. Production requires Redis and returns an unavailable message if disconnected.

To test shared storage locally, add the integration's URL and token to the ignored `.env.local` file and restart Next.js. Never commit the token.

Sources: https://vercel.com/marketplace/upstash/upstash-kv and https://upstash.com/docs/redis/features/restapi

