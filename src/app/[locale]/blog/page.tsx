import { GridBackground } from '@/components/GridBackground'
import { Locales } from '@/i18nConfig'
import { cn } from '@/lib/utils'
import { getDictionary } from '../dictionaries'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { PostWithCategoryWithProfile } from '@/types/collection'
import { Suspense } from 'react'
import Pagination from './components/Pagination'
import PostCard from './components/PostCard'

type Props = {
	params: { locale: Locales }
	searchParams: { [key: string]: string | string[] | undefined }
}

const BlogPage = async ({ params: { locale }, searchParams }: Props) => {
	const {} = await getDictionary(locale)

	const supabase = createClient()

	// Fetch total pages
	const { count } = await supabase.from('posts').select('*', { count: 'exact', head: true })

	// Pagination
	const limit = 10
	const totalPages = count ? Math.ceil(count / limit) : 0
	const page =
		typeof searchParams.page === 'string' && +searchParams.page > 1 && +searchParams.page <= totalPages
			? +searchParams.page
			: 1
	const from = (page - 1) * limit
	const to = page ? from + limit : limit

	// Fetch posts
	const { data, error } = await supabase
		.from('posts')
		.select(`*, categories(*), profiles(*)`)
		// .eq('published', true)
		.order('created_at', { ascending: false })
		.range(from, to)
		.returns<PostWithCategoryWithProfile[]>()

	if (!data || error || !data.length) return <div>Could not find posts</div>

	return (
		<main className='grid-container mt-20 overflow-x-hidden'>
			<header className='my-24 flex h-max items-end justify-between gap-x-24'>
				<h1
					className={cn(
						'max-w-screen-sm font-heading text-8xl uppercase leading-none sm:text-9xl md:max-w-screen-md md:text-10xl lg:text-12xl xl:max-w-none xl:text-[16rem]',
						locale === 'pl' && 'xl:text-[12rem]'
					)}>
					Blog
				</h1>
			</header>

			<div className='mt-12'>
				<div className='space-y-8'>
					{data?.map(post => (
						<Suspense key={post.slug} fallback={<div>Loading post...</div>}>
							<PostCard post={post} locale={locale} />
						</Suspense>
					))}
				</div>
				{/* Pagination */}
				{totalPages > 1 && <Pagination page={page} totalPages={totalPages} baseUrl='/blog' pageUrl='?page=' />}
			</div>

			<GridBackground className='container-fill top-0' />
		</main>
	)
}

export default BlogPage
