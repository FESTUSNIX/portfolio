import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'
import { links } from './constants/links'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Database, Tables } from '@/types/supabase'
import UserMenu from './UserMenu'
import MobileMenu from './MobileMenu'

const Sidebar = async () => {
	const supabase = createClient()
	const {
		data: { user },
		error
	} = await supabase.auth.getUser()
	console.log(error)
	if (!user?.id) return null

	const { data: profile } = await supabase.from('profiles').select('*').match({ id: user.id }).single()

	return (
		<nav className='fixed top-0 z-20 flex shrink-0 flex-row items-center border-border bg-background px-4 py-4 max-md:w-full md:h-screen md:flex-col md:border-r'>
			<Link href='/' className='hidden md:block'>
				<HomeIcon className='size-6' />
			</Link>

			<div className='hidden flex-col gap-2 md:mt-12 md:flex'>
				{links.map((link, index) => (
					<Fragment key={index}>
						<TooltipProvider>
							<Tooltip delayDuration={50}>
								<TooltipTrigger asChild>
									<Link
										href={link.href}
										className={cn(
											'group rounded-md',
											buttonVariants({
												variant: 'ghost',
												size: 'icon'
											})
										)}
										aria-label={link.title}>
										<link.icon className='h-5 w-5 text-muted-foreground duration-300 ' />
										<span className='sr-only'>{link.title}</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side='right' align='center'>
									<p>{link.title}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						{link.separate && <Separator className='hidden md:block' />}
					</Fragment>
				))}
			</div>

			<MobileMenu />

			<div className='ml-auto flex items-center gap-2 md:mt-auto md:flex-col md:gap-4'>
				{profile?.username && user.email && (
					<UserMenu
						user={{
							email: user.email,
							username: profile.username,
							avatar_url: profile?.avatar_url
						}}
						triggerClassName='rounded-full border'
					/>
				)}
			</div>
		</nav>
	)
}

export default Sidebar
