import { Icons } from '@/components/Icons'
import { Facebook, Github, Linkedin, LucideProps, Twitter, type LucideIcon } from 'lucide-react'

type SocialLink = {
	href: string
	name: string
	Icon: LucideIcon | ((props: LucideProps) => JSX.Element)
}

export const socialLinks: SocialLink[] = [
	{
		href: 'https://github.com/FESTUSNIX',
		name: 'Github',
		Icon: Github
	},
	{
		href: 'https://www.facebook.com/HadaMateusz/',
		name: 'Facebook',
		Icon: Facebook
	},
	{
		href: 'https://twitter.com/Festusnix',
		name: 'Twitter',
		Icon: Twitter
	},
	{
		href: 'https://www.linkedin.com/in/mateusz-hada-411427276/',
		name: 'Linkedin',
		Icon: Linkedin
	},
	{
		href: 'https://www.buymeacoffee.com/mhada',
		name: 'Buy Me a Coffee',
		Icon: Icons.buymeacoffee
	}
]
