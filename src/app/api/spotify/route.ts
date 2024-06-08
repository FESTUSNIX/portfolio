import { getNowPlaying } from '@/lib/getNowPlaying'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
	try {
		const apiResponse = await getNowPlaying()

		if (apiResponse?.currently_playing_type !== 'track') {
			return new Response(JSON.stringify({ isPlaying: false }))
		}

		const data = {
			isPlaying: apiResponse.is_playing,
			title: apiResponse.item.name,
			album: apiResponse.item.album.name,
			artist: apiResponse.item.album.artists.map((artist: any) => artist.name).join(', '),
			albumImageUrl: apiResponse.item.album.images[0].url,
			songUrl: apiResponse.item.external_urls.spotify
		}

		return new Response(JSON.stringify(data))
	} catch (error) {
		return new Response('Something went wrong', { status: 500 })
	}
}
