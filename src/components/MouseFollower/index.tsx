'use client'

import { cn } from '@/lib/utils'
import { Variants, motion } from 'framer-motion'
import React from 'react'
import { useMouseFollower } from './context/MouseFollowerContext'

type Props = {
	children: React.ReactNode
	className?: string
}

export const MouseFollower = ({ children, className }: Props) => {
	const mouse = useMouseFollower()

	let mouseXPosition = 0
	let mouseYPosition = 0

	if (!mouse.clientX || !mouse.clientY) return null

	if (mouse.clientX !== null) {
		mouseXPosition = mouse.clientX
	}

	if (mouse.clientY !== null) {
		mouseYPosition = mouse.clientY
	}

	const variants: Variants = {
		default: {
			x: mouseXPosition,
			y: mouseYPosition,
			transition: {
				type: 'spring',
				mass: 0.6
			}
		}
	}

	return (
		<motion.div
			variants={variants}
			animate={'default'}
			initial={false}
			className={cn('pointer-events-none fixed left-0 top-0 z-20 -translate-x-1/2 -translate-y-1/2', className)}>
			{children}
		</motion.div>
	)
}
