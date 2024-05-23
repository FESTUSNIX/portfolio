import { cn } from '@/lib/utils'
import { SmilePlusIcon } from 'lucide-react'

type Props = {
	className?: string
}

export const EmojiAdd = ({ className }: Props) => {
	return (
		<div className={cn('', className)}>
			<button className='group flex h-10 items-center overflow-hidden rounded-full border bg-muted/40 text-muted-foreground backdrop-blur-sm duration-300 hover:border-muted-foreground hover:backdrop-blur-md'>
				<div className='-ml-px flex aspect-square h-full w-auto items-center justify-center rounded-full border duration-300 group-hover:border-muted-foreground'>
					<SmilePlusIcon className='size-6' />
				</div>
				<span className='py-1 pl-3 pr-4 uppercase leading-none'>Add your emoji</span>
			</button>
		</div>
	)
}
