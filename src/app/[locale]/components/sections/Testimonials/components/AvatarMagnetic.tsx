'use client'

import { cn } from '@/lib/utils'
import { motion, useMotionValue } from 'framer-motion'
import React from 'react'

type MagneticProps = {
	children: React.ReactNode
	strength?: number
} & React.HTMLAttributes<HTMLDivElement>

export const AvatarMagnetic = ({ children, strength = 20, ...props }: MagneticProps) => {
	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const mapRange = (inputLower: number, inputUpper: number, outputLower: number, outputUpper: number) => {
		const INPUT_RANGE = inputUpper - inputLower
		const OUTPUT_RANGE = outputUpper - outputLower

		return (value: number) => outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0)
	}

	const handleTransform = (item: HTMLElement, event: React.PointerEvent) => {
		const bounds = item?.getBoundingClientRect()

		if (!bounds) return

		const relativeX = event.clientX - bounds.left
		const relativeY = event.clientY - bounds.top

		const xRange = mapRange(0, bounds.width, -1, 1)(relativeX)
		const yRange = mapRange(0, bounds.height, -1, 1)(relativeY)

		x.set(xRange * strength)
		y.set(yRange * strength)
	}

	const resetPosition = () => {
		x.set(0)
		y.set(0)
	}

	return (
		<div {...props} className={cn('relative z-0 flex items-center justify-center', props.className)}>
			<div
				onPointerMove={event => {
					handleTransform(event.currentTarget, event)
				}}
				onPointerLeave={resetPosition}
				className='absolute left-1/2 top-1/2 z-50 flex size-[150%] -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
				<motion.div style={{ x, y }} className='transition-elastic-out flex size-2/3 items-center justify-center'>
					{children}
				</motion.div>
			</div>
		</div>
	)
}
