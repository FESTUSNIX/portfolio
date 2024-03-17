import Providers from '@/components/Providers'
import { Locales, i18nConfig } from '@/i18nConfig'
import type { Metadata } from 'next'
import { Montserrat, Oswald } from 'next/font/google'
import '../globals.css'
import { getDictionary } from './dictionaries'
import { Analytics } from '@vercel/analytics/react'

const oswald = Oswald({ subsets: ['latin-ext'], variable: '--font-heading' })
const montserrat = Montserrat({ subsets: ['latin-ext'], variable: '--font-body' })

export async function generateMetadata({ params: { locale } }: { params: { locale: Locales } }): Promise<Metadata> {
	const {
		pageMeta: { description, title }
	} = await getDictionary(locale)

	return {
		title: {
			default: 'Mateusz Hada',
			template: '%s | Web Developer'
		},
		metadataBase: new URL('https://mateuszhada.com'),
		description: description,
		openGraph: {
			title: title,
			description: description,
			url: 'https://mateuszhada.com',
			type: 'website'
		},
		twitter: {
			title: title,
			description: description
		}
	}
}

export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
}

export default function RootLayout({
	children,
	params: { locale }
}: {
	children: React.ReactNode
	params: { locale: Locales }
}) {
	return (
		<html lang={locale} className='dark'>
			<body className={`${oswald.variable} ${montserrat.variable}`}>
				<Providers>{children}</Providers>
				<Analytics />
			</body>
		</html>
	)
}
