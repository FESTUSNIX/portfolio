import { Locales } from '@/i18nConfig'
import { Metadata } from 'next'
import { AboutMeSection } from './components/sections/AboutMe'
import { Hero } from './components/sections/Hero'
import { ProjectsSection } from './components/sections/Projects'
import { getDictionary } from './dictionaries'

export const metadata: Metadata = {
	title: 'Mateusz Hada'
}

export default async function Home({ params: { locale } }: { params: { locale: Locales } }) {
	const dict = await getDictionary(locale)

	return (
		<main className='grid-container min-h-screen overflow-x-hidden'>
			<Hero dict={dict} />

			<AboutMeSection />

			<ProjectsSection />

			<div className='h-screen'></div>
		</main>
	)
}
