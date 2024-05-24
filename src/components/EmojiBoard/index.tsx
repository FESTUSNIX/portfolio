import { createClient } from '@/lib/supabase/server'
import { Board } from './components/Board'
import { EmojiAdd } from './components/EmojiAdd'

type Props = {}

export type Emoji = {
	id: number
	emoji: string
	x: number
	y: number
	rotation: number
}

export const EmojiBoard = async (props: Props) => {
	const supabase = createClient()

	const { data: emojis } = await supabase.from('emoji_board').select('id, emoji, x, y, rotation')

	return (
		<div className='relative z-10 aspect-[2/1] h-auto w-full border-y'>
			<EmojiAdd />
			<Board serverEmojis={emojis ?? []} />

			<div className='pointer-events-none absolute left-0 top-0 z-50 h-full w-16 bg-gradient-to-r from-background to-secondary/0' />
			<div className='pointer-events-none absolute right-0 top-0 z-50 h-full w-16 bg-gradient-to-l from-background to-secondary/0' />
		</div>
	)
}
