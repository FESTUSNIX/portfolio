'use client'

import { createClient } from '@/lib/supabase/client'
import { Auth } from '@supabase/auth-ui-react'
import { User } from '@supabase/supabase-js'
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery'
import { useEffect, useState } from 'react'
import { Emoji } from '..'
import { RealtimeCursors } from './RealtimeCursors'

type Props = {
	serverEmojis: Emoji[] | null
}

export const Board = ({ serverEmojis }: Props) => {
	const supabase = createClient()

	const isMd = useMediaQuery('(min-width: 768px)')

	const [emojis, setEmojis] = useState<Emoji[] | null>(serverEmojis)
	const [user, setUser] = useState<User>()

	useEffect(() => {
		const init = async () => {
			const {
				data: { user }
			} = await supabase.auth.getUser()
			if (user) {
				setUser(user)
			}
		}
		init()
		// Listen for login events and set user
		supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user)
		})
	}, [])

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

	if (!user) return <Auth supabaseClient={supabase} providers={[]} />
	if (!isMd) return null

	return (
		<>
			<div className='overflow-hiddens relative h-full w-full [clip-path:inset(0)]'>
				<div className='fixed inset-0 -z-20 bg-dot-white/15'></div>
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

				<RealtimeCursors client={supabase} userId={user.id} />
			</div>
		</>
	)
}
