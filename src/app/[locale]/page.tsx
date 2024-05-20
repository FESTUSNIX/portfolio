import { Locales } from '@/i18nConfig'
import { Metadata } from 'next'
import { getDictionary } from './dictionaries'
import { Hero } from './components/sections/Hero'

export const metadata: Metadata = {
	title: 'Mateusz Hada'
}

export default async function Home({ params: { locale } }: { params: { locale: Locales } }) {
	const dict = await getDictionary(locale)

	return (
		<main className='grid-container min-h-screen overflow-x-hidden'>
			<Hero dict={dict} />

			<div className='h-screen'></div>
		</main>
	)
}
