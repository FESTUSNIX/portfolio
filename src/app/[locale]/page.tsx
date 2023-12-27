import CurrentlyPlaying from '@/components/CurrentlyPlaying'
import LanguageChanger from '@/components/LanguageChanger'
import TypographyH2 from '@/components/ui/Typography/H2'
import { contactInfo } from '@/constants/contactInfo'
import { socialLinks } from '@/constants/socialLinks'
import { Locales } from '@/i18nConfig'
import Link from 'next/link'
import { StarParticles } from '../../components/StarParticles'
import { Projects } from './components/Projects'
import { getDictionary } from './dictionaries'

export default async function Home({ params: { locale } }: { params: { locale: Locales } }) {
	const dict = await getDictionary(locale)

	return (
		<main className='wrapper flex min-h-screen flex-col py-12 md:py-24'>
			<header className='mb-12'>
				<div className='flex justify-between'>
					<div className='pr-8'>
						<h1 className='font-heading text-5xl font-black uppercase tracking-tight'>Mateusz Hada</h1>
						<h2 className='text-muted-foreground'>aka Festus(nix)</h2>
					</div>

					<div className='flex flex-col gap-1'>
						<LanguageChanger />
					</div>
				</div>

				<p className='mt-8 text-muted-foreground'>{dict.description}</p>
			</header>

			<Projects translations={dict.projects} />

			<section className='my-auto py-12'>
				<TypographyH2 className='mb-6'>
					{dict.contactHeader.prefix}{' '}
					<Link href={`mailto:${contactInfo.email}`} className='underline'>
						{contactInfo.email}
					</Link>{' '}
					{dict.contactHeader.sufix}
				</TypographyH2>

				<div className='flex flex-col gap-2'>
					{socialLinks.map((link, i) => (
						<Link
							key={`link-${i}`}
							href={link.href}
							target='_blank'
							rel='noopener'
							className='relative flex items-center gap-4 overflow-hidden rounded-md border px-4 py-2 text-xl [clip-path:inset(0)] hover:underline'>
							<link.Icon className='h-5 w-5' />
							<span>{link.name}</span>

							<div className='absolute inset-0 h-full w-full [clip-path:inset(0)]'>
								<StarParticles className='fixed' />
							</div>
						</Link>
					))}
				</div>
			</section>

			<CurrentlyPlaying dict={{ listening: dict.spotify.listening, notListening: dict.spotify.notListening }} />
		</main>
	)
}
