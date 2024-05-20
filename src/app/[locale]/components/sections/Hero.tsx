import { GridBackground } from '@/components/GridBackground'
import { ArrowDownLeft } from 'lucide-react'
import Image from 'next/image'
import { Dictionary } from '../../dictionaries'

type Props = {
	dict: Dictionary
}

export const Hero = ({ dict }: Props) => {
	return (
		<header className='container-fill relative flex h-max min-h-screen flex-col justify-center pt-12 md:pt-24'>
			<div className='grid-container'>
				<h1 className='sr-only'>Hello I&apos;m Mateusz Hada</h1>

				<div className='relative lg:mt-12 xl:mt-16 2xl:mt-32'>
					<div
						className='flex flex-col fill-foreground font-heading uppercase leading-none text-foreground'
						aria-hidden>
						<div className='flex flex-col md:flex-row md:items-end md:justify-between md:gap-16 lg:gap-24 xl:gap-32'>
							<svg viewBox='0 0 110 13' className='mb-4 w-[30%] min-w-48 shrink-0 grow-0 md:w-1/4'>
								<text x='0' y='12'>
									Hello, I&apos;m
								</text>
							</svg>
							<svg viewBox='0 0 100 13' className='w-full grow-0 md:w-[75%]'>
								<text x='0' y='12'>
									Mateusz
								</text>
							</svg>
						</div>

						<svg viewBox='0 0 61 13'>
							<text x='0' y='12'>
								Hada
							</text>
						</svg>
					</div>

					<div className='absolute -right-[5%] top-0 -z-10 w-[75%] max-w-md -translate-y-1/2 overflow-hidden rounded-sm lg:max-w-lg xl:-right-[10%] xl:max-w-xl 2xl:-top-6'>
						<Image
							src='/images/me-horizontal.png'
							alt='Mateusz Hada smiling to the camera'
							width={400}
							height={400}
							className='h-full w-full object-cover'
						/>
					</div>
					<div className='absolute bottom-[20%] left-[5%] -z-10 w-[50%] max-w-64 translate-y-full overflow-hidden rounded-sm lg:max-w-xs xl:max-w-sm'>
						<Image
							src='/images/me-vertical.png'
							alt='Mateusz Hada kickboxing'
							width={400}
							height={400}
							className='h-full w-full object-cover'
						/>
					</div>
				</div>

				<div className='ml-auto w-max'>
					<div className='ml-auto mt-12 w-max md:ml-16 md:mt-24 lg:-ml-16 lg:mt-12 xl:-ml-24'>
						<ArrowDownLeft
							className='size-12 stroke-1 md:size-16 md:-rotate-90 lg:size-20 xl:size-24'
							strokeLinecap='square'
							strokeLinejoin='miter'
						/>
					</div>

					<h2 className='mt-12 text-right text-2xl uppercase leading-none sm:text-3xl md:mt-8 md:text-4xl lg:mt-0 xl:text-5xl'>
						<span className='block'>Freelance</span>
						<span className='block'>Developer & Designer</span>
					</h2>
				</div>
			</div>
			<GridBackground className='bg-grid-large-white/5 md:bg-grid-xl-white/5' />
		</header>
	)
}
