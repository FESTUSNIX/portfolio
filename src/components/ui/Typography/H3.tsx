import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

const TypographyH3 = ({ className, children }: Props) => {
	return <h3 className={cn('scroll-m-20 text-lg font-semibold tracking-tight', className)}>{children}</h3>
}

export default TypographyH3
