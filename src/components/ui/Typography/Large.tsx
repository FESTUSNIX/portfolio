import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

const TypographyLarge = ({ className, children }: Props) => {
	return <div className={cn('text-lg font-semibold', className)}>{children}</div>
}

export default TypographyLarge
