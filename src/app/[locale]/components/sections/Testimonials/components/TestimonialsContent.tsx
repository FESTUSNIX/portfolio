'use client'

import { useLocaleContext } from '@/components/LocaleProvider'
import { Testimonial } from '@/constants/TESTIMONIALS'
import { useTranslation } from '@/lib/translations'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { AvatarGroup } from './AvatarGroup'

type Props = {
	testimonials: Testimonial[]
}

export const TestimonialsContent = ({ testimonials }: Props) => {
	const locale = useLocaleContext()
	const { t } = useTranslation(locale)

	const [index, setIndex] = useState(0)

	const testimonial = testimonials[index]

	const handleNext = () => setIndex((index + 1) % testimonials.length)
	const handlePrevious = () => setIndex((index - 1 + testimonials.length) % testimonials.length)

	return (
		<div className='relative py-32'>
			<div className='flex flex-col items-center gap-6 text-center md:gap-8'>
				<div className='flex flex-col items-center'>
					<div className='mb-4 size-16 overflow-hidden rounded-full border bg-secondary md:size-20'>
						<Image
							src={testimonial.image}
							alt={testimonial.name}
							width={64}
							height={64}
							className='pointer-events-none size-full object-cover'
						/>
					</div>
					<h3 className='text-xl leading-none lg:text-2xl'>{testimonial.name}</h3>
					{testimonial.role && (
						<p className='text-sm font-light text-muted-foreground lg:text-base'>{testimonial.role}</p>
					)}
				</div>

				<p className='min-h-24 max-w-sm text-pretty text-lg font-light sm:text-xl md:max-w-md lg:max-w-lg lg:text-2xl'>
					{testimonial.quote}
				</p>

				<div className='flex items-center gap-1 text-muted-foreground max-sm:-mt-4'>
					<button onClick={handlePrevious} className='p-2'>
						<span className='sr-only'>{t('global.previous')}</span>
						<ChevronLeft className='size-5' />
					</button>
					<span className='font-light'>
						{index < 9 ? `0${index + 1}` : index + 1}/{testimonials.length}
					</span>
					<button onClick={handleNext} className='p-2'>
						<span className='sr-only'>{t('global.next')}</span>
						<ChevronRight className='size-5' />
					</button>
				</div>
			</div>

			<AvatarGroup
				testimonials={testimonials}
				updateIndex={setIndex}
				currentIndex={index}
				range={[0, 3]}
				direction='bottom'
				className='absolute -top-8 left-0'
			/>
			<AvatarGroup
				testimonials={testimonials}
				updateIndex={setIndex}
				currentIndex={index}
				range={[3, 6]}
				direction='top'
				className='absolute -top-4 right-0 md:top-0 lg:top-8'
			/>
			<AvatarGroup
				testimonials={testimonials}
				updateIndex={setIndex}
				currentIndex={index}
				range={[6, 9]}
				direction='top'
				className='absolute -bottom-16 left-4 md:-bottom-4 lg:bottom-4 lg:left-[7.5%]'
			/>
			<AvatarGroup
				testimonials={testimonials}
				updateIndex={setIndex}
				currentIndex={index}
				range={[9, 12]}
				direction='left'
				className='absolute -bottom-12 right-0 md:right-12 lg:-bottom-16 lg:right-[15%]'
			/>
		</div>
	)
}
