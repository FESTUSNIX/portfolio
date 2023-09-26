'use client'

import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { Icons } from '../Icons'
import TypographyH2 from '../ui/Typography/H2'
import TypographyMuted from '../ui/Typography/Muted'
import { Skeleton } from '../ui/skeleton'

type Props = {}

const CurrentlyPlaying = (props: Props) => {
	const fetcher = (url: string) => fetch(url).then(r => r.json())
	let { data, isLoading } = useSWR('/api/spotify', fetcher)

	return (
		<div className='mt-auto'>
			{!isLoading && data?.isPlaying && <TypographyH2 className='mb-6'>Currently vibing to</TypographyH2>}

			{isLoading && <Skeleton className='mb-6 h-7 w-48' />}

			<Link
				target='_blank'
				rel='noopener noreferer'
				href={
					data?.isPlaying ? data.songUrl : 'https://open.spotify.com/user/wqhn4m6876x09gpqlyao47ffe?si=62d0e01777e0480c'
				}>
				<div className='relative flex w-full items-start gap-4 rounded-md border px-4 py-2.5'>
					{!isLoading &&
						(data?.isPlaying ? (
							<Image
								className='h-12 w-12 rounded-md shadow'
								src={data?.albumImageUrl}
								alt={data?.album}
								width={64}
								height={64}
							/>
						) : (
							<Icons.spotify className='mt-1' />
						))}

					{isLoading && <Skeleton className='h-12 w-12' />}

					<div className=''>
						<p className='font-bold'>{!isLoading && (data?.isPlaying ? data.title : 'Not Listening')}</p>
						<TypographyMuted className='text-sm'>
							{!isLoading && (data?.isPlaying ? data.artist : 'Spotify')}
						</TypographyMuted>

						{isLoading && (
							<>
								<Skeleton className='mb-2.5 mt-1 h-3.5 w-48 max-w-full' />
								<Skeleton className='h-3 w-32 max-w-full' />
							</>
						)}
					</div>

					{!isLoading && data?.isPlaying && <Icons.spotify className='absolute bottom-2.5 right-4 h-4 w-4' />}
				</div>
			</Link>
		</div>
	)
}

export default CurrentlyPlaying
