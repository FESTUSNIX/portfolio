export type SiteConfig = typeof siteConfig

export const siteConfig = {
	name: 'Mateusz Hada',
	url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://mateuszhada.com',
	links: { github: 'https://github.com/FESTUSNIX/portfolio' }
}
