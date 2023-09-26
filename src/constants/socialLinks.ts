import { Facebook, Github, type LucideIcon, Twitter, Linkedin } from 'lucide-react'

type SocialLink = {
	href: string
	name: string
	Icon: LucideIcon
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
	}
]
