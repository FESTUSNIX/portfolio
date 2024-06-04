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
				'scroll-m-20 font-heading text-8xl font-normal uppercase !leading-[0.8] transition-colors sm:text-9xl md:text-10xl lg:text-11xl xl:text-12xl',
				className
			)}>
			{children}
		</h2>
	)
}

export default TypographyH2
