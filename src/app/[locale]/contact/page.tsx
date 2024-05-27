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
				<h1 className='max-w-2xl font-heading text-9xl leading-none'>Get in touch</h1>

				<ArrowDownLeftIcon className='size-24' strokeLinecap='butt' />
			</header>

			<section className=''>
				<h2 className='sr-only'>contact form</h2>

				<div className='ml-auto max-w-4xl'>
					<ContactForm />
				</div>
			</section>

			<section className='my-24 flex flex-col gap-6'>
				<h2 className='sr-only'>contact details</h2>
				<div className='flex items-center gap-4'>
					<SocialMediaPill href={facebook.href} label={facebook.name} />
					<SocialMediaPill href={github.href} label={github.name} />
					<div className='ml-8 h-px w-full grow bg-border' />
				</div>
				<Link
					href={`mailto:${contactInfo.email}`}
					className='w-full rounded-full border border-foreground px-16 py-8 text-center text-6xl uppercase leading-none hover:underline'>
					{contactInfo.email}
				</Link>
				<div className='flex items-center gap-4'>
					<div className='mr-8 h-px w-full grow bg-border' />
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
			className='shrink-0 rounded-full border border-border px-8 py-6 text-3xl uppercase leading-none text-muted-foreground duration-300 hover:border-foreground hover:text-foreground'>
			{label}
		</Link>
	)
}
