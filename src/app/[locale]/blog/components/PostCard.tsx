import { PlaceholderImage } from '@/components/PlaceholderImage'
import TypographyH3 from '@/components/ui/Typography/H3'
import TypographyMuted from '@/components/ui/Typography/Muted'
import { Locales } from '@/i18nConfig'
import { getDateLocale } from '@/lib/utils'
import { PostWithCategoryWithProfile } from '@/types/collection'
import { formatDuration } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import readingTime from 'reading-time'

export const dynamic = 'force-dynamic'

interface PostCardProps {
	post: PostWithCategoryWithProfile
	locale: Locales
}

const PostCard: React.FC<PostCardProps> = async ({ post, locale }) => {
	const readTime = readingTime(post.content ? post.content : '')
	const dateLocale = getDateLocale(locale)

	return (
		<Link href={`/blog/${post.slug}`} className='flex gap-6'>
			<div className='size-48 overflow-hidden rounded-lg border'>
				{/* <Image
						src={post.image}
						alt={post.title ?? 'Cover'}
						height={256}
						width={256}
						priority
						placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(256, 256))}`}
						className='size-full object-cover'
					/> */}

				<PlaceholderImage className='size-full' />
			</div>

			<div className='flex flex-col'>
				<TypographyH3 className='mb-2'>{post.title}</TypographyH3>
				<TypographyMuted className='max-w-prose'>{post.description}</TypographyMuted>

				<div className='mt-auto flex items-center gap-4'>
					{post.categories && (
						<div className=''>
							<span>{post.categories.title}</span>
						</div>
					)}
					<div className='flex items-center gap-2'>
						<CalendarIcon className='size-4' />
						<span>
							{formatDuration(
								{ minutes: Math.round(readTime.minutes) },
								{
									locale: dateLocale
								}
							)}
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default PostCard
