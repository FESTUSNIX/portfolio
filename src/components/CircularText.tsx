import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
	text: string
	radius?: number
	className?: string
}

const CircularText = ({ text, radius = 100, className = '' }: Props) => {
	const characters = text.split('')
	const degreeIncrement = 360 / characters.length

	return (
		<div className={cn('relative', className)} style={{ width: radius * 2, height: radius * 2 }}>
			<div className='absolute inset-0 flex items-center justify-center'>
				{characters.map((char, index) => {
					const rotate = index * degreeIncrement
					const transform = `rotate(${rotate}deg) translate(${radius}px) rotate(90deg)`
					return (
						<span key={index} className='absolute' style={{ transform, transformOrigin: '50% 50%' }}>
							{char}
						</span>
					)
				})}
			</div>
		</div>
	)
}

export default CircularText
