'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { links } from './constants/links'

const MobileMenu = () => {
	const [open, setOpen] = useState(false)

	const pathname = usePathname()

	useEffect(() => {
		setOpen(false)
	}, [pathname])

	return (
		<Sheet open={open} onOpenChange={open => setOpen(open)}>
			<SheetTrigger asChild>
				<Button variant={'ghost'} className='block md:hidden'>
					<Menu className='h-5 w-5 text-muted-foreground' />
				</Button>
			</SheetTrigger>
			<SheetContent side={'left'}>
				<div className='mt-12 flex flex-col gap-2'>
					{links.map((link, index) => {
						const Icon = link.icon

						return (
							<React.Fragment key={index}>
								<Link
									onClick={() => setOpen(false)}
									href={link.href}
									className='group flex items-center gap-4 rounded-md px-4 py-2 duration-300 hover:bg-secondary'>
									<Icon className='h-5 w-5 text-muted-foreground duration-300 group-hover:text-neutral-200' />
									<span className='group-hover:text-secondary-foreground'>{link.title}</span>
								</Link>

								{link.separate && <Separator className='' />}
							</React.Fragment>
						)
					})}
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default MobileMenu
