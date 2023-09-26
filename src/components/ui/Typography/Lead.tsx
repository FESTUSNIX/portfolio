import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

const TypographyLead = ({ className, children }: Props) => {
	return <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>
}

export default TypographyLead
