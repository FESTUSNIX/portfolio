import { GridBackground } from '@/components/GridBackground'
import { SOCIAL_MEDIA_LINKS } from '@/constants/SOCIAL_MEDIA_LINKS'
import { contactInfo } from '@/constants/contactInfo'
import { ArrowDownLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { ContactForm } from './components/ContactForm'

type Props = {}

const ContactPage = (props: Props) => {
	const facebook = SOCIAL_MEDIA_LINKS.facebook
	const github = SOCIAL_MEDIA_LINKS.github
	const linkedin = SOCIAL_MEDIA_LINKS.linkedin
	const twitter = SOCIAL_MEDIA_LINKS.twitter

	return (
		<main className='grid-container mt-20 overflow-x-hidden'>
			<header className='my-24 flex h-max items-end justify-between gap-x-24'>
				<h1 className='max-w-lg font-heading text-6xl leading-none sm:text-7xl md:max-w-2xl md:text-8xl lg:text-9xl'>
					Get in touch
				</h1>

				<ArrowDownLeftIcon className='hidden size-16 shrink-0 sm:block md:size-20 lg:size-24' strokeLinecap='butt' />
			</header>

			<section>
				<h2 className='sr-only'>contact form</h2>

				<div className='ml-auto max-w-2xl lg:max-w-4xl'>
					<ContactForm />
				</div>
			</section>

			<section className='my-24 flex flex-col gap-4 lg:gap-6'>
				<h2 className='sr-only'>contact details</h2>
				<div className='flex items-center gap-2 lg:gap-4'>
					<SocialMediaPill href={facebook.href} label={facebook.name} />
					<SocialMediaPill href={github.href} label={github.name} />
					<div className='ml-8 hidden h-px w-full grow bg-border sm:block' />
				</div>
				<Link
					href={`mailto:${contactInfo.email}`}
					className='w-full rounded-full border border-foreground px-4 py-6 text-center text-2xl uppercase leading-none hover:underline sm:text-3xl md:text-4xl lg:px-16 lg:py-8 lg:text-5xl xl:text-6xl'>
					{contactInfo.email}
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
			className='shrink-0 rounded-full border border-border px-6 py-4 uppercase leading-none text-muted-foreground duration-300 hover:border-foreground hover:text-foreground sm:px-8 sm:text-lg md:text-xl lg:text-2xl xl:px-10 xl:py-6 xl:text-3xl'>
			{label}
		</Link>
	)
}