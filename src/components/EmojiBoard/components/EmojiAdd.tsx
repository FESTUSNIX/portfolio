'use client'

import DraggableWrapper from '@/components/Draggable'
import RotatableWrapper from '@/components/Rotatable'
import { cn } from '@/lib/utils'
import '@/styles/EmojiPickerReact.css'
import useDidMount from 'beautiful-react-hooks/useDidMount'
import useLocalStorage from 'beautiful-react-hooks/useLocalStorage'
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery'
import useResizeObserver from 'beautiful-react-hooks/useResizeObserver'
import EmojiPicker, { EmojiStyle, Theme } from 'emoji-picker-react'
import { XIcon } from 'lucide-react'
import { Suspense, useRef, useState } from 'react'
import { AddButton } from './AddButton'
import { useTranslation } from '@/lib/translations'
import { useLocaleContext } from '@/components/LocaleProvider'

type Props = {
	className?: string
}

export const EmojiAdd = ({ className }: Props) => {
	const locale = useLocaleContext()
	const { t } = useTranslation(locale)

	const RECOMMENDED_EMOJIS = ['2764-fe0f', '1f44d', '1f4bb', '1f60e', '1f44c', '1f916']

	const container = useRef<HTMLDivElement>(null)
	const containerDOMRect = useResizeObserver(container, 200)

	const isMd = useMediaQuery('(min-width: 768px)')
	const [hasMounted, setHasMounted] = useState(false)

	const emojiElement = useRef<HTMLDivElement>(null)
	const [hasAlreadyAddedEmoji] = useLocalStorage('hasAlreadyAddedEmoji', false)

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

	useDidMount(() => {
		setHasMounted(true)
	})

	if (!hasMounted || hasAlreadyAddedEmoji || !isMd) return null

	return (
		<>
			<div className={cn('group absolute left-1/2 top-4 z-30 -translate-x-1/2', className)}>
				<Suspense>
					<AddButton
						selectedEmoji={selectedEmoji}
						position={position}
						rotation={rotation}
						containerDOMRect={containerDOMRect}
						setSelectedEmoji={setSelectedEmoji}
						translateFn={t}
					/>
				</Suspense>

				<div
					className={cn(
						'absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-full rounded-full py-2',
						!selectedEmoji && 'group-hover:block'
					)}>
					<Suspense>
						<EmojiPicker
							reactionsDefaultOpen={true}
							onReactionClick={emojiObj => setSelectedEmoji(emojiObj.emoji)}
							onEmojiClick={emojiObj => setSelectedEmoji(emojiObj.emoji)}
							theme={Theme.DARK}
							emojiStyle={EmojiStyle.NATIVE}
							searchDisabled
							skinTonesDisabled
							previewConfig={{
								showPreview: false
							}}
							reactions={RECOMMENDED_EMOJIS}
							className='[&>ul]:gap-3'
						/>
					</Suspense>
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
								className='flex aspect-square size-24 cursor-move items-center justify-center saturate-0 active:cursor-grabbing'
								style={{ width: (containerDOMRect?.width ?? 0) * 0.1 }}
								ref={emojiElement}
								onMouseDown={() => {
									!hasTouchedEmoji && setHasTouchedEmoji(true)
								}}
								onTouchStart={() => {
									!hasTouchedEmoji && setHasTouchedEmoji(true)
								}}>
								<svg
									className='pointer-events-none select-none duration-300'
									viewBox='0 0 32 32'
									style={{ width: !isDragging && hasTouchedEmoji ? (containerDOMRect?.width ?? 0) * 0.06 : '100%' }}>
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
					<span className='py-1 pl-3 pr-4 text-sm uppercase leading-none'>{t('home.emojiBoard.cancelButton')}</span>
				</button>
			)}
		</>
	)
}
