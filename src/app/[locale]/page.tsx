import CurrentlyPlaying from '@/components/CurrentlyPlaying'
import LanguageChanger from '@/components/LanguageChanger'
import { Locales } from '@/i18nConfig'
import { Projects } from './components/Projects'
import { SocialMedia } from './components/SocialMedia'
import { getDictionary } from './dictionaries'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Mateusz Hada'
}

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

			<SocialMedia translations={dict} />

			<CurrentlyPlaying dict={{ listening: dict.spotify.listening, notListening: dict.spotify.notListening }} />
		</main>
	)
}
