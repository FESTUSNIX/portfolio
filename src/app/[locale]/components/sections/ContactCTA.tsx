import { Magnetic } from '@/components/Magnetic'
import { VortexBackground } from '@/components/VortexBackground'
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
			<TypographyH2 className='flex items-end justify-between gap-8 uppercase'>
				<span>{heading}</span>
				<ArrowDownLeft
					className='hidden aspect-square h-[1em] w-auto shrink-0 translate-x-[10%] translate-y-[5%] stroke-2 sm:block'
					strokeLinecap='butt'
					strokeLinejoin='round'
					aria-hidden
				/>
			</TypographyH2>

			<Link
				href={'/contact'}
				className={cn(
					buttonVariants(),
					'group overflow-hidden rounded-full border border-foreground bg-transparent p-0 text-3xl leading-none text-foreground sm:text-4xl md:text-5xl lg:text-6xl'
				)}>
				<VortexBackground
					rangeHue={360}
					particleCount={300}
					rangeTTL={400}
					rangeSpeed={0.2}
					particleGlowMode='light'
					canvasClassName='saturate-0 duration-300 group-hover:scale-110 group-hover:saturate-100 blur-0 group-hover:blur-0 flex'
					containerClassName='overflow-hidden rounded-full'
					className='overflow-hidden rounded-full mix-blend-difference'>
					<Magnetic
						strength={{ x: 0.1 }}
						className='block w-full rounded-full py-8 text-center hover:underline sm:py-10 md:py-12 lg:py-16'>
						<span className='transition-elastic-out block group-active:scale-90'>{button}</span>
					</Magnetic>
				</VortexBackground>
			</Link>
		</section>
	)
}
