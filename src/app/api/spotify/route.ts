import { getNowPlaying } from '@/lib/getNowPlaying'
import { NextRequest } from 'next/server'

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
