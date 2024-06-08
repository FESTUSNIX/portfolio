import { Facebook, Github, Linkedin, Twitter } from 'lucide-react'

export const SOCIAL_MEDIA_LINKS = {
	github: {
		href: 'https://github.com/FESTUSNIX',
		name: 'Github',
		Icon: Github
	},
	facebook: {
		href: 'https://www.facebook.com/HadaMateusz/',
		name: 'Facebook',
		Icon: Facebook
	},
	twitter: {
		href: 'https://twitter.com/Festusnix',
		name: 'X (Twitter)',
		Icon: Twitter
	},
	linkedin: {
		href: 'https://www.linkedin.com/in/mateusz-hada-411427276/',
		name: 'Linkedin',
		Icon: Linkedin
	}
} as const
