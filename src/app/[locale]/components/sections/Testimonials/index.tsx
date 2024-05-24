import TypographyH2 from '@/components/ui/Typography/H2'
import { getTestimonials } from '@/constants/TESTIMONIALS'
import { cn } from '@/lib/utils'
import { TestimonialsContent } from './components/TestimonialsContent'

type Props = {}

export const TestimonialsSection = async (props: Props) => {
	const testimonials = await getTestimonials()

	return (
		<section className='mt-32 md:mt-36 xl:mt-48'>
			<TypographyH2 className='text-center'>See what people have to say</TypographyH2>

			<div className='relative py-24 [clip-path:inset(-1rem)]'>
				<TestimonialsContent testimonials={testimonials} />

				<div className='fixed inset-0 -z-10'>
					<div className={cn('pointer-events-none absolute inset-0 -z-20 w-full bg-background bg-dot-white/25')}></div>
				</div>
				<div className='pointer-events-none absolute inset-[-1rem] -z-10 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_-20%,black_80%)]' />
			</div>
		</section>
	)
}
