'use client'

import { NAV_LINKS } from '@/constants/NAV_LINKS'
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery'
import { useScrollBlock } from '@/hooks/useScrollBlock'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HamburgerIcon } from './HamburgerIcon'

const variants = {
	open: { x: 0 },
	closed: { x: '100%' }
}

export const MobileNavMenu = () => {
	const pathname = usePathname()
	const mdBreakpoint = useMediaQuery('(min-width: 640px)')
	const activeSegment = useSelectedLayoutSegment()

	const [[isOpen, animationState], setIsOpen] = useState<[boolean, 'closed' | 'open' | 'inProgress']>([false, 'closed'])
	const [lockScroll, unlockScroll] = useScrollBlock()

	const [isDesktop, setIsDesktop] = useState(false)

	const handleChange = (state: boolean, animation: 'closed' | 'open' | 'inProgress') => {
		if (state === isOpen && animation === animationState) return

		setIsOpen([state, animation])
	}

	useEffect(() => {
		isOpen && !isDesktop ? lockScroll() : unlockScroll()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen])

	useEffect(() => {
		setIsDesktop(mdBreakpoint)
		mdBreakpoint ? unlockScroll() : isOpen && lockScroll()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mdBreakpoint])

	useEffect(() => {
		handleChange(false, 'inProgress')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])

	if (isDesktop) return null

	return (
		<>
			<div className={'z-50 text-foreground md:hidden'}>
				<HamburgerIcon toggle={() => handleChange(!isOpen, 'inProgress')} toggled={isOpen} />
			</div>

			<motion.div
				className={cn(
					'fixed inset-0 z-40 flex items-center justify-center bg-secondary/75 text-foreground backdrop-blur-lg md:hidden',
					animationState === 'open' && 'visible',
					animationState === 'closed' && 'invisible hidden',
					!isOpen && 'hidden'
				)}
				initial={'closed'}
				animate={isOpen ? 'open' : 'closed'}
				onAnimationComplete={definition => {
					handleChange(definition === 'open', definition as 'closed' | 'open' | 'inProgress')
				}}
				variants={variants}
				transition={{ ease: 'easeInOut', duration: 0.3 }}>
				<div className='grid-container h-full p-8'>
					<div className='flex flex-col items-center justify-center'>
						<ul className='flex w-full flex-col items-center justify-center gap-8 text-center sm:items-start'>
							{NAV_LINKS.map(link => (
								<Link
									key={link.href}
									href={link.href}
									className={cn(
										'font-heading text-5xl uppercase duration-300 hover:underline active:scale-90 active:underline sm:text-6xl',
										`/${activeSegment ?? ''}` === link.href && 'text-primary'
									)}
									onClick={() => handleChange(false, 'inProgress')}>
									<span>{link.label}</span>
								</Link>
							))}
						</ul>
					</div>
				</div>
			</motion.div>
		</>
	)
}
