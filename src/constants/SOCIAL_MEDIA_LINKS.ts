import { Facebook, Github, Linkedin, LucideProps, Twitter, type LucideIcon } from 'lucide-react'

type SocialMediaLink = {
	href: string
	name: string
	Icon: LucideIcon | ((props: LucideProps) => JSX.Element)
}

export const SOCIAL_MEDIA_LINKS: SocialMediaLink[] = [
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
		name: 'X (Twitter)',
		Icon: Twitter
	},
	{
		href: 'https://www.linkedin.com/in/mateusz-hada-411427276/',
		name: 'Linkedin',
		Icon: Linkedin
	}
]
