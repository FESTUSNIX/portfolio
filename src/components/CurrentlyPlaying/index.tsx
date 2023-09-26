'use client'

import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { Icons } from '../Icons'
import TypographyH3 from '../ui/Typography/H3'
import TypographyMuted from '../ui/Typography/Muted'

type Props = {}

const CurrentlyPlaying = (props: Props) => {
	const fetcher = (url: string) => fetch(url).then(r => r.json())
	const { data } = useSWR('/api/spotify', fetcher)

	return (
		<div className='mt-auto'>
			{data?.isPlaying && (
				<div className='mb-2.5 flex items-center gap-2'>
					<Icons.spotify className='h-4 w-4' />
					<TypographyH3>Currently vibing to</TypographyH3>
				</div>
			)}

			<Link
				target='_blank'
				rel='noopener noreferer'
				href={
					data?.isPlaying ? data.songUrl : 'https://open.spotify.com/user/wqhn4m6876x09gpqlyao47ffe?si=62d0e01777e0480c'
				}>
				<div className='flex w-full items-start gap-4 rounded-md border px-4 py-2.5'>
					{data?.isPlaying ? (
						<Image
							className='h-12 w-12 rounded-md shadow'
							src={data?.albumImageUrl}
							alt={data?.album}
							width={64}
							height={64}
						/>
					) : (
						<Icons.spotify className='mt-1' />
					)}

					<div className=''>
						<p className='font-bold'>{data?.isPlaying ? data.title : 'Not Listening'}</p>
						<TypographyMuted className='text-sm'>{data?.isPlaying ? data.artist : 'Spotify'}</TypographyMuted>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default CurrentlyPlaying
