import { type Locales } from '@/i18nConfig'
import { StaticImageData } from 'next/image'
import BillboardsPreview from '/public/images/projects/billboards/preview.webp'
import H2OPreview from '/public/images/projects/h2o/preview.webp'
import HelenasSailingPreview from '/public/images/projects/helenassailing/preview.webp'
import SDNPreview from '/public/images/projects/sdn/temp-preview.png'

type Project = {
	href: string
	name: string
	image: StaticImageData
	tags: ProjectTagKeys[]
	description: Record<Locales, string>
}

export const PROJECTS: Project[] = [
	{
		href: 'https://h2otrzebinia.pl/',
		name: 'H2O Artykuły Wod-Kan, Gaz, C.O.',
		image: H2OPreview,
		tags: ['UI_UX_DESIGN', 'DEVELOPMENT', 'MARKETING'],
		description: {
			pl: 'Sklep z artykułami Wod-Kan, Gaz, C.O.',
			en: 'Store with water-sewage, gas, heating articles'
		}
	},
	{
		href: 'https://helenassailing.com/',
		name: "Helena's Sailing",
		image: HelenasSailingPreview,
		tags: ['UI_UX_DESIGN', 'DEVELOPMENT', 'BRAND_ASSETS'],
		description: {
			pl: 'Czarter jachtów na terenie Chorwacji',
			en: 'Yacht charter company in Croatia'
		}
	},
	{
		href: 'https://reklamy.andrzejgotfryd.pl/',
		name: 'Andrzej Gotfryd Powierzchnie Reklamowe',
		image: BillboardsPreview,
		tags: ['UI_UX_DESIGN', 'DEVELOPMENT', 'BRAND_ASSETS'],
		description: {
			pl: 'Firma wynajmująca powierzchnie reklamowe',
			en: 'Company renting advertising spaces'
		}
	}
	// {
	// 	href: 'https://sdn-theta.vercel.app/',
	// 	name: 'Studia Dla Nauczycieli',
	// 	image: SDNPreview,
	// 	tags: ['UI_UX_DESIGN', 'DEVELOPMENT', 'STARTUP'],
	// 	description: {
	// 		pl: 'Wyszukiwarka studiów podyplomowych dla nauczycieli',
	// 		en: 'Postgraduate studies finder'
	// 	}
	// }
]

type ProjectTagKeys = 'UI_UX_DESIGN' | 'DEVELOPMENT' | 'MARKETING' | 'BRAND_ASSETS' | 'STARTUP'

export const PROJECT_TAGS: Record<ProjectTagKeys, Record<Locales, string>> = {
	UI_UX_DESIGN: {
		pl: 'Projekt UI/UX',
		en: 'UI/UX Design'
	},
	DEVELOPMENT: {
		pl: 'Stworzenie strony',
		en: 'Development'
	},
	MARKETING: {
		pl: 'Marketing',
		en: 'Marketing'
	},
	BRAND_ASSETS: {
		pl: 'Identyfikacja wizualna',
		en: 'Brand Assets'
	},
	STARTUP: {
		pl: 'Startup',
		en: 'Startup'
	}
}
