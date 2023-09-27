'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Locales, i18nConfig, locales } from '@/i18nConfig'
import { Globe } from 'lucide-react'
import { useCurrentLocale } from 'next-i18n-router/client'
import { usePathname, useRouter } from 'next/navigation'
import { Icons } from '../Icons'
import { Button } from '../ui/button'

const LanguageChanger = () => {
	const router = useRouter()
	const currentPathname = usePathname()
	const currentLocale = useCurrentLocale(i18nConfig) as Locales | undefined

	const handleChange = (newLocale: string) => {
		// set cookie for next-i18n-router
		const days = 30
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		const expires = '; expires=' + date.toUTCString()
		document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

		if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
			router.push('/' + newLocale + currentPathname)
		} else {
			router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
		}

		router.refresh()
	}

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' size={'icon'} className='h-7 w-7'>
						<Globe className='h-4 w-4' />
						<span className='sr-only'>Zmień język / Change Language</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-max min-w-max' align='end'>
					<DropdownMenuRadioGroup value={currentLocale} onValueChange={handleChange}>
						{locales.map(locale => (
							<DropdownMenuRadioItem key={locale} value={locale} className=' [&_>_span:first-child]:hidden'>
								<span className='absolute left-2 flex h-max w-4 items-center justify-center overflow-hidden rounded-[2px]'>
									{Icons.locales[locale]({ className: 'h-full w-full' })}
								</span>
								<span className='font-heading uppercase tracking-widest'>{locale}</span>
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
export default LanguageChanger
