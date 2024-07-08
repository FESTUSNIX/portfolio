'use client'

import { useScrollPosition } from '@/hooks/useScrollPosition'
import { cn } from '@/lib/utils'

type Props = {}

export const DynamicBg = (props: Props) => {
	const { y } = useScrollPosition()

	return (
		<div
			className={cn(
				'fixed z-40 h-16 w-full border-b border-transparent duration-300',
				y > 10 && 'border-border bg-background/20 backdrop-blur-sm backdrop-sepia-[25%]'
			)}
		/>
	)
}
