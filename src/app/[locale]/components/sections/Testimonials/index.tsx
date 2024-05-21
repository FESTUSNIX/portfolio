import { GridBackground } from '@/components/GridBackground'
import TypographyH2 from '@/components/ui/Typography/H2'
import { getTestimonials } from '@/constants/TESTIMONIALS'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TestimonialsContent } from './components/TestimonialsContent'

type Props = {}

export const TestimonialsSection = async (props: Props) => {
	const testimonials = await getTestimonials()

	return (
		<section className='mt-32 md:mt-36 xl:mt-48'>
			<TypographyH2 className='text-center'>See what people have to say</TypographyH2>

			<div className='relative py-24'>
				<TestimonialsContent testimonials={testimonials} />

				<GridBackground className='bg-grid-large-white/15' />
			</div>
		</section>
	)
}
