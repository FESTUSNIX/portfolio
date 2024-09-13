import { Footer } from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/sonner'
import { Locales, i18nConfig } from '@/i18nConfig'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import { Oswald } from 'next/font/google'
import localFont from 'next/font/local'
import '../globals.css'
import { getDictionary } from './dictionaries'
import { siteConfig } from '@/config/site'

const body = Oswald({ subsets: ['latin-ext'], variable: '--font-body' })
const heading = localFont({
	src: '../../../public/fonts/Humane-Black.otf',
	variable: '--font-heading',
	display: 'swap'
})

export async function generateMetadata({ params: { locale } }: { params: { locale: Locales } }): Promise<Metadata> {
	const {
		openGraph: { description, title }
	} = await getDictionary(locale)

	return {
		title: {
			default: siteConfig.name,
			template: `%s | ${siteConfig.name}`
		},
		metadataBase: new URL(siteConfig.url),
		description: description,
		keywords: [
			'web developer',
			'strony internetowe',
			'website designer',
			'next.js portfolio',
			'web developer portfolio'
		],
		authors: [
			{
				name: 'Mateusz Hada',
				url: siteConfig.url
			}
		],
		creator: 'Mateusz Hada',
		openGraph: {
			title: title,
			description: description,
			url: siteConfig.url,
			type: 'website',
			locale: locale === 'en' ? 'en_US' : 'pl'
		},
		twitter: {
			title: title,
			description: description,
			card: 'summary_large_image',
			images: [`${siteConfig.url}/opengraph-image.jpg`],
			creator: '@Festusnix'
		}
	}
}

export const viewport: Viewport = {
	colorScheme: 'dark light',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' }
	]
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
		<html lang={locale} suppressHydrationWarning>
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
