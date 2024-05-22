export type Testimonial = {
	id: number
	name: string
	role: string
	quote: string
	image: string
}

const getRandomPortret = async () => {
	const res = await fetch('https://randomuser.me/api/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})

	const data = await res.json()

	return data.results[0].picture.large
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
	return [
		{
			id: 1,
			name: 'Julian von Dandelion',
			role: 'CEO at Corvo Bianco',
			quote:
				'Lorem ipsum dolor sit amet consecteur adpiscing elit, Festus emhyr var emreis aep ignii, axii oot zirael. Aard niflgaard ratt gwint cirilla',
			image: await getRandomPortret()
		},
		{
			id: 2,
			name: 'Geralt of Rivia',
			role: 'Witcher',
			quote:
				'Mateusz is the best developer I have ever worked with. He is always on time and delivers high quality work.',
			image: await getRandomPortret()
		},
		{
			id: 3,
			name: 'Yennefer of Vengerberg',
			role: 'Lodge of Sorceresses',
			quote:
				'Working with Mateusz was a pleasure. There was no need for any revisions, he got it right the first time. He also has a great sense of humor.',
			image: await getRandomPortret()
		},
		{
			id: 4,
			name: 'Triss Merigold',
			role: 'Lodge of Sorceresses',
			quote:
				'Mateusz is a great developer. He is very professional and always delivers on time. I would recommend him to anyone.',
			image: await getRandomPortret()
		},
		{
			id: 5,
			name: 'Ciri',
			role: 'Witcher',
			quote:
				'Mateusz is a great developer. He is very professional and always delivers on time. I would recommend him to anyone.',
			image: await getRandomPortret()
		},
		{
			id: 6,
			name: 'Regis',
			role: 'Higher Vampire',
			quote:
				'Mateusz is a great developer. He is very professional and always delivers on time. I would recommend him to anyone.',
			image: await getRandomPortret()
		},
		{
			id: 7,
			name: 'Dandelion',
			role: 'Bard',
			quote:
				'Mateusz is a great developer. He is very professional and always delivers on time. I would recommend him to anyone.',
			image: await getRandomPortret()
		},
		{
			id: 8,
			name: 'Zoltan Chivay',
			role: 'Dwarf',
			quote:
				'Mateusz is a great developer. He is very professional and always delivers on time. I would recommend him to anyone.',
			image: await getRandomPortret()
		},
		{
			id: 9,
			name: 'Vernon Roche',
			role: 'Temerian Special Forces',
			quote:
				'Mateusz is a great developer. He is very professional and always delivers on time. I would recommend him to anyone.',
			image: await getRandomPortret()
		},
		{
			id: 10,
			name: 'Lambert',
			role: 'Witcher',
			quote:
				'Mateusz is a great developer. He is very professional and always delivers on time. I would recommend him to anyone.',
			image: await getRandomPortret()
		},
		{
			id: 11,
			name: 'Eskel',
			role: 'Witcher',
			quote:
				'Mateusz is a great developer. He is very professional and always delivers on time. I would recommend him to anyone.',
			image: await getRandomPortret()
		},
		{
			id: 12,
			name: 'Vesemir',
			role: 'Witcher',
			quote:
				'Mateusz is a great developer. He is very professional and always delivers on time. I would recommend him to anyone.',
			image: await getRandomPortret()
		}
	]
}
