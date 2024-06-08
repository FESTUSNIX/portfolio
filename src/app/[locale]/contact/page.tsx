import { GridBackground } from '@/components/GridBackground'
import { Magnetic } from '@/components/Magnetic'
import { CONTACT_INFO } from '@/constants/CONTACT_INFO'
import { SOCIAL_MEDIA_LINKS } from '@/constants/SOCIAL_MEDIA_LINKS'
import { Locales } from '@/i18nConfig'
import { cn } from '@/lib/utils'
import { ArrowDownLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { getDictionary } from '../dictionaries'
import { ContactForm } from './components/ContactForm'
import { Metadata } from 'next'

export async function generateMetadata({ params: { locale } }: { params: { locale: Locales } }): Promise<Metadata> {
	const {
		contact: { metadata }
	} = await getDictionary(locale)

	return {
		title: metadata.title,
		description: metadata.description
	}
}

const ContactPage = async ({ params: { locale } }: { params: { locale: Locales } }) => {
	const { contact: dict } = await getDictionary(locale)

	const facebook = SOCIAL_MEDIA_LINKS.facebook
	const github = SOCIAL_MEDIA_LINKS.github
	const linkedin = SOCIAL_MEDIA_LINKS.linkedin
	const twitter = SOCIAL_MEDIA_LINKS.twitter

	return (
		<main className='grid-container mt-20 overflow-x-hidden'>
			<header className='my-24 flex h-max items-end justify-between gap-x-24'>
				<h1
					className={cn(
						'max-w-screen-sm font-heading text-8xl uppercase leading-none sm:text-9xl md:max-w-screen-md md:text-10xl lg:text-12xl xl:max-w-none xl:text-[16rem]',
						locale === 'pl' && 'xl:text-[12rem]'
					)}>
					{dict.heading}
				</h1>

				<ArrowDownLeftIcon
					className='mb-[1.5%] hidden size-16 shrink-0 sm:block md:size-20 lg:size-24'
					strokeLinecap='butt'
				/>
			</header>

			<section>
				<h2 className='sr-only'>{dict.form.heading}</h2>

				<div className='ml-auto max-w-2xl lg:max-w-4xl'>
					<ContactForm dict={dict.form} />
				</div>
			</section>

			<section className='my-24 flex flex-col gap-4 lg:gap-6'>
				<h2 className='sr-only'>{dict.details.heading}</h2>
				<div className='flex items-center gap-2 lg:gap-4'>
					<SocialMediaPill href={facebook.href} label={facebook.name} />
					<SocialMediaPill href={github.href} label={github.name} />
					<div className='ml-8 hidden h-px w-full grow bg-border sm:block' />
				</div>
				<Link
					href={`mailto:${CONTACT_INFO.email}`}
					className='group w-full overflow-hidden rounded-full border border-foreground text-center'>
					<Magnetic
						as='p'
						strength={{ x: 0.05 }}
						className='block overflow-hidden rounded-full px-4 py-6 text-2xl uppercase leading-none hover:underline sm:text-3xl md:text-4xl lg:px-16 lg:py-8 lg:text-5xl xl:text-6xl'>
						<span className='transition-elastic-out block group-active:scale-90'>{CONTACT_INFO.email}</span>
					</Magnetic>
				</Link>
				<div className='flex items-center justify-end gap-2 lg:gap-4'>
					<div className='mr-8 hidden h-px w-full grow bg-border sm:block' />
					<SocialMediaPill href={twitter.href} label={twitter.name} />
					<SocialMediaPill href={linkedin.href} label={linkedin.name} />
				</div>
			</section>

			<GridBackground className='container-fill top-0' />
		</main>
	)
}

export default ContactPage

const SocialMediaPill = ({ href, label }: { href: string; label: string }) => {
	return (
		<Link
			href={href}
			target='_blank'
			rel='noopener'
			className='group shrink-0 rounded-full border border-border text-muted-foreground duration-300 hover:border-foreground hover:text-foreground hover:underline'>
			<Magnetic
				as='p'
				strength={{ x: 0.1 }}
				className='block px-6 py-4 uppercase leading-none sm:px-8 sm:text-lg md:text-xl lg:text-2xl xl:px-10 xl:py-6 xl:text-3xl'>
				<span className='transition-elastic-out block group-active:scale-90'>{label}</span>
			</Magnetic>
		</Link>
	)
}
