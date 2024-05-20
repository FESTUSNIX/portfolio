import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
	children: React.ReactNode
	className?: string
}

const TypographyH2 = ({ className, children }: Props) => {
	return (
		<h2
			className={cn(
				'scroll-m-20 font-heading text-4xl font-normal leading-none transition-colors sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
				className
			)}>
			{children}
		</h2>
	)
}

export default TypographyH2
