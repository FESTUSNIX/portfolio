import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

const TypographyBlockquote = ({ className, children }: Props) => {
	return <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>{children}</blockquote>
}

export default TypographyBlockquote
