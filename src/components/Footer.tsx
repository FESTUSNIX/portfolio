import { SOCIAL_MEDIA_LINKS } from '@/constants/SOCIAL_MEDIA_LINKS'
import Link from 'next/link'
import { Magnetic } from './Magnetic'

type Props = {}

export const Footer = (props: Props) => {
	const year = new Date().getFullYear() ?? 2024

	return (
		<footer className='grid-container mt-auto py-6 md:py-8'>
			<div className='flex flex-row flex-wrap-reverse justify-between gap-x-16 gap-y-6'>
				<p className='uppercase'>© Mateusz Hada {year}</p>

				<ul className='flex flex-wrap-reverse items-center gap-x-4'>
					{Object.values(SOCIAL_MEDIA_LINKS).map(link => (
						<li key={link.href}>
							<Magnetic>
								<Link href={link.href} target='_blank' rel='noopener' className='py-1 uppercase hover:underline'>
									{link.name}
								</Link>
							</Magnetic>
						</li>
					))}
				</ul>
			</div>
		</footer>
	)
}
