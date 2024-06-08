'use client'

import { Locales, i18nConfig } from '@/i18nConfig'
import { useTranslation } from '@/lib/translations'
import { useQuery } from '@tanstack/react-query'
import { useCurrentLocale } from 'next-i18n-router/client'
import Image from 'next/image'
import { Magnetic } from './Magnetic'

type Props = {}

type SpotifyData = {
	isPlaying: boolean
	title: string
	album: string
	artist: string
	albumImageUrl: string
	songUrl: string
}

export const CurrentlyPlaying = (props: Props) => {
	const locale = useCurrentLocale(i18nConfig)
	const { t } = useTranslation((locale ?? 'en') as Locales)

	const { data, isLoading } = useQuery<SpotifyData>({
		queryKey: ['spotify-currently-playing'],
		queryFn: async () => {
			const res = await fetch('/api/spotify', {
				headers: {
					'Content-Type': 'application/json'
				},
				cache: 'no-cache'
			})

			return res.json()
		},
		refetchInterval: 20000,
		refetchOnWindowFocus: 'always'
	})

	if (!data?.isPlaying || isLoading) return null

	return (
		<div className='flex items-center gap-2 text-sm uppercase'>
			<span className='order-1'>{t('currentlyPlaying.listeningTo')}</span>

			<p className='order-3'>
				<span className='max-w-64 truncate'>{data.title} </span>
				<span className='text-muted-foreground'>
					{t('currentlyPlaying.by')} {data.artist}
				</span>
			</p>

			{data.isPlaying && (
				<div className='relative order-2 size-5 origin-center'>
					<span className='sr-only'>{t('currentlyPlaying.on')}</span>
					<Magnetic className='size-full overflow-visible'>
						<div className='transition-elastic-out group absolute size-full origin-center overflow-hidden rounded-full hover:scale-[4]'>
							<Image
								src={data?.albumImageUrl}
								alt={data?.album}
								width={100}
								height={100}
								className='size-full object-cover [animation:spin_8s_linear_infinite] [clip-path:url(#doughnut-path)] group-hover:paused'
							/>
						</div>
					</Magnetic>
				</div>
			)}

			<svg height='0' width='0' aria-hidden className='sr-only'>
				<clipPath id='doughnut-path' clipPathUnits='objectBoundingBox' transform='scale(0.0225, 0.0225)'>
					<path
						d='M0,22.014c0,12.158,9.856,22.014,22.014,22.014c12.156,0,22.014-9.856,22.014-22.014
                        C44.028,9.857,34.171,0,22.014,0C9.856,0.001,0,9.857,0,22.014z M27.544,22.014c0,3.055-2.476,5.53-5.53,5.53
                        c-3.054,0-5.53-2.476-5.53-5.53s2.476-5.529,5.53-5.529C25.068,16.485,27.544,18.958,27.544,22.014z'
					/>
				</clipPath>
			</svg>
		</div>
	)
}
