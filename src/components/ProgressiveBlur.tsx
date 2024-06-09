// components/ProgressiveBlur.tsx
import { cn } from '@/lib/utils'
import React from 'react'

const masks = [
	'linear-gradient(to bottom, rgba(0,0,0,0) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,0) 50%)',
	'linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 62.5%)',
	'linear-gradient(to bottom, rgba(0,0,0,0) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,0) 75%)',
	'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 87.5%)',
	'linear-gradient(to bottom, rgba(0,0,0,0) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)',
	'linear-gradient(to bottom, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,1) 100%)'
]

const blurLevels = ['blur(1px)', 'blur(2px)', 'blur(4px)', 'blur(8px)', 'blur(16px)', 'blur(32px)']

const ProgressiveBlur = ({ className }: { className?: string }) => {
	return (
		<div className={cn('pointer-events-none absolute inset-0 z-10 h-2/3', className)}>
			{masks.map((mask, index) => (
				<div
					key={index}
					className={`absolute inset-0`}
					style={{ WebkitMask: mask, mask: mask, backdropFilter: blurLevels[index], zIndex: index + 2 }}
				/>
			))}
		</div>
	)
}

export default ProgressiveBlur
