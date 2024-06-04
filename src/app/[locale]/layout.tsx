import { Footer } from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/sonner'
import { Locales, i18nConfig } from '@/i18nConfig'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Oswald } from 'next/font/google'
import localFont from 'next/font/local'
import '../globals.css'
import { getDictionary } from './dictionaries'

const body = Oswald({ subsets: ['latin-ext'], variable: '--font-body' })
const heading = localFont({
	src: '../../../public/fonts/Humane-Black.otf',
	variable: '--font-heading',
	display: 'swap'
})

export async function generateMetadata({ params: { locale } }: { params: { locale: Locales } }): Promise<Metadata> {
	const {
		pageMeta: { description, title }
	} = await getDictionary(locale)

	return {
		title: {
			default: 'Mateusz Hada',
			template: '%s | Mateusz Hada'
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

export default async function RootLayout({
	children,
	params: { locale }
}: {
	children: React.ReactNode
	params: { locale: Locales }
}) {
	const dict = await getDictionary(locale)

	return (
		<html lang={locale}>
			<body className={`${body.variable} ${heading.variable}`}>
				<Providers locale={locale}>
					<Navbar locale={locale} dict={dict} />
					{children}
					<Footer />
				</Providers>

				<Toaster />
				<Analytics />
			</body>
		</html>
	)
}
