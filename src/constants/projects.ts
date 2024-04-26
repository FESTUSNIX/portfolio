import { StaticImageData } from 'next/image'
import BillboardsIcon from '/public/images/projects/billboards/icon.svg'
import BillboardsPreview from '/public/images/projects/billboards/preview.webp'
import H2OIcon from '/public/images/projects/h2o/icon.svg'
import H2OPreview from '/public/images/projects/h2o/preview.webp'
import HelenasSailingIcon from '/public/images/projects/helenassailing/icon.svg'
import HelenasSailingPreview from '/public/images/projects/helenassailing/preview.webp'

type Project = {
	href: string
	name: string
	logo: any
	image: StaticImageData
}

export const projects: Project[] = [
	{
		href: 'https://h2otrzebinia.pl/',
		name: 'H2O Artykuły Wod-Kan, Gaz, C.O.',
		logo: H2OIcon,
		image: H2OPreview
	},
	{
		href: 'https://helenassailing.com/',
		name: "Helena's Sailing",
		logo: HelenasSailingIcon,
		image: HelenasSailingPreview
	},
	{
		href: 'https://reklamy.andrzejgotfryd.pl/',
		name: 'Andrzej Gotfryd Powierzchnie Reklamowe',
		logo: BillboardsIcon,
		image: BillboardsPreview
	}
]
