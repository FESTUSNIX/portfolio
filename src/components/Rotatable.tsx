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
		if (wrapperRef.current) {
			const rect = wrapperRef.current.getBoundingClientRect()
			const centerX = rect.left + rect.width / 2
			const centerY = rect.top + rect.height / 2
			const mouseX = e.clientX
			const mouseY = e.clientY

			const radians = Math.atan2(mouseY - centerY, mouseX - centerX)
			const degrees = radians * (180 / Math.PI)

			setStartAngle(degrees)
			setInitialRotation(rotation)
			setIsDragging(true)

			// Prevent dragging when rotating
			e.stopPropagation()
		}
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (isDragging && wrapperRef.current) {
			const rect = wrapperRef.current.getBoundingClientRect()
			const centerX = rect.left + rect.width / 2
			const centerY = rect.top + rect.height / 2
			const mouseX = e.clientX
			const mouseY = e.clientY

			const radians = Math.atan2(mouseY - centerY, mouseX - centerX)
			const degrees = radians * (180 / Math.PI)

			const newRotation = initialRotation + (degrees - startAngle)
			setRotation(newRotation)
			onRotationChange && onRotationChange(newRotation)
		}
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	useEffect(() => {
		if (isDragging) {
			window.addEventListener('mousemove', handleMouseMove)
			window.addEventListener('mouseup', handleMouseUp)
		} else {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
		}
	}, [isDragging])

	return (
		<div ref={wrapperRef} className='relative inline-block'>
			<div className='origin-center transform' style={{ transform: `rotate(${rotation}deg)` }}>
				{children}
				<div className='mx-auto mt-2 w-max cursor-pointer p-1' onMouseDown={handleMouseDown}>
					<RefreshCwIcon className='size-4 text-muted-foreground duration-300 hover:text-foreground' />
				</div>
			</div>
		</div>
	)
}

export default RotatableWrapper
