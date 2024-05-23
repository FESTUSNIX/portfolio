import { EmojiAdd } from './components/EmojiAdd'

type Props = {}

// Visitors can add their emoji (one per ip address) to the board. Users can also see other users (cursors) in real-time.
export const EmojiBoard = (props: Props) => {
	return (
		<div className='relative aspect-[2/1] h-auto w-full border-y'>
			<EmojiAdd className='absolute left-1/2 top-4 z-20 -translate-x-1/2' />
			<div className='relative h-full w-full [clip-path:inset(0)] before:absolute before:h-full before:w-16 before:bg-gradient-to-r before:from-background before:to-background/0 after:absolute after:right-0 after:h-full after:w-16 after:bg-gradient-to-l after:from-background after:to-background/0'>
				<div className='fixed inset-0 -z-20 bg-dot-white/15'></div>
				{EMOJI_LIST.map(emoji => (
					<div
						key={emoji.id}
						className='pointer-events-none absolute select-none text-xl'
						style={{
							top: `${emoji.y * 100}%`,
							left: `${emoji.x * 100}%`,
							transform: `rotate(${emoji.rotation}deg)`
						}}>
						{emoji.emoji}
					</div>
				))}
			</div>
		</div>
	)
}

type Emoji = {
	id: number
	emoji: string
	x: number
	y: number
	rotation: number
}

const EMOJI_LIST: Emoji[] = [
	{
		id: 1,
		emoji: '😊',
		x: 0.25,
		y: 0.74,
		rotation: 45
	},
	{
		id: 2,
		emoji: '😂',
		x: 0.85,
		y: 0.14,
		rotation: 90
	},
	{
		id: 3,
		emoji: '😍',
		x: 0.63,
		y: 0.59,
		rotation: 120
	},
	{
		id: 4,
		emoji: '🤔',
		x: 0.11,
		y: 0.81,
		rotation: 75
	},
	{
		id: 5,
		emoji: '😎',
		x: 0.34,
		y: 0.21,
		rotation: 180
	},
	{
		id: 6,
		emoji: '🥳',
		x: 0.55,
		y: 0.67,
		rotation: 30
	},
	{
		id: 7,
		emoji: '😢',
		x: 0.78,
		y: 0.45,
		rotation: 60
	},
	{
		id: 8,
		emoji: '😡',
		x: 0.9,
		y: 0.3,
		rotation: 10
	},
	{
		id: 9,
		emoji: '🤩',
		x: 0.45,
		y: 0.89,
		rotation: 110
	},
	{
		id: 10,
		emoji: '😴',
		x: 0.67,
		y: 0.12,
		rotation: 45
	},
	{
		id: 11,
		emoji: '🤮',
		x: 0.15,
		y: 0.65,
		rotation: 90
	},
	{
		id: 12,
		emoji: '🤯',
		x: 0.29,
		y: 0.33,
		rotation: 120
	},
	{
		id: 13,
		emoji: '🥶',
		x: 0.77,
		y: 0.85,
		rotation: 135
	},
	{
		id: 14,
		emoji: '🥵',
		x: 0.5,
		y: 0.4,
		rotation: 50
	},
	{
		id: 15,
		emoji: '🙃',
		x: 0.22,
		y: 0.53,
		rotation: 85
	},
	{
		id: 16,
		emoji: '😬',
		x: 0.31,
		y: 0.76,
		rotation: 70
	},
	{
		id: 17,
		emoji: '😇',
		x: 0.4,
		y: 0.22,
		rotation: 95
	},
	{
		id: 18,
		emoji: '🤪',
		x: 0.88,
		y: 0.6,
		rotation: 160
	},
	{
		id: 19,
		emoji: '😜',
		x: 0.59,
		y: 0.15,
		rotation: 25
	},
	{
		id: 20,
		emoji: '🚀',
		x: 0.05,
		y: 0.02,
		rotation: 5
	},
	{
		id: 21,
		emoji: '💻',
		x: 0.1,
		y: 0.04,
		rotation: 5
	},
	{
		id: 22,
		emoji: '🍪',
		x: 0.13,
		y: 0.92,
		rotation: 5
	}
]
