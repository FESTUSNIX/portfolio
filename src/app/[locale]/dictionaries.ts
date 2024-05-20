import 'server-only'
import { Locales } from '../../i18nConfig'

const dictionaries = {
	en: () => import('@/dictionaries/en.json').then(module => module.default),
	pl: () => import('@/dictionaries/pl.json').then(module => module.default)
}

export const getDictionary = async (locale: Locales) => dictionaries[locale]()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
