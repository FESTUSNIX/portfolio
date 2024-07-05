import { Locales } from '@/i18nConfig'

export type Testimonial = {
	id: number
	name: string
	role: string
	quote: Record<Locales, string> & { default: Locales }
	image: string
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
	return [
		{
			id: 1,
			name: 'Andrzej Gotfryd',
			role: "Powierzchnie Reklamowe & Helena's Sailing",
			quote: {
				en: 'The website made by Mateusz is a hit. Aesthetics, functionality and clarity - all at the highest level. Would recommend 💯',
				pl: 'Strona internetowa wykonana przez Mateusza to strzał w dziesiątkę. Estetyka, funkcjonalność i przejrzystość - wszystko na najwyższym poziomie. Polecam 💯',
				default: 'pl'
			},
			image: '/images/testimonials/andrzej-gotfryd.webp'
		},
		{
			id: 2,
			name: 'Marcin Niemczyk',
			role: 'CEO H2O Wod-Kan, Gaz, C.O.',
			quote: {
				en: 'Our team is very satisfied with the cooperation. Mateusz helped us to become known on the web in a very short time. It was a pleasure to work with him.',
				pl: 'Nasz zespół jest bardzo zadowolony z współpracy. Mateusz pomógł nam zaistnieć w internecie w bardzo krótkim czasie. Praca z nim była przyjemnością.',
				default: 'pl'
			},
			image: '/images/testimonials/marcin-niemczyk.webp'
		},
		{
			id: 3,
			name: 'Krzysztof Kulawik',
			role: "Helena's Sailing",
			quote: {
				en: 'Matthew understood our needs perfectly and created a website that reflects them perfectly. As a freebie, he also helped us with our social media branding. It was a great investment.',
				pl: 'Mateusz doskonale zrozumiał nasze potrzeby i stworzył stronę, która idealnie je odzwierciedla. W gratisie pomógł nam także z kreowaniem naszej marki w social mediach. To była świetna inwestycja.',
				default: 'pl'
			},
			image: '/images/testimonials/krzysztof-kulawik.webp'
		},
		{
			id: 4,
			name: 'Damian Urbańczyk',
			role: 'Studia dla Nauczycieli',
			quote: {
				en: 'Mateusz is a great developer. He is very professional and always delivers on time. I would recommend him to anyone.',
				pl: 'Mateusz to świetny programista. Jest bardzo profesjonalny i zawsze dostarcza na czas. Poleciłbym go każdemu.',
				default: 'en'
			},
			image: '/images/testimonials/damian-urbanczyk.webp'
		}
	]
}
