import { Magnetic } from '@/components/Magnetic'
import { TOOLS } from '@/constants/TOOLS'
import Image from 'next/image'
import { Dictionary } from '../../dictionaries'

type Props = {
	dict: Dictionary
}

export const ToolsSection = ({
	dict: {
		home: {
			tools: { heading }
		}
	}
}: Props) => {
	return (
		<section className='relative mt-32 scroll-m-20 py-12 md:mt-36 xl:mt-40'>
			<h2 className='mb-8 text-center text-xl uppercase text-muted-foreground'>{heading}</h2>

			<div className='flex flex-wrap items-center justify-center gap-8 sm:px-12 md:gap-12'>
				{TOOLS.map((tool, index) => (
					<Magnetic key={index} className='group p-2'>
						<Image
							src={tool.image}
							alt={tool.name}
							width={96}
							height={64}
							className='pointer-events-none h-10 w-auto select-none brightness-0 invert sepia-[80%] duration-300 group-hover:scale-110 sm:h-12'
						/>
					</Magnetic>
				))}
			</div>
		</section>
	)
}
