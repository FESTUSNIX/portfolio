'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Loader2, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ButtonHTMLAttributes, useEffect, useState } from 'react'
import { Button, ButtonProps } from '../ui/button'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps

const ThemeSwitch = (buttonProps: Props) => {
	const [mounted, setMounted] = useState(false)
	const { theme, resolvedTheme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button {...buttonProps} className='h-7 w-7' variant={'ghost'} size={'icon'}>
					{resolvedTheme === 'dark' ? <Moon className='h-4 w-4' /> : <Sun className='h-4 w-4' />}
					<span className='sr-only'>Switch Theme / Zmień Motyw</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuRadioGroup
					value={theme}
					onValueChange={value => {
						value !== theme && setTheme(value)
					}}>
					<DropdownMenuRadioItem value='system'>System</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='light'>Light</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='dark'>Dark</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ThemeSwitch
