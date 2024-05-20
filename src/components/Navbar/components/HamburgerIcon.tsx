'use client'

import { cn } from '@/lib/utils'

type Props = {
	toggle: () => void
	toggled: boolean
}

export const HamburgerIcon = ({ toggle, toggled }: Props) => {
	const label = toggled ? 'Close menu' : 'Open menu'

	const lineStyles =
		'h-px w-full bg-foreground duration-200 absolute origin-center left-1/2 -translate-x-1/2 -translate-y-1/2'

	return (
		<button onClick={toggle} className='size-9 relative flex flex-col items-center justify-center gap-2'>
			<span className='sr-only'>{label}</span>
			<div className='relative h-2 w-7'>
				<span className={cn(lineStyles, 'top-0', toggled && 'top-1/2 w-[80%] -rotate-45')} />
				<span className={cn(lineStyles, 'top-full', toggled && 'top-1/2 w-[80%] rotate-45')} />
			</div>
		</button>
	)
}
