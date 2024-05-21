import { Locales } from '@/i18nConfig'
import { Metadata } from 'next'
import { AboutMeSection } from './components/sections/AboutMe'
import { HeroSection } from './components/sections/Hero'
import { ProjectsSection } from './components/sections/Projects'
import { TestimonialsSection } from './components/sections/Testimonials'
import { getDictionary } from './dictionaries'

export const metadata: Metadata = {
	title: 'Mateusz Hada'
}

export default async function Home({ params: { locale } }: { params: { locale: Locales } }) {
	const dict = await getDictionary(locale)

	return (
		<main className='grid-container min-h-screen overflow-x-hidden'>
			<HeroSection dict={dict} />

			<AboutMeSection />

			<ProjectsSection />

			<TestimonialsSection />

			<div className='h-screen'></div>
		</main>
	)
}
