import CircularText from '@/components/CircularText'
import { Magnetic } from '@/components/Magnetic'
import { VortexBackground } from '@/components/VortexBackground'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
	text: string
}

export const NewProjectCard = ({ text }: Props) => {
	return (
		<Link
			href={'/contact'}
			className='group relative block size-full overflow-hidden rounded-md border border-border bg-secondary'>
			<div className='absolute inset-0 z-10'>
				<VortexBackground
					rangeHue={360}
					particleCount={300}
					rangeTTL={400}
					rangeY={300}
					rangeSpeed={0.2}
					particleGlowMode='light'
					canvasClassName='saturate-0 duration-300 group-hover:scale-110 group-hover:saturate-100 flex'
					containerClassName='overflow-hidden relative'
					className='h-full'>
					<Magnetic strength={{ x: 0.05, y: 0.05 }} className='flex h-full w-full flex-col items-center justify-center'>
						<div className='scale-90 sm:scale-125 md:scale-100'>
							<div className='relative rounded-full border-8 border-foreground p-2 opacity-40 duration-300 group-hover:scale-125 group-active:scale-110'>
								<PlusIcon className='size-24' />
							</div>
							<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 group-hover:scale-125 group-active:scale-110'>
								<CircularText
									text={text + ' '}
									radius={80}
									className='animate-spin font-bold uppercase [animation-duration:15s]'
								/>
							</div>
						</div>
					</Magnetic>
				</VortexBackground>
			</div>
		</Link>
	)
}
