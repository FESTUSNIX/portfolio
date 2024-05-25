import { RefreshCwIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface RotatableWrapperProps {
	children: React.ReactNode
	onRotationChange?: (rotation: number) => void
}

const RotatableWrapper: React.FC<RotatableWrapperProps> = ({ children, onRotationChange }) => {
	const [rotation, setRotation] = useState(0)
	const [isDragging, setIsDragging] = useState(false)
	const [startAngle, setStartAngle] = useState(0)
	const [initialRotation, setInitialRotation] = useState(0)
	const wrapperRef = useRef<HTMLDivElement>(null)

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		handleStart(e.clientX, e.clientY)
		e.stopPropagation()
	}

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		const touch = e.touches[0]
		handleStart(touch.clientX, touch.clientY)
		e.stopPropagation()
	}

	const handleStart = (clientX: number, clientY: number) => {
		if (wrapperRef.current) {
			const rect = wrapperRef.current.getBoundingClientRect()
			const centerX = rect.left + rect.width / 2
			const centerY = rect.top + rect.height / 2

			const radians = Math.atan2(clientY - centerY, clientX - centerX)
			const degrees = radians * (180 / Math.PI)

			setStartAngle(degrees)
			setInitialRotation(rotation)
			setIsDragging(true)
		}
	}

	const handleMouseMove = (e: MouseEvent) => {
		handleMove(e.clientX, e.clientY)
	}

	const handleTouchMove = (e: TouchEvent) => {
		e.preventDefault() // Prevent page from scrolling
		const touch = e.touches[0]
		handleMove(touch.clientX, touch.clientY)
	}

	const handleMove = (clientX: number, clientY: number) => {
		if (isDragging && wrapperRef.current) {
			const rect = wrapperRef.current.getBoundingClientRect()
			const centerX = rect.left + rect.width / 2
			const centerY = rect.top + rect.height / 2

			const radians = Math.atan2(clientY - centerY, clientX - centerX)
			const degrees = radians * (180 / Math.PI)

			const newRotation = initialRotation + (degrees - startAngle)
			setRotation(newRotation)
			onRotationChange && onRotationChange(newRotation)
		}
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	const handleTouchEnd = () => {
		setIsDragging(false)
	}

	useEffect(() => {
		if (isDragging) {
			window.addEventListener('mousemove', handleMouseMove)
			window.addEventListener('mouseup', handleMouseUp)
			window.addEventListener('touchmove', handleTouchMove, { passive: false }) // Passive: false to allow preventDefault
			window.addEventListener('touchend', handleTouchEnd)
		} else {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
			window.removeEventListener('touchmove', handleTouchMove)
			window.removeEventListener('touchend', handleTouchEnd)
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
			window.removeEventListener('touchmove', handleTouchMove)
			window.removeEventListener('touchend', handleTouchEnd)
		}
	}, [isDragging])

	return (
		<div ref={wrapperRef} className='relative inline-block'>
			<div className='origin-center transform' style={{ transform: `rotate(${rotation}deg)` }}>
				{children}
				<div
					className='mx-auto mt-2 w-max cursor-pointer p-1'
					onMouseDown={handleMouseDown}
					onTouchStart={handleTouchStart}>
					<RefreshCwIcon className='size-4 text-muted-foreground duration-300 hover:text-foreground' />
				</div>
			</div>
		</div>
	)
}

export default RotatableWrapper
