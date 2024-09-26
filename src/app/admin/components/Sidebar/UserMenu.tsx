'use client'

import React from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { Settings } from 'lucide-react'
import UserAvatar from '@/components/UserAvatar'
import { Profile } from '@/types/collection'
import { signOut } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Props = {
	user: Pick<Profile, 'username' | 'avatar_url'> & { email: string }
	triggerClassName?: string
}

const UserMenu = ({ user, triggerClassName }: Props) => {
	const { avatar_url, email, username } = user

	const router = useRouter()

	const handleSignOut = () => {
		signOut()
		router.replace('/login')
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={triggerClassName}>
				<UserAvatar
					className='h-10 w-10'
					user={{
						name: username || null,
						image: avatar_url || null
					}}
				/>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end' side='right'>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-1 leading-none'>
						{username && <p className='font-medium'>{username}</p>}
						{email && <p className='w-[200px] truncate text-sm text-muted-foreground'>{email}</p>}
					</div>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link href={'/admin/account'}>
						<Settings className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
						Account settings
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onSelect={event => {
						event.preventDefault()

						handleSignOut()
					}}
					className='cursor-pointer hover:!bg-destructive hover:!text-destructive-foreground'>
					<LogOut className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserMenu
