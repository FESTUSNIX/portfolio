import { Locales } from '@/i18nConfig'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { enUS, pl, type Locale } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getDateLocale = (locale: Locales): Locale => {
	switch (locale) {
		case 'en':
			return enUS
		case 'pl':
			return pl
		default:
			return enUS
	}
}