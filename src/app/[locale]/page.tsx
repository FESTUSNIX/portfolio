import { EmojiBoard } from '@/components/EmojiBoard'
import { Locales } from '@/i18nConfig'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { AboutMeSection } from './components/sections/AboutMe'
import { ContactCTASection } from './components/sections/ContactCTA'
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

			<AboutMeSection dict={dict} />

			<ProjectsSection dict={dict} />

			<TestimonialsSection dict={dict} />

			<ContactCTASection dict={dict} />

			<Suspense>
				<EmojiBoard />
			</Suspense>
		</main>
	)
}
