import { Config } from './types/i18n'

const localesReadonlyArray = ['en', 'pl'] as const
export type Locales = (typeof localesReadonlyArray)[number]

export const locales = localesReadonlyArray.concat()

export const i18nConfig: Config = {
	locales: locales,
	defaultLocale: 'en'
}
