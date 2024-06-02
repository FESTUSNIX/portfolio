type Props = {}

export const AboutMeSection = (props: Props) => {
	return (
		<section className='mt-16 flex flex-col gap-6 md:gap-8 lg:mt-32 lg:flex-row lg:justify-between lg:gap-12'>
			<h2 className='max-w-lg text-2xl uppercase leading-tight mix-blend-difference sm:text-3xl md:text-4xl lg:max-w-xl xl:max-w-2xl xl:text-5xl'>
				Creating websites that grow with your business & make your brand stand out
			</h2>
			<p className='max-w-xs font-light leading-tight text-muted-foreground sm:self-end sm:text-right sm:text-lg md:max-w-md md:text-xl lg:max-w-sm lg:self-start'>
				I&apos;m an 18-year-old web developer from Poland. When I&apos;m not working, you&apos;ll find me kickboxing,
				cycling and drinking (a bit to much) coffee.
			</p>
		</section>
	)
}
