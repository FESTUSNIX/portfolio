'use client'

import { Dictionary, getDictionary } from '@/app/[locale]/dictionaries'
import { Locales } from '@/i18nConfig'
import { useQuery } from '@tanstack/react-query'

type Path<T> = T extends object
	? {
			[K in keyof T]: K extends string ? (T[K] extends object ? `${K}` | `${K}.${Path<T[K]>}` : `${K}`) : never
	  }[keyof T]
	: never

type NestedObjectKeyPath<T> = Path<T>

export type TranslationFn = (key: NestedObjectKeyPath<Dictionary>) => string

export const useTranslation = (locale: Locales) => {
	const { data: dictionary } = useQuery({
		queryKey: ['dictionary', locale],
		queryFn: async () => await getDictionary(locale)
	})

	const t: TranslationFn = (key: NestedObjectKeyPath<typeof dictionary>) => {
		const keys = key.split('.')
		let translation: any = dictionary

		if (!dictionary) return keys[keys.length - 1]

		for (const k of keys) {
			translation = translation[k as keyof Dictionary]

			if (!translation) return keys[keys.length - 1]
		}

		return translation
	}

	return { t }
}
