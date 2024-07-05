import { Dictionary } from '@/app/[locale]/dictionaries'
import TypographyH2 from '@/components/ui/Typography/H2'
import { getTestimonials } from '@/constants/TESTIMONIALS'
import { Locales } from '@/i18nConfig'
import { cn } from '@/lib/utils'
import { TestimonialsContent } from './components/TestimonialsContent'

type Props = {
	dict: Dictionary
}

export const TestimonialsSection = async ({
	dict: {
		locale,
		home: {
			testimonials: { heading }
		}
	}
}: Props) => {
	const testimonials = await getTestimonials()

	return (
		<section className='mt-32 md:mt-36 xl:mt-48'>
			<TypographyH2
				className={cn('mx-auto mb-8 max-w-3xl text-balance text-center', locale === 'pl' && 'max-w-4xl xl:max-w-5xl')}>
				{heading}
			</TypographyH2>

			<div className='relative py-24 [clip-path:inset(-1rem)]'>
				<TestimonialsContent testimonials={testimonials} locale={locale as Locales} />

				<div className='fixed inset-0 -z-10'>
					<div className={cn('pointer-events-none absolute inset-0 -z-20 w-full bg-background bg-dot-white/25')}></div>
				</div>
				<div className='pointer-events-none absolute inset-[-1rem] -z-10 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_-20%,black_80%)]' />
			</div>
		</section>
	)
}
