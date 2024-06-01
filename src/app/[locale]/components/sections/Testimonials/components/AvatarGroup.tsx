'use client'

import { AvatarMagnetic } from '@/app/[locale]/components/sections/Testimonials/components/AvatarMagnetic'
import { Testimonial } from '@/constants/TESTIMONIALS'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type Props = {
	testimonials: Testimonial[]
	updateIndex: (index: number) => void
	currentIndex: number
	range?: [number, number]
	direction?: 'top' | 'bottom' | 'left' | 'right'
	className?: string
}

export const AvatarGroup = ({
	testimonials,
	updateIndex,
	currentIndex,
	range = [0, 3],
	direction = 'top',
	className
}: Props) => {
	const getAvatarsFromTestimonials = (testimonials: Testimonial[]) => {
		return testimonials
			.slice(range[0], range[1])
			.map((testimonial, index) => ({ name: testimonial.name, image: testimonial.image, ogIndex: range[0] + index }))
	}

	const avatars = getAvatarsFromTestimonials(testimonials).slice(0, 3)

	return (
		<div className={cn('group grid w-max grid-cols-2 grid-rows-2 gap-1 sm:gap-2 md:gap-2.5 lg:gap-3', className)}>
			{avatars.map((avatar, i) => (
				<Avatar
					key={i}
					{...avatar}
					onClick={() => updateIndex(avatar.ogIndex)}
					className={cn(
						direction === 'top' && i === 0 && 'col-span-full translate-y-2 justify-self-center lg:translate-y-4',
						direction === 'bottom' && i === 2 && 'col-span-full -translate-y-2 justify-self-center lg:-translate-y-4',
						direction === 'left' && i === 0 && 'row-span-full translate-x-2 self-center lg:translate-x-4',
						direction === 'right' && i === 1 && 'col-start-2 row-span-full -translate-x-2 self-center lg:-translate-x-4'
					)}
					isActive={range[0] + i === currentIndex}
				/>
			))}
		</div>
	)
}

type AvatarProps = {
	name: string
	image: string
	onClick: () => void
	isActive?: boolean
	className?: string
}

const Avatar = ({ image, name, onClick, className, isActive }: AvatarProps) => {
	return (
		<AvatarMagnetic
			className={cn(
				'size-14 rounded-full duration-300 group-hover:m-1 sm:size-16 md:size-[4.5rem] lg:size-20 xl:size-24',
				className
			)}>
			<button
				onClick={onClick}
				className={cn('overflow-hidden rounded-full border duration-300', isActive && 'ring-2 ring-primary sepia')}>
				<Image
					src={image}
					alt={name}
					width={200}
					height={200}
					className='pointer-events-none select-none object-cover'
				/>
				<span className='sr-only'>{name}</span>
			</button>
		</AvatarMagnetic>
	)
}
