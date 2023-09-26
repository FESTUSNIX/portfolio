import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

const TypographyH2 = ({ className, children }: Props) => {
	return (
		<h2
			className={cn(
				'scroll-m-20 font-heading text-2xl font-normal tracking-tight transition-colors first:mt-0 md:text-3xl',
				className
			)}>
			{children}
		</h2>
	)
}

export default TypographyH2
