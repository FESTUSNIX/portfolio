import querystring from 'querystring'

const {
	SPOTIFY_CLIENT_ID: client_id,
	SPOTIFY_CLIENT_SECRET: client_secret,
	SPOTIFY_REFRESH_TOKEN: refresh_token
} = process.env

const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

type SpotifyData = {
	is_playing: boolean
	item: {
		name: string
		album: {
			name: string
			artists: Array<{ name: string }>
			images: [{ url: string }]
		}
		external_urls: {
			spotify: string
		}
	}
	currently_playing_type: string
}

const getAccessToken = async () => {
	const res = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${token}`
		},
		body: querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token
		}),
		cache: 'no-cache'
	}).then(res => res.json())

	return res.access_token
}

export const getNowPlaying = async () => {
	const access_token = await getAccessToken()

	return await fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		cache: 'no-cache'
	}).then(res => res.json())
}
