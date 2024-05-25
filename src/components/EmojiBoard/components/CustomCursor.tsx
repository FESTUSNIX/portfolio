'use client'

import React, { useRef, useEffect } from 'react'

type Props = {
	containerRef: React.RefObject<HTMLDivElement>
}

export const CustomCursor = ({ containerRef }: Props) => {
	const cursorRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current
		const cursor = cursorRef.current

		if (!container) return

		const handleMouseMove = (event: MouseEvent) => {
			if (container && cursor) {
				const containerRect = container.getBoundingClientRect()
				const cursorSize = cursor.getBoundingClientRect().width
				const x = event.clientX - containerRect.left - cursorSize / 2
				const y = event.clientY - containerRect.top - cursorSize / 2

				cursor.style.transform = `translate(${x}px, ${y}px)`
			}
		}

		container.addEventListener('mousemove', handleMouseMove)

		return () => {
			container.removeEventListener('mousemove', handleMouseMove)
		}
	}, [containerRef])

	return (
		<div
			ref={cursorRef}
			className='absolute left-0 top-0 z-[10000] size-5 text-foreground opacity-0 mix-blend-difference transition-opacity duration-300 group-hover/container:opacity-100'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='20'
				height='20'
				fill='currentColor'
				viewBox='0 0 16 16'
				className='size-full translate-x-1/2 translate-y-1/2 -scale-x-100'>
				<path d='M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z' />
			</svg>
		</div>
	)
}
