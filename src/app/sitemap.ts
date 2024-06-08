import { BASE_URL } from '@/constants/BASE_URL'
import { Locales, locales } from '@/i18nConfig'
import { MetadataRoute } from 'next'

type Sitemap = MetadataRoute.Sitemap

const _ROUTES: Pick<Sitemap[number], 'url' | 'changeFrequency' | 'priority'>[] = [
	{ url: '', priority: 1, changeFrequency: 'yearly' },
	{ url: '/contact', priority: 0.8, changeFrequency: 'yearly' }
]

export default function sitemap(): Sitemap {
	const routes: Sitemap = _ROUTES.map(route => {
		const lastModified = new Date()

		return {
			...route,
			url: `${BASE_URL}${route.url}`,
			lastModified,
			alternates: {
				languages: locales
					.filter(locale => locale !== 'en')
					.reduce((acc, locale) => {
						acc[locale] = `${BASE_URL}/${locale}${route.url}`
						return acc
					}, {} as Record<Locales, string>)
			}
		}
	})

	return routes
}
