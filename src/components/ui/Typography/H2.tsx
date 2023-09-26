import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

const TypographyH2 = ({ className, children }: Props) => {
	return (
		<h2
			className={cn('scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0', className)}>
			{children}
		</h2>
	)
}

export default TypographyH2
