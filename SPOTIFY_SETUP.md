# Spotify Integration Setup

To enable the "Currently Listening" Spotify feature, you'll need to set up Spotify API credentials.

## Important: Spotify Redirect URI Requirements

According to [Spotify's documentation](https://developer.spotify.com/documentation/web-api/concepts/redirect_uri), you must follow these rules:

- ✅ Use HTTPS for production redirect URIs
- ✅ For local development, use explicit IPv4 (`http://127.0.0.1:PORT`) or IPv6 (`http://[::1]:PORT`)
- ❌ `localhost` is NOT allowed as a redirect URI
- ✅ You can register multiple redirect URIs for the same app

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Click "Create an App"
3. Fill in the details:
   - App name: "Portfolio Website"
   - App description: "Personal website Spotify integration"
4. Set the Redirect URIs to:
   - For local development: `http://127.0.0.1:3000`
   - For production: `https://yourdomain.com` (your actual website URL)
5. Save your `Client ID` and `Client Secret`

## Step 2: Get a Refresh Token

You'll need to get a refresh token using the authorization code flow. Here's a simple way:

1. Replace `YOUR_CLIENT_ID` in this URL and visit it:
```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://127.0.0.1:3000&scope=user-read-currently-playing
```

2. After authorizing, you'll be redirected to `http://127.0.0.1:3000/?code=AUTHORIZATION_CODE`
3. Copy the `code` parameter from the URL

4. Exchange the code for a refresh token using this curl command (replace the values):
```bash
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=http://127.0.0.1:3000&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET"
```

5. The response will include a `refresh_token` - save this!

## Step 3: Environment Variables

Create a `.env.local` file in your project root with:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

## Step 4: Test

Start your development server and the Spotify integration should work! The component will:
- Show a loading state initially
- Display "Not currently listening" if you're not playing music
- Show the current track with album art, title, and artist if you are playing music
- Update automatically every 30 seconds

## Features

- ✅ Real-time currently playing track
- ✅ Album artwork display
- ✅ Clickable song links to Spotify
- ✅ Loading and empty states
- ✅ Auto-refresh every 30 seconds
- ✅ Graceful error handling 