'use server'

import { Locales } from '@/i18nConfig'
import { getDictionary } from './[locale]/dictionaries'

export const getDictionaryClient = async (locale: Locales) => {
	return await getDictionary(locale)
}
