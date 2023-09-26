import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

const TypographyInlineCode = ({ className, children }: Props) => {
	return (
		<code
			className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', className)}>
			{children}
		</code>
	)
}

export default TypographyInlineCode
