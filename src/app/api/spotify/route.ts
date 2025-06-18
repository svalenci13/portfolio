const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')

async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  })

  return response.json()
}

export async function GET() {
  try {
    const tokenResponse = await getAccessToken()
    const { access_token } = tokenResponse
    
    console.log('Access token obtained:', access_token ? 'Yes' : 'No')

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    console.log('Spotify API response status:', response.status)

    if (response.status === 204) {
      console.log('No content - user not playing anything')
      return Response.json({ isPlaying: false, debug: 'No content from Spotify' })
    }

    if (response.status > 400) {
      console.log('Error response from Spotify:', response.status)
      return Response.json({ isPlaying: false, debug: `Error: ${response.status}` })
    }

    const song = await response.json()
    console.log('Spotify API response:', JSON.stringify(song, null, 2))

    if (!song.item) {
      console.log('No song item in response')
      return Response.json({ isPlaying: false, debug: 'No song item' })
    }

    const isPlaying = song.is_playing
    const title = song.item.name
    const artist = song.item.artists.map((_artist: { name: string }) => _artist.name).join(', ')
    const album = song.item.album.name
    const albumImageUrl = song.item.album.images[0]?.url
    const songUrl = song.item.external_urls.spotify

    console.log('Song found:', { title, artist, isPlaying })

    return Response.json({
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
    })
  } catch (error) {
    console.error('Error fetching Spotify data:', error)
    return Response.json({ isPlaying: false, debug: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` })
  }
} 