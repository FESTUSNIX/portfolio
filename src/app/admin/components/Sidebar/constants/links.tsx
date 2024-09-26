import { Archive, NotebookPen, UserCog } from 'lucide-react'
import { ElementType } from 'react'

export const links: {
	title: string
	icon: ElementType
	href: string
	separate?: boolean
}[] = [
	{
		title: 'Blog',
		icon: NotebookPen,
		href: '/admin/blog'
	},
	{
		title: 'Categories',
		icon: Archive,
		href: '/admin/categories'
	},
	{
		title: 'Account settings',
		icon: UserCog,
		href: '/admin/account'
	}
]
