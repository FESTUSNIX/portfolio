'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {}

export const TableOfContents = (props: Props) => {
	const [toc, setToc] = useState<{ text: string; slug: string }[]>([])

	const getTableOfContents = () => {
		const headings = document.querySelectorAll('h2')
		const toc: { text: string; slug: string }[] = []

		headings.forEach(heading => {
			const text = heading.textContent ?? ''
			const slug = text.toLowerCase().replace(/\s/g, '-')

			toc.push({ text, slug })
		})
		// Remove duplicates from the array by the slug
		return toc.filter((v, i, a) => a.findIndex(t => t.slug === v.slug) === i)
	}

	useEffect(() => {
		const tableOfContents = getTableOfContents()
		setToc(tableOfContents)
	}, [])

	if (toc.length === 0) return null

	return (
		<div className='sticky top-24'>
			<h2 className='mb-6 text-2xl uppercase leading-tight'>Table of Contents</h2>

			<nav className='flex flex-col gap-y-2'>
				{toc?.map(({ text, slug }, i) => (
					<Link key={slug} href={`#${slug}`}>
						{i + 1}. {text}
					</Link>
				))}
			</nav>
		</div>
	)
}
