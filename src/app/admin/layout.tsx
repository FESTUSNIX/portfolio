import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/config/site'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'
import { Oswald } from 'next/font/google'
import localFont from 'next/font/local'
import { redirect } from 'next/navigation'
import '../globals.css'
import Sidebar from './components/Sidebar'

const body = Oswald({ subsets: ['latin-ext'], variable: '--font-body' })
const heading = localFont({
	src: '../../../public/fonts/Humane-Black.otf',
	variable: '--font-heading',
	display: 'swap'
})

export async function generateMetadata({ params: {} }: { params: {} }): Promise<Metadata> {
	return {
		title: {
			default: 'Admin',
			template: `%s | Admin ${siteConfig.name}`
		},
		robots: {
			index: false,
			follow: false
		}
	}
}

export default async function AdminLayout({ children, params: {} }: { children: React.ReactNode; params: {} }) {
	const supabase = createClient()

	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (!user?.id) {
		return redirect('/login')
	}

	return (
		<html lang={'en'} suppressHydrationWarning>
			<body className={`${body.variable} ${heading.variable}`}>
				<Providers locale={'en'}>
					<div className='flex flex-col md:flex-row'>
						<Sidebar />
						<div className='h-20 w-full md:h-auto md:w-16'></div>

						<main className='grid-container mt-12 w-full'>{children}</main>
					</div>
				</Providers>

				<Toaster />
			</body>
		</html>
	)
}
