import React, { useEffect, useRef, useState } from 'react'

interface DraggableWrapperProps {
	children: React.ReactNode
	containerRef: React.RefObject<HTMLDivElement>
	onDragChange?: (isDragging: boolean) => void
	onPositionChange?: (position: { x: number; y: number }) => void
	startAtCenter?: boolean
}

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
	children,
	containerRef,
	onDragChange,
	onPositionChange,
	startAtCenter = false
}) => {
	const [isDragging, setIsDragging] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
	const [startMousePosition, setStartMousePosition] = useState({ x: 0, y: 0 })
	const elementRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (startAtCenter && containerRef.current && elementRef.current) {
			const containerRect = containerRef.current.getBoundingClientRect()
			const elementRect = elementRef.current.getBoundingClientRect()
			const centerX = (containerRect.width - elementRect.width) / 2
			const centerY = (containerRect.height - elementRect.height) / 2
			setPosition({ x: centerX, y: centerY })
			onPositionChange && onPositionChange({ x: centerX, y: centerY })
		}
	}, [startAtCenter, containerRef])

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true)
		setStartMousePosition({ x: e.clientX, y: e.clientY })
		setStartPosition(position)

		if (onDragChange) onDragChange(true)
	}

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		setIsDragging(true)
		const touch = e.touches[0]
		setStartMousePosition({ x: touch.clientX, y: touch.clientY })
		setStartPosition(position)

		if (onDragChange) onDragChange(true)
	}

	const handleMouseMove = (e: MouseEvent) => {
		handleMove(e.clientX, e.clientY)
	}

	const handleTouchMove = (e: TouchEvent) => {
		const touch = e.touches[0]
		handleMove(touch.clientX, touch.clientY)
	}

	const handleMove = (clientX: number, clientY: number) => {
		if (isDragging) {
			const dx = clientX - startMousePosition.x
			const dy = clientY - startMousePosition.y
			const newPosX = startPosition.x + dx
			const newPosY = startPosition.y + dy

			if (containerRef.current && elementRef.current) {
				const rect = containerRef.current.getBoundingClientRect()
				const elemRect = elementRef.current.getBoundingClientRect()
				const boundedX = Math.max(0, Math.min(newPosX, rect.width - elemRect.width))
				const boundedY = Math.max(0, Math.min(newPosY, rect.height - elemRect.height))

				setPosition({ x: boundedX, y: boundedY })
				onPositionChange && onPositionChange({ x: boundedX, y: boundedY })
			} else {
				setPosition({ x: newPosX, y: newPosY })
				onPositionChange && onPositionChange({ x: newPosX, y: newPosY })
			}
		}
	}

	const handleMouseUp = () => {
		setIsDragging(false)
		if (onDragChange) onDragChange(false)
	}

	const handleTouchEnd = () => {
		setIsDragging(false)
		if (onDragChange) onDragChange(false)
	}

	useEffect(() => {
		if (isDragging) {
			window.addEventListener('mousemove', handleMouseMove)
			window.addEventListener('mouseup', handleMouseUp)
			window.addEventListener('touchmove', handleTouchMove)
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
		<div
			ref={elementRef}
			className='absolute'
			style={{ left: `${position.x}px`, top: `${position.y}px` }}
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}>
			{children}
		</div>
	)
}

export default DraggableWrapper
