import { BASE_URL } from '@/constants/BASE_URL'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/'
		},
		sitemap: `${BASE_URL}/sitemap.xml`
	}
}
