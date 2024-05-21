'use client'

import { Testimonial } from '@/constants/TESTIMONIALS'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { AvatarGroup } from './AvatarGroup'

type Props = {
	testimonials: Testimonial[]
}

export const TestimonialsContent = ({ testimonials }: Props) => {
	const [index, setIndex] = React.useState(0)

	const testimonial = testimonials[index]

	const handleNext = () => setIndex((index + 1) % testimonials.length)
	const handlePrevious = () => setIndex((index - 1 + testimonials.length) % testimonials.length)

	const getAvatarsFromTestimonials = (testimonials: Testimonial[]) => {
		return testimonials.map((testimonial, index) => ({
			name: testimonial.name,
			image: testimonial.image
		}))
	}

	return (
		<div>
			<div className='flex flex-col items-center gap-6 text-center'>
				<div className='flex flex-col items-center'>
					<div className='mb-4 size-16 overflow-hidden rounded-full border bg-secondary'>
						<Image
							src={testimonial.image}
							alt={testimonial.name}
							width={64}
							height={64}
							className='size-full object-cover'
						/>
					</div>
					<h3 className='text-xl leading-none'>{testimonial.name}</h3>
					<p className='text-sm text-muted-foreground'>{testimonial.role}</p>
				</div>

				<p className='max-w-md font-light'>{testimonial.quote}</p>

				<div className='flex items-center gap-1 text-muted-foreground'>
					<button onClick={handlePrevious} className='p-2'>
						<ChevronLeft className='size-5' />
					</button>
					<span className='font-light'>
						{index < 10 ? `0${index + 1}` : index + 1}/{testimonials.length}
					</span>
					<button onClick={handleNext} className='p-2'>
						<ChevronRight className='size-5' />
					</button>
				</div>
			</div>

			<AvatarGroup avatars={getAvatarsFromTestimonials(testimonials.slice(0, 3))} updateIndex={setIndex} />
			<AvatarGroup
				avatars={getAvatarsFromTestimonials(testimonials.slice(3, 6))}
				updateIndex={setIndex}
				direction='bottom'
			/>
			<AvatarGroup
				avatars={getAvatarsFromTestimonials(testimonials.slice(6, 9))}
				updateIndex={setIndex}
				direction='left'
			/>
			<AvatarGroup
				avatars={getAvatarsFromTestimonials(testimonials.slice(9, 12))}
				updateIndex={setIndex}
				direction='right'
			/>
		</div>
	)
}
