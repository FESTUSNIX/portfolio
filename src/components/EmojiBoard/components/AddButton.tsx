'use client'

import { createClient } from '@/lib/supabase/client'
import { TranslationFn } from '@/lib/translations'
import { cn } from '@/lib/utils'
import useLocalStorage from 'beautiful-react-hooks/useLocalStorage'
import { type DOMRectValues } from 'beautiful-react-hooks/useResizeObserver'
import { CheckIcon, Loader2, SmilePlusIcon } from 'lucide-react'
import { useState } from 'react'

type Props = {
	selectedEmoji: string | null
	position: { x: number; y: number }
	rotation: number
	containerDOMRect: DOMRectValues | undefined
	setSelectedEmoji: (emoji: string | null) => void
	setHasAlreadyAddedEmoji: (hasAlreadyAddedEmoji: boolean) => void
	translateFn: TranslationFn
}

export const AddButton = ({
	selectedEmoji,
	containerDOMRect,
	position,
	rotation,
	setSelectedEmoji,
	translateFn,
	setHasAlreadyAddedEmoji
}: Props) => {
	const supabase = createClient()

	const [isLoading, setIsLoading] = useState(false)
	const [_, setStorageHasAlreadyAddedEmoji] = useLocalStorage('hasAlreadyAddedEmoji', false)

	const handleConfirm = async () => {
		if (!selectedEmoji) return

		setIsLoading(true)

		const percentX = ((position.x + 32) / (containerDOMRect?.width ?? 0)) * 100
		const percentY = ((position.y + 32) / (containerDOMRect?.height ?? 0)) * 100

		const { error } = await supabase.from('emoji_board').insert({
			emoji: selectedEmoji,
			x: percentX,
			y: percentY,
			rotation: rotation
		})

		if (error) {
			console.error('Error inserting emoji:', error)
		} else {
			setHasAlreadyAddedEmoji(true)
			setStorageHasAlreadyAddedEmoji(true)
		}

		setSelectedEmoji(null)
		setIsLoading(false)
	}

	return (
		<button
			onClick={() => handleConfirm()}
			className={cn(
				'flex h-10 items-center overflow-hidden rounded-full border bg-muted/40 text-muted-foreground backdrop-blur-sm duration-300 hover:backdrop-blur-md disabled:cursor-not-allowed disabled:opacity-50 group-hover:border-muted-foreground'
			)}
			disabled={isLoading}>
			<div className='-ml-px flex aspect-square h-full w-auto items-center justify-center rounded-full border duration-300 group-hover:border-muted-foreground'>
				{isLoading ? (
					<Loader2 className='size-6 animate-spin' />
				) : selectedEmoji ? (
					<CheckIcon className='size-6 text-[#3ADC71]' />
				) : (
					<SmilePlusIcon className='size-6' />
				)}
			</div>
			<span className='py-1 pl-3 pr-4 uppercase leading-none'>
				{selectedEmoji
					? translateFn('home.emojiBoard.addButton.confirm')
					: translateFn('home.emojiBoard.addButton.default')}
			</span>
		</button>
	)
}
