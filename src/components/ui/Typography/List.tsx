import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

const TypographyList = ({ className, children }: Props) => {
	return <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}>{children}</ul>
}

export default TypographyList
