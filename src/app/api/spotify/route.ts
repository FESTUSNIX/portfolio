import axios from 'axios'
import { NextRequest } from 'next/server'
import querystring from 'querystring'

const {
	SPOTIFY_CLIENT_ID: client_id,
	SPOTIFY_CLIENT_SECRET: client_secret,
	SPOTIFY_REFRESH_TOKEN: refresh_token
} = process.env

const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

interface SpotifyData {
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
	const res = await axios.post<{ access_token: string }>(
		TOKEN_ENDPOINT,
		querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token
		}),
		{
			headers: {
				Authorization: `Basic ${token}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
	)

	return res.data.access_token
}

export const getNowPlaying = async () => {
	const access_token = await getAccessToken()

	return axios.get<SpotifyData>(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	})
}

export async function GET(req: NextRequest) {
	try {
		const apiResponse = await getNowPlaying()

		if (
			apiResponse.status === 204 ||
			apiResponse.status > 400 ||
			apiResponse?.data?.currently_playing_type !== 'track'
		) {
			return new Response(JSON.stringify({ isPlaying: false }))
		}

		const data = {
			isPlaying: apiResponse.data.is_playing,
			title: apiResponse.data.item.name,
			album: apiResponse.data.item.album.name,
			artist: apiResponse.data.item.album.artists.map(artist => artist.name).join(', '),
			albumImageUrl: apiResponse.data.item.album.images[0].url,
			songUrl: apiResponse.data.item.external_urls.spotify
		}

		return new Response(JSON.stringify(data))
	} catch (error) {
		return new Response('Something went wrong', { status: 500 })
	}
}
