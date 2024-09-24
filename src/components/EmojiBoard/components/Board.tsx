'use client'

import { createClient } from '@/lib/supabase/client'
import useDidMount from 'beautiful-react-hooks/useDidMount'
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery'
import { useEffect, useRef, useState } from 'react'
import { Emoji } from '..'
import { CustomCursor } from './CustomCursor'

type Props = {
	serverEmojis: Emoji[] | null
}

export const Board = ({ serverEmojis }: Props) => {
	const supabase = createClient()

	const isMd = useMediaQuery('(min-width: 768px)')
	const containerRef = useRef<HTMLDivElement>(null)

	const [hasMounted, setHasMounted] = useState(false)
	const [emojis, setEmojis] = useState<Emoji[] | null>(serverEmojis)

	useEffect(() => {
		const channel = supabase
			.channel('realtime:emoji_board')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'emoji_board'
				},
				payload => {
					const newEmoji: Emoji = {
						id: payload.new.id,
						emoji: payload.new.emoji,
						x: payload.new.x,
						y: payload.new.y,
						rotation: payload.new.rotation
					}

					if (!newEmoji) return

					setEmojis(prev => [...(prev ?? []), newEmoji])
				}
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [supabase])

	useDidMount(() => {
		setHasMounted(true)
	})

	if (hasMounted && !isMd) return null

	return (
		<>
			<div
				ref={containerRef}
				className='group/container relative h-full w-full cursor-none overflow-hidden [clip-path:inset(0)]'>
				<div className='absolute inset-0 -z-20 bg-dot-white/15' />
				{emojis?.map(emoji => (
					<svg
						key={emoji.id}
						className='pointer-events-none absolute aspect-square h-auto w-[5%] select-none text-xl'
						style={{
							top: `${emoji.y}%`,
							left: `${emoji.x}%`,
							transform: `rotate(${emoji.rotation}deg)`
						}}
						viewBox='0 0 32 32'>
						<text x='50%' y='50%' dominantBaseline='middle' textAnchor='middle'>
							{emoji.emoji}
						</text>
					</svg>
				))}

				<CustomCursor containerRef={containerRef} />
			</div>
		</>
	)
}
