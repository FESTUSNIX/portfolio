'use client'

import { cn } from '@/lib/utils'
import { motion, useMotionValue } from 'framer-motion'
import { MouseEvent, useRef } from 'react'

export type MagneticProps = {
	children: React.ReactNode
	as?: 'div' | 'span' | 'p' | 'button'
	strength?: { x?: number; y?: number }
	maxMove?: { x?: number; y?: number }
	className?: string
}

export const Magnetic = ({ children, strength, maxMove, className, as }: MagneticProps) => {
	const ref = useRef<HTMLElement>(null)

	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const strengthX = strength?.x ?? 0.2
	const strengthY = strength?.y ?? 0.2

	const handleMouse = (e: MouseEvent) => {
		if (!ref.current) return

		const { clientX, clientY } = e
		const { height, width, left, top } = ref.current.getBoundingClientRect()
		const middleX = (clientX - (left + width / 2)) * strengthX
		const middleY = (clientY - (top + height / 2)) * strengthY

		const clampedX = maxMove?.x ? Math.max(Math.min(middleX, maxMove.x), -maxMove.x) : middleX
		const clampedY = maxMove?.y ? Math.max(Math.min(middleY, maxMove.y), -maxMove.y) : middleY

		x.set(clampedX)
		y.set(clampedY)
	}

	const reset = () => {
		x.set(0)
		y.set(0)
	}

	const Component = motion[as ?? 'div']

	return (
		<Component
			ref={ref as any}
			onMouseMove={handleMouse}
			onMouseLeave={reset}
			style={{ x, y }}
			className={cn('transition-elastic-out relative overflow-hidden', className)}>
			{children}
		</Component>
	)
}
