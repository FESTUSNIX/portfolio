'use client'

import DraggableWrapper from '@/components/Draggable'
import RotatableWrapper from '@/components/Rotatable'
import { cn } from '@/lib/utils'
import useResizeObserver from 'beautiful-react-hooks/useResizeObserver'
import { XIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { AddButton } from './AddButton'

type Props = {
	className?: string
}

export const EmojiAdd = ({ className }: Props) => {
	const container = useRef<HTMLDivElement>(null)
	const containerDOMRect = useResizeObserver(container, 200)

	const emojiElement = useRef<HTMLDivElement>(null)

	const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
	const [hasTouchedEmoji, setHasTouchedEmoji] = useState(false)
	const [isDragging, setIsDragging] = useState(false)

	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [rotation, setRotation] = useState(0)

	const reset = () => {
		setSelectedEmoji(null)
		setHasTouchedEmoji(false)
		setIsDragging(false)
		setPosition({ x: 0, y: 0 })
		setRotation(0)
	}

	return (
		<>
			<div className={cn('group absolute left-1/2 top-4 z-30 -translate-x-1/2', className)}>
				<AddButton
					selectedEmoji={selectedEmoji}
					position={position}
					rotation={rotation}
					containerDOMRect={containerDOMRect}
					setSelectedEmoji={setSelectedEmoji}
				/>

				<div className='absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-full rounded-full pb-2 group-hover:block'>
					<ul className='flex items-center gap-4 overflow-hidden rounded-full border bg-muted/40 px-4 py-2 text-muted-foreground backdrop-blur-sm duration-300 hover:backdrop-blur-md'>
						{RECOMMENDED_EMOJIS.map((emoji, i) => (
							<li key={`emoji-${i}`}>
								<button
									onClick={() => setSelectedEmoji(emoji)}
									className='rounded-full p-1 text-3xl duration-300 hover:scale-125'>
									{emoji}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>

			{selectedEmoji && (
				<div
					className={cn(
						'absolute inset-0 z-20 flex items-center justify-center overflow-hidden duration-300',
						!hasTouchedEmoji && 'bg-secondary/50 backdrop-blur-sm'
					)}
					ref={container}>
					<DraggableWrapper
						startAtCenter
						containerRef={container}
						onDragChange={setIsDragging}
						onPositionChange={setPosition}>
						<RotatableWrapper onRotationChange={setRotation}>
							<div
								className='flex aspect-square size-16 cursor-move items-center justify-center saturate-0 active:cursor-grabbing'
								ref={emojiElement}
								onMouseDown={() => {
									!hasTouchedEmoji && setHasTouchedEmoji(true)
								}}>
								<svg
									className='pointer-events-none select-none duration-300'
									viewBox='0 0 32 32'
									style={{ width: !isDragging && hasTouchedEmoji ? (containerDOMRect?.width ?? 0) * 0.03 : '100%' }}>
									<text x='50%' y='50%' dominantBaseline='middle' textAnchor='middle'>
										{selectedEmoji}
									</text>
								</svg>
							</div>
						</RotatableWrapper>
					</DraggableWrapper>
				</div>
			)}

			{selectedEmoji && (
				<button
					onClick={() => reset()}
					className={cn(
						'absolute bottom-4 left-1/2 z-30 flex h-8 -translate-x-1/2 items-center overflow-hidden rounded-full border bg-muted/40 text-muted-foreground backdrop-blur-sm duration-300 hover:backdrop-blur-md disabled:cursor-not-allowed disabled:opacity-50 group-hover:border-muted-foreground'
					)}>
					<div className='-ml-px flex aspect-square h-full w-auto items-center justify-center rounded-full border text-destructive duration-300 group-hover:border-muted-foreground'>
						<XIcon className='size-4' />
					</div>
					<span className='py-1 pl-3 pr-4 text-sm uppercase leading-none'>Cancel</span>
				</button>
			)}
		</>
	)
}

const RECOMMENDED_EMOJIS = ['👍', '❤️', '👏', '🤔', '😂', '👌']
