import { GridBackground } from '@/components/GridBackground'
import { PlaceholderImage } from '@/components/PlaceholderImage'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Locales } from '@/i18nConfig'
import { createClient } from '@/lib/supabase/server'
import { cn, getDateLocale } from '@/lib/utils'
import { PostWithCategoryWithProfile } from '@/types/collection'
import { formatDuration } from 'date-fns'
import { CalendarIcon, TimerIcon } from 'lucide-react'
import { Roboto } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import readingTime from 'reading-time'
import { TableOfContents } from './components/TableOfContents'

const postBody = Roboto({ subsets: ['latin-ext'], variable: '--font-post-body', weight: ['400', '500', '900'] })

async function getPost(slug: string) {
	const supabase = createClient()

	const response = await supabase
		.from('posts')
		.select(`*, categories(*), profiles(*)`)
		.match({ slug: slug })
		.single<PostWithCategoryWithProfile>()

	if (!response.data) return notFound()

	return response.data
}

const BlogPostPage = async ({ params: { locale, slug } }: { params: { locale: Locales; slug: string } }) => {
	const post = await getPost(slug)

	const readTime = readingTime(post.content ? post.content : '')
	const dateLocale = getDateLocale(locale)

	return (
		<main className={cn('grid-container mt-20', postBody.variable)}>
			<article className='relative mt-24 grid grid-cols-[6fr_4fr] gap-x-16'>
				<header className='col-[1/2]'>
					<h1 className='mb-4 max-w-screen-sm font-heading text-8xl uppercase leading-none sm:text-9xl md:max-w-screen-md md:text-10xl xl:max-w-none'>
						{post.title}
					</h1>
					<p className='max-w-prose text-lg leading-tight text-muted-foreground'>{post.description}</p>

					<Separator className='mt-12 w-[calc(100%-2rem)]' />
				</header>
				<div className='col-[1/2] py-12'>
					<Suspense>
						<div
							className='tw-prose [font-family:var(--font-post-body)] prose-h1:font-body prose-h2:font-body'
							dangerouslySetInnerHTML={{ __html: post.content || '' }}
							suppressHydrationWarning
						/>
					</Suspense>
				</div>
				<aside className='col-[2/3] row-[1/3] h-full'>
					<div className='mb-4 aspect-[5/3] h-auto w-full rounded-xl'>
						<PlaceholderImage className='size-full' />
					</div>

					<div className='mb-12 flex items-center gap-2'>
						<Badge variant={'outline'} className='flex w-max items-center gap-2'>
							<TimerIcon className='size-3.5' />
							<span>
								{formatDuration(
									{ minutes: Math.round(readTime.minutes) },
									{
										locale: dateLocale
									}
								)}
							</span>
						</Badge>
						{post.created_at && (
							<Badge variant={'outline'} className='flex w-max items-center gap-2'>
								<CalendarIcon className='size-3.5' />
								<span>
									{new Date(post.created_at).toLocaleDateString(locale, {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</span>
							</Badge>
						)}
					</div>

					<TableOfContents />
				</aside>
			</article>

			<section className='my-12 border-t py-24'>SIMILIAR POSTS</section>

			<GridBackground className='container-fill top-0' />
		</main>
	)
}

export default BlogPostPage
