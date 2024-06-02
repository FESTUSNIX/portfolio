'use client'

import { useScrollPosition } from '@/hooks/useScrollPosition'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {}

export const DynamicBg = (props: Props) => {
	const { y } = useScrollPosition()

	return (
		<div
			className={cn(
				'container-fill absolute inset-0 size-full',
				y > 10 &&
					'active'
			)}></div>
	)
}
