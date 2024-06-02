import { Magnetic } from '@/components/Magnetic'
import TypographyH2 from '@/components/ui/Typography/H2'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowDownLeft } from 'lucide-react'
import Link from 'next/link'
import { Dictionary } from '../../dictionaries'

type Props = {
	dict: Dictionary
}

export const ContactCTASection = ({
	dict: {
		home: {
			contactCTA: { button, heading }
		}
	}
}: Props) => {
	return (
		<section className='my-24 flex flex-col gap-6 sm:gap-8 lg:gap-12'>
			<TypographyH2 className='uppercase'>
				<span className='block'>{heading.split(' ').slice(0, -1).join(' ')}</span>
				<span className='relative block w-full'>
					{heading.split(' ').slice(-1)}
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
					'group overflow-hidden rounded-full p-0 text-3xl leading-none sm:text-4xl md:text-5xl lg:text-6xl'
				)}>
				<Magnetic
					strength={{ x: 0.1 }}
					className='block w-full rounded-full py-8 text-center hover:underline sm:py-10 md:py-12 lg:py-16'>
					<span className='transition-elastic-out block group-active:scale-90'>{button}</span>
				</Magnetic>
			</Link>
		</section>
	)
}
