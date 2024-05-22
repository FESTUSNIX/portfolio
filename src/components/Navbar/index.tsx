'use client'

import { NAV_LINKS } from '@/constants/NAV_LINKS'
import { contactInfo } from '@/constants/contactInfo'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { MobileNavMenu } from './components/MobileNavMenu'

const Navbar = () => {
	const { y } = useScrollPosition()

	return (
		<header
			className={cn(
				'grid-container fixed left-0 z-50 mt-2 w-full border-b border-transparent px-0 py-4 duration-300',
				y > 10 && 'mt-0 border-border bg-background/20 mix-blend-difference backdrop-blur-sm backdrop-sepia-[25%]'
			)}>
			<nav className='relative flex items-center justify-between mix-blend-difference'>
				<div className='hidden items-center gap-6 lg:flex'>
					<Link href={`mailto:${contactInfo.email}`} className='text-sm uppercase hover:underline'>
						{contactInfo.email}
					</Link>

					<div className='flex items-center gap-1.5'>
						<div className='animate-blob-pulse size-2.5 rounded-full bg-[#3ADC71]' />
						<p className='text-sm uppercase'>
							available <span className='font-bold'>may 2024</span>
						</p>
					</div>
				</div>

				<Link
					href={'/'}
					className='z-50 mt-1 w-max font-heading text-2xl leading-none lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2'>
					HADA
				</Link>

				<MobileNavMenu />

				<ul className={'hidden items-center gap-6 sm:flex'}>
					{NAV_LINKS.map((link, i) => (
						<li key={link.href} className='group'>
							<Link
								href={link.href}
								className='border-foreground py-0.5 text-sm uppercase text-foreground hover:underline group-last:block group-last:rounded-full group-last:border group-last:px-3 group-last:py-1'>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}

export default Navbar
