import { StarParticles } from '@/components/StarParticles'
import TypographyH2 from '@/components/ui/Typography/H2'
import { contactInfo } from '@/constants/contactInfo'
import { socialLinks } from '@/constants/socialLinks'
import Link from 'next/link'
import React from 'react'

type Props = {
	translations: {
		contactHeader: {
			prefix: string
			sufix: string
		}
	}
}

export const SocialMedia = ({ translations }: Props) => {
	return (
		<section className='my-auto py-12'>
			<TypographyH2 className='mb-6'>
				{translations.contactHeader.prefix}{' '}
				<Link href={`mailto:${contactInfo.email}`} className='underline'>
					{contactInfo.email}
				</Link>{' '}
				{translations.contactHeader.sufix}
			</TypographyH2>

			<div className='flex flex-col gap-2'>
				{socialLinks.map((link, i) => (
					<Link
						key={`link-${i}`}
						href={link.href}
						target='_blank'
						rel='noopener'
						className='relative flex items-center gap-4 overflow-hidden rounded-md border px-4 py-2 text-xl [clip-path:inset(0)] hover:underline'>
						<link.Icon className='h-5 w-5' />
						<span>{link.name}</span>

						<div className='absolute inset-0 h-full w-full [clip-path:inset(0)]'>
							<StarParticles className='fixed' />
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}
