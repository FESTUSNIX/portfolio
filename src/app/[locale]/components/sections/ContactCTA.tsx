import TypographyH2 from '@/components/ui/Typography/H2'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowDownLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {}

export const ContactCTASection = (props: Props) => {
	return (
		<section className='my-24 flex flex-col gap-6 sm:gap-8 lg:gap-12'>
			<TypographyH2 className='uppercase'>
				<span className='block'>Let&apos;s work </span>
				<span className='relative block w-full'>
					together
					<ArrowDownLeft
						className='absolute right-0 top-1/2 hidden h-[1.5em] w-auto -translate-y-1/2 stroke-2 min-[360px]:block'
						strokeLinecap='butt'
						strokeLinejoin='round'
						aria-hidden
					/>
				</span>
			</TypographyH2>

			<Link
				href={'/contact'}
				className={cn(
					buttonVariants(),
					'py-8 text-2xl leading-none sm:py-10 sm:text-3xl md:py-12 md:text-4xl lg:py-16 lg:text-5xl'
				)}>
				Get in touch
			</Link>
		</section>
	)
}
