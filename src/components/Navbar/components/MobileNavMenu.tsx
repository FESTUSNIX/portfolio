'use client'

import { Dictionary } from '@/app/[locale]/dictionaries'
import { Portal } from '@/components/Portal'
import { NAV_LINKS } from '@/constants/NAV_LINKS'
import { SOCIAL_MEDIA_LINKS } from '@/constants/SOCIAL_MEDIA_LINKS'
import { CONTACT_INFO } from '@/constants/CONTACT_INFO'
import { useScrollBlock } from '@/hooks/useScrollBlock'
import { Locales } from '@/i18nConfig'
import { cn, getDateLocale } from '@/lib/utils'
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { useEffect, useState } from 'react'
import FocusLock from 'react-focus-lock'
import { HamburgerIcon } from './HamburgerIcon'

const variants = {
	open: { x: 0 },
	closed: { x: '100%' }
}

export const MobileNavMenu = ({ dict, locale }: { dict: Dictionary; locale: Locales }) => {
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
			<FocusLock disabled={!isOpen || isDesktop} group='navbar'>
				<div className={'z-50 text-foreground md:hidden'}>
					<HamburgerIcon toggle={() => handleChange(!isOpen, 'inProgress')} toggled={isOpen} />
				</div>
			</FocusLock>
			<Portal>
				<motion.div
					className={cn(
						'fixed inset-0 z-40 flex h-screen items-center justify-center bg-background/40 text-foreground mix-blend-difference backdrop-blur-3xl backdrop-sepia-[20%] md:hidden',
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
					<FocusLock disabled={!isOpen || isDesktop} group='navbar' className='h-full pt-20'>
						<div className='grid-container h-full'>
							<div className='flex w-full max-w-sm flex-col justify-between gap-y-12 justify-self-center'>
								<div className='space-y-2 pt-4'>
									<Link
										href={`mailto:${CONTACT_INFO.email}`}
										className='flex items-center gap-4 text-lg uppercase hover:underline'>
										<span className='shrink-0'>{CONTACT_INFO.email}</span>
										<div className='h-px w-full bg-foreground' />
									</Link>

									<div className='flex items-center gap-4'>
										<div className='h-px w-full bg-foreground' />
										<div className='flex shrink-0 items-center gap-2'>
											<div className='animate-blob-pulse size-3 rounded-full bg-[#3ADC71]' />
											<p className='text-lg uppercase'>
												{dict.navigation.availability.available}{' '}
												<span className='font-bold'>
													{format(new Date(), 'LLLL yyyy', { locale: getDateLocale(locale) })}
												</span>
											</p>
										</div>
									</div>
								</div>

								<ul className='-mt-16 flex w-full flex-col gap-8'>
									{[{ accessorKey: 'home', href: '/' }, ...NAV_LINKS].map(link => (
										<Link
											key={link.href}
											href={link.href}
											className={cn(
												'text-stroke-foreground flex items-center gap-4 text-5xl uppercase duration-300 even:flex-row-reverse even:text-end hover:underline sm:text-6xl',
												`/${activeSegment ?? ''}` === link.href && 'underline'
											)}
											onClick={() => handleChange(false, 'inProgress')}>
											<div className='h-px w-full bg-foreground' />
											<span className='shrink-0'>
												{dict.navigation.links[link.accessorKey as keyof typeof dict.navigation.links]}
											</span>
										</Link>
									))}
								</ul>

								<ul className='flex flex-wrap-reverse items-center justify-center gap-x-4 pb-8'>
									{Object.values(SOCIAL_MEDIA_LINKS).map(link => (
										<li key={link.href}>
											<Link href={link.href} target='_blank' rel='noopener' className='uppercase hover:underline'>
												{link.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</FocusLock>
				</motion.div>
			</Portal>
		</>
	)
}
