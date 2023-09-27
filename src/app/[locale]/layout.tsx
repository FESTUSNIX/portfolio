import { i18nConfig } from '@/i18nConfig'
import type { Metadata } from 'next'
import { Montserrat, Oswald } from 'next/font/google'
import '../globals.css'
import Providers from '@/components/Providers'

const oswald = Oswald({ subsets: ['latin'], variable: '--font-heading' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
	title: 'Mateusz Hada',
	description: 'Frontend developer in your area that wants to work with you'
}

export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
}

export default function RootLayout({
	children,
	params: { locale }
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	return (
		<html lang={locale} className='dark'>
			<body className={`${oswald.variable} ${montserrat.variable}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
