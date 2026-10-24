# Spotify listening line

The homepage displays the currently playing track, linking to Spotify, or a quiet Spotify profile link when unavailable. It does not play music or fetch listening history.

## Connect locally

1. Register exactly `http://127.0.0.1:3000` as a redirect URI in the Spotify developer dashboard.
2. Stop the local Next.js server to free port 3000.
3. Run `node scripts/connect-spotify.mjs YOUR_CLIENT_ID` from this repository.
4. Open the printed Spotify authorization link and approve read-only access to currently playing content.
5. The helper validates OAuth state, exchanges the code using PKCE, and saves the client ID and refresh token to ignored `.env.local`. It never needs or prints a client secret.
6. Restart the portfolio server.

The callback is a temporary local server, not a publicly deployed authentication endpoint. It closes after authorization or after 15 minutes.

## Deployment

Add `SPOTIFY_CLIENT_ID` and `SPOTIFY_REFRESH_TOKEN` to the hosting provider's server environment, then redeploy. Keep these out of source control and `NEXT_PUBLIC_*` variables. PKCE tokens do not need `SPOTIFY_CLIENT_SECRET`; remove that variable when migrating from the old flow. Existing confidential-client tokens still work when their corresponding secret is provided.

Refresh tokens expire after six months; reconnect when needed. Development-mode apps require the app owner to have Premium, and the authorizing Spotify account must have app access. See [Spotify quota modes](https://developer.spotify.com/documentation/web-api/concepts/quota-modes) and [refreshing tokens](https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens).

## Behavior

- Polls every 45 seconds while the page is visible and refreshes when returning to it.
- Reuses the access token until shortly before expiry and caches successful playback results for 20 seconds.
- Distinguishes unavailable/authentication errors from genuine idle playback internally.
- Never returns access tokens, refresh tokens, API error bodies, or private playback metadata to the browser.

