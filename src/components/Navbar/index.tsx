import { Dictionary } from '@/app/[locale]/dictionaries'
import { NAV_LINKS } from '@/constants/NAV_LINKS'
import { CONTACT_INFO } from '@/constants/CONTACT_INFO'
import { Locales } from '@/i18nConfig'
import { cn, getDateLocale } from '@/lib/utils'
import { format } from 'date-fns'
import Link from 'next/link'
import Logo from '../../../public/assets/logo.svg'
import LanguageChanger from '../LanguageChanger'
import { Magnetic } from '../Magnetic'
import { DynamicBg } from './components/DynamicBg'
import { MobileNavMenu } from './components/MobileNavMenu'

type Props = {
	dict: Dictionary
	locale: Locales
}

const Navbar = ({ dict, locale }: Props) => {
	return (
		<header
			className={cn(
				'grid-container fixed left-0 z-50 w-full border-b border-transparent px-0 py-4 duration-300',
				'has-[>.active]:border-border has-[>.active]:bg-background/20 has-[>.active]:mix-blend-difference has-[>.active]:backdrop-blur-sm has-[>.active]:backdrop-sepia-[25%]'
			)}>
			<DynamicBg />
			<nav className='relative flex items-center justify-between mix-blend-difference'>
				<div className='hidden items-center gap-6 lg:flex'>
					<Link href={`mailto:${CONTACT_INFO.email}`} className='group py-0.5 text-sm uppercase hover:underline'>
						<Magnetic as='p' strength={{ x: 0.1, y: 0.3 }}>
							<span className='transition-elastic-out block group-active:scale-90'>{CONTACT_INFO.email}</span>
						</Magnetic>
					</Link>
					<div className='flex items-center gap-1.5'>
						<div className='animate-blob-pulse size-2.5 rounded-full bg-[#3ADC71]' />
						<p className='text-sm uppercase'>
							{dict.navigation.availability.available}{' '}
							<span className='font-bold'>{format(new Date(), 'LLLL yyyy', { locale: getDateLocale(locale) })}</span>
						</p>
					</div>
					<LanguageChanger />
				</div>

				<Link
					href={'/'}
					className='group z-50 w-max lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2'>
					<Magnetic strength={{ x: 0.15 }}>
						<span className='sr-only'>{dict.navigation.links.home}</span>
						<Logo className='group-hover:rainbow-background h-6 w-auto fill-foreground [clip-path:url("#brand-logo-clip")] group-hover:fill-transparent' />
					</Magnetic>
				</Link>

				<MobileNavMenu dict={dict} locale={locale} />

				<ul className={'hidden items-center gap-6 sm:flex'}>
					{NAV_LINKS.map((link, i) => (
						<li key={link.href} className='group'>
							<Link
								href={link.href}
								className='border-foreground text-sm uppercase text-foreground hover:underline group-last:block group-last:rounded-full group-last:border'>
								<Magnetic strength={{ x: 0.1, y: 0.3 }} className='py-0.5 group-last:px-3 group-last:py-1'>
									<span className='transition-elastic-out block group-active:scale-90'>
										{dict.navigation.links[link.accessorKey as keyof typeof dict.navigation.links]}
									</span>
								</Magnetic>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}

export default Navbar
