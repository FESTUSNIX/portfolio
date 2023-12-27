import { StaticImageData } from 'next/image'
import BillboardsIcon from '/public/images/projects/billboards/icon.svg'
import BillboardsPreview from '/public/images/projects/billboards/preview.webp'
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
