'use client'

import { Testimonial } from '@/constants/TESTIMONIALS'
import { Locales } from '@/i18nConfig'
import { useTranslation } from '@/lib/translations'
import { AnimatePresence, motion, wrap } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { AvatarGroup } from './AvatarGroup'

type Props = {
	testimonials: Testimonial[]
	locale: Locales
}

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 200 : -200,
			opacity: 0,
			scale: 0.9
		}
	},
	center: {
		x: 0,
		opacity: 1,
		scale: 1
	},
	exit: (direction: number) => {
		return {
			x: direction < 0 ? 200 : -200,
			opacity: 0,
			scale: 0.9
		}
	}
}

export const TestimonialsContent = ({ testimonials, locale }: Props) => {
	const { t } = useTranslation(locale)

	const [[index, direction], setIndex] = useState([0, 0])
	const [tempTranslation, setTempTranslation] = useState<Locales | null>(null)

	const testimonialIndex = wrap(0, testimonials.length, index)
	const testimonial = testimonials[testimonialIndex]

	const setTestimonial = (index: number) => {
		setIndex(prevIndex => [index, prevIndex[0] < index ? 1 : -1])
		setTempTranslation(null)
	}

	const handleNext = () => setTestimonial(index + 1)
	const handlePrevious = () => setTestimonial(index - 1)

	return (
		<div className='relative flex items-center justify-center py-32'>
			<AnimatePresence initial={false} custom={direction} mode='wait'>
				<motion.div
					key={testimonialIndex}
					custom={direction}
					variants={variants}
					initial='enter'
					animate='center'
					exit='exit'
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className='flex w-max flex-col items-center gap-6 text-center md:gap-8'>
					<div className='flex flex-col items-center'>
						<div className='mb-4 size-16 overflow-hidden rounded-full border bg-secondary md:size-20'>
							<Image
								src={testimonial.image}
								alt={testimonial.name}
								width={100}
								height={100}
								className='pointer-events-none size-full object-cover'
							/>
						</div>
						<h3 className='text-xl leading-none lg:text-2xl'>{testimonial.name}</h3>
						{testimonial.role && (
							<p className='text-sm font-light text-muted-foreground lg:text-base'>{testimonial.role}</p>
						)}
					</div>

					<div className='flex flex-col items-center gap-4'>
						<p className='min-h-24 max-w-sm text-pretty text-lg font-light sm:text-xl md:max-w-md lg:max-w-lg lg:text-2xl'>
							{testimonial.quote[tempTranslation ?? locale]}
						</p>

						{locale !== testimonial.quote.default ? (
							<div className='flex items-center gap-1 font-light text-muted-foreground'>
								<p>{tempTranslation ? t('home.testimonials.goBack') : t('home.testimonials.translatedFrom')} </p>
								<button
									onClick={() => setTempTranslation(tempTranslation ? null : testimonial.quote.default)}
									className='font-normal uppercase hover:underline'>
									{tempTranslation ? locale : testimonial.quote.default}
								</button>
							</div>
						) : (
							<p aria-hidden className='invisible opacity-0'>
								.
							</p>
						)}
					</div>

					<div className='flex items-center gap-1 text-muted-foreground max-sm:-mt-4'>
						<button onClick={handlePrevious} className='p-2'>
							<span className='sr-only'>{t('global.previous')}</span>
							<ChevronLeft className='size-5' />
						</button>
						<span className='font-light'>
							{testimonialIndex < 9 ? `0${testimonialIndex + 1}` : testimonialIndex + 1}/
							{testimonials.length < 9 ? `0${testimonials.length}` : testimonials.length}
						</span>
						<button onClick={handleNext} className='p-2'>
							<span className='sr-only'>{t('global.next')}</span>
							<ChevronRight className='size-5' />
						</button>
					</div>
				</motion.div>
			</AnimatePresence>

			<AvatarGroup
				testimonials={testimonials}
				updateIndex={setTestimonial}
				currentIndex={testimonialIndex}
				range={[0, 1]}
				direction='bottom'
				className='absolute -top-8 left-0'
			/>
			<AvatarGroup
				testimonials={testimonials}
				updateIndex={setTestimonial}
				currentIndex={testimonialIndex}
				range={[1, 2]}
				direction='top'
				className='absolute -top-4 right-0 md:top-0 lg:top-8'
			/>
			<AvatarGroup
				testimonials={testimonials}
				updateIndex={setTestimonial}
				currentIndex={testimonialIndex}
				range={[2, 3]}
				direction='top'
				className='absolute -bottom-16 left-4 md:-bottom-4 lg:bottom-4 lg:left-[7.5%]'
			/>
			<AvatarGroup
				testimonials={testimonials}
				updateIndex={setTestimonial}
				currentIndex={testimonialIndex}
				range={[3, 5]}
				direction='left'
				className='absolute -bottom-12 right-0 md:right-12 lg:-bottom-16 lg:right-[15%]'
			/>
		</div>
	)
}
