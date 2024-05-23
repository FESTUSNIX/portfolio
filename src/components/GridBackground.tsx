import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
	className?: string
}

export const GridBackground = ({ className }: Props) => {
	return (
		<div
			className={cn(
				'pointer-events-none absolute inset-0 -z-20 w-full bg-background bg-grid-large-white/5',
				className
			)}>
			<div className='pointer-events-none absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_-20%,black_60%)]' />
		</div>
	)
}
