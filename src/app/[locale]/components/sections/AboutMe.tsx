import { TextReveal, TextRevealContainer } from '@/components/TextReveal'
import { Dictionary } from '../../dictionaries'

type Props = {
	dict: Dictionary
}

export const AboutMeSection = ({
	dict: {
		home: {
			aboutMe: { description, heading }
		}
	}
}: Props) => {
	return (
		<section className='mt-16 lg:mt-36 xl:mt-48'>
			<TextRevealContainer wrapperClassName='mt-[-45vh] mb-[-45vh]'>
				<div className='flex w-full flex-col gap-6 md:gap-8 lg:flex-row lg:justify-between lg:gap-12'>
					<TextReveal
						textAs='h2'
						text={heading}
						className='max-w-lg text-2xl uppercase leading-tight mix-blend-difference sm:text-3xl md:text-4xl lg:max-w-xl xl:max-w-2xl xl:text-5xl'
					/>
					<p className='max-w-xs font-light leading-tight text-muted-foreground sm:self-end sm:text-right sm:text-lg md:max-w-md md:text-xl lg:max-w-sm'>
						{description}
					</p>
				</div>
			</TextRevealContainer>
		</section>
	)
}
