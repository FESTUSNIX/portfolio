import { Magnetic } from '@/components/Magnetic'
import Image from 'next/image'
import { Dictionary } from '../../dictionaries'

type Props = {
	dict: Dictionary
}

export const HeroSection = ({
	dict: {
		locale,
		home: {
			hero: { greeting, subheading }
		}
	}
}: Props) => {
	return (
		<header className='container-fill relative flex h-max min-h-screen flex-col justify-center overflow-hidden pt-12 md:pt-24'>
			<div className='grid-container relative pt-24 md:pt-0 lg:pt-12'>
				<h1 className='sr-only'>{greeting} Mateusz Hada</h1>

				<div className='group relative'>
					<div
						className='flex flex-col fill-foreground font-heading uppercase leading-none text-foreground'
						aria-hidden>
						<svg
							viewBox={locale === 'en' ? '0 0 37 13' : '0 0 55 16'}
							className='z-30 mb-1 w-[50%] min-w-48 shrink-0 grow-0 mix-blend-difference md:w-[40%] lg:mb-4 lg:w-1/4'>
							<text x='0' y={locale === 'en' ? '12' : '14'}>
								{greeting}
							</text>
						</svg>
						<div className='relative z-20 w-full grow-0 self-end mix-blend-difference md:w-[50%]'>
							<svg viewBox='0 0 34 13'>
								<text x='0' y='12'>
									Mateusz
								</text>
							</svg>
						</div>

						<svg viewBox='0 0 19.5 13' className='z-20 mt-[-1%] w-full mix-blend-difference md:w-[65%] lg:mt-[-2.5%]'>
							<text x='0' y='12'>
								Hada
							</text>
						</svg>
					</div>

					<div className='hero-img absolute -right-[5%] top-6 z-[25] w-[75%] max-w-md -translate-y-1/2 rotate-3 rounded-sm duration-300 hover:!blur-0 group-has-[.hero-img:hover]:blur-md md:left-0 md:top-[28%] md:w-[45%] md:max-w-none md:rotate-0 lg:left-[2.5%] lg:top-[26%] lg:z-20 lg:-rotate-3'>
						<Magnetic strength={{ x: 0.1, y: 0.1 }}>
							<Image
								src='/images/me-horizontal.png'
								alt='Mateusz Hada'
								width={700}
								height={500}
								priority
								className='pointer-events-none aspect-[320/169] size-full rounded-sm object-cover shadow-md'
							/>
						</Magnetic>
					</div>
					<div className='hero-img absolute bottom-[10%] left-[2%] z-10 w-[50%] max-w-64 translate-y-full -rotate-6 rounded-sm duration-300 hover:!blur-0 group-has-[.hero-img:hover]:blur-md md:bottom-[53.5%] md:left-auto md:right-0 md:w-[31%] md:max-w-none md:rotate-0 lg:bottom-[65%] lg:rotate-6'>
						<Magnetic strength={{ x: 0.1, y: 0.1 }}>
							<Image
								src='/images/me-vertical.png'
								alt='Mateusz Hada kickboxing'
								width={600}
								height={800}
								priority
								className='pointer-events-none aspect-[3/4] size-full rounded-sm object-cover'
							/>
						</Magnetic>
					</div>
				</div>

				<div className='ml-auto mt-16 w-max max-w-36 text-right text-foreground sm:max-w-[11.5rem] md:absolute md:bottom-[-2%] md:mt-0 md:w-full md:max-w-none md:-translate-y-1/2 md:text-center'>
					<h2 className='text-2xl uppercase leading-none mix-blend-difference sm:text-3xl md:sr-only md:text-4xl xl:text-5xl'>
						{subheading}
					</h2>
					<svg
						viewBox={locale === 'en' ? '0 0 350 16' : '0 0 297 16'}
						aria-hidden
						className='z-20 hidden w-full fill-foreground uppercase leading-none mix-blend-difference md:block'>
						<text x='0' y='13'>
							{subheading}
						</text>
					</svg>
				</div>
				<svg
					viewBox={locale === 'en' ? '0 0 350 16' : '0 0 297 16'}
					aria-hidden
					className='text-stroke-foreground pointer-events-none absolute bottom-[-2%] z-40 hidden w-full -translate-y-1/2 select-none fill-transparent stroke-foreground stroke-[0.2px] uppercase leading-none md:block'>
					<text x='0' y='13'>
						{subheading}
					</text>
				</svg>
			</div>
		</header>
	)
}
