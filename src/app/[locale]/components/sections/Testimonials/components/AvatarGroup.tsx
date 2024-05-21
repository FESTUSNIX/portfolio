'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
	avatars: Pick<AvatarProps, 'name' | 'image'>[]
	updateIndex: (index: number) => void
	direction?: 'top' | 'bottom' | 'left' | 'right'
	className?: string
}

export const AvatarGroup = ({ avatars, updateIndex, direction = 'top', className }: Props) => {
	return (
		<div className={cn('grid w-max grid-cols-2 grid-rows-2 gap-1', className)}>
			{avatars.slice(0, 3).map((avatar, i) => (
				<Avatar
					key={i}
					{...avatar}
					updateIndex={updateIndex}
					className={cn(
						direction === 'top' && i === 0 && 'col-span-full translate-y-1 justify-self-center',
						direction === 'bottom' && i === 2 && 'col-span-full -translate-y-1 justify-self-center',
						direction === 'left' && i === 0 && 'row-span-full translate-x-1 self-center',
						direction === 'right' && i === 1 && 'col-start-2 row-span-full -translate-x-1 self-center'
					)}
				/>
			))}
		</div>
	)
}

type AvatarProps = {
	name: string
	image: string
	updateIndex: (index: number) => void
	className?: string
}

const Avatar = ({ image, name, updateIndex, className }: AvatarProps) => {
	return (
		<button
			onClick={() => {
				updateIndex(5)
			}}
			className={cn('size-12 overflow-hidden rounded-full border', className)}>
			<Image src={image} alt={name} width={100} height={100} className='size-full object-cover' />
			<span>{name}</span>
		</button>
	)
}
