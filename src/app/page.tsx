import CurrentlyPlaying from '@/components/CurrentlyPlaying'
import TypographyH2 from '@/components/ui/Typography/H2'
import { contactInfo } from '@/constants/contactInfo'
import { socialLinks } from '@/constants/socialLinks'
import Link from 'next/link'

export default async function Home() {
	return (
		<main className='wrapper flex min-h-screen flex-col py-12 md:py-24 '>
			<div>
				<h1 className='font-heading text-5xl font-black uppercase tracking-tight'>Mateusz Hada</h1>
				<h2 className='text-muted-foreground'>aka Festus(nix)</h2>
			</div>

			<div className='my-auto py-24'>
				<TypographyH2 className='mb-6'>
					Contact me at{' '}
					<Link href={`mailto:${contactInfo.email}`} className='underline'>
						{contactInfo.email}
					</Link>{' '}
					or on
				</TypographyH2>

				<div className='flex flex-col gap-2'>
					{socialLinks.map((link, i) => (
						<Link
							key={`link-${i}`}
							href={link.href}
							target='_blank'
							rel='noopener'
							className='flex items-center gap-4 rounded-md border px-4 py-2 text-xl hover:underline'>
							<link.Icon className='h-5 w-5' />
							<span>{link.name}</span>
						</Link>
					))}
				</div>
			</div>

			<CurrentlyPlaying />
		</main>
	)
}
