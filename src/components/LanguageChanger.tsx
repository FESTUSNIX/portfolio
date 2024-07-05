'use client'

import { Locales, i18nConfig } from '@/i18nConfig'
import { useTranslation } from '@/lib/translations'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useCurrentLocale } from 'next-i18n-router/client'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
	className?: string
}

const LanguageChanger = ({ className }: Props) => {
	const router = useRouter()
	const currentPathname = usePathname()
	const currentLocale = useCurrentLocale(i18nConfig) as Locales | undefined
	const [isPending, setIsPending] = useState(false)

	const { t } = useTranslation(currentLocale ?? 'en')

	const handleChange = (newLocale: Locales) => {
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
		<button
			disabled={isPending}
			className={cn('transition-elastic-out hover:underline active:scale-90 disabled:opacity-50', className)}
			onClick={() => {
				setIsPending(true)
				handleChange(currentLocale === 'en' ? 'pl' : 'en')
			}}>
			<span className='sr-only'>
				{t('global.changeLanguage')} {t(`global.locales.${(currentLocale ?? 'en') === 'en' ? 'pl' : 'en'}`)}
			</span>
			<span className='text-sm uppercase'>
				{isPending ? <Loader2 className='size-3 animate-spin' /> : currentLocale === 'en' ? 'pl' : 'en'}
			</span>
		</button>
	)
}
export default LanguageChanger
