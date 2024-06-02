import TypographyH2 from '@/components/ui/Typography/H2'
import { projects } from '@/constants/projects'
import Image from 'next/image'
import Link from 'next/link'
import { Dictionary } from '../../dictionaries'

type Props = {
	dict: Dictionary
}

export const ProjectsSection = ({
	dict: {
		home: {
			projects: { heading }
		}
	}
}: Props) => {
	return (
		<section id='projects' className='mt-32 scroll-m-20 md:mt-36 xl:mt-48'>
			<TypographyH2 className='mb-12 text-right'>
				<span className='block'>{heading.top} </span>
				<span className='flex items-center gap-4 sm:gap-8 lg:gap-12'>
					<span className='h-px grow bg-foreground' />
					<span>{heading.bottom}</span>
				</span>
			</TypographyH2>

			<ul className='grid gap-4 lg:grid-cols-2'>
				{projects.map((project, i) => (
					<Link
						key={`project-${i}`}
						href={project.href}
						target='_blank'
						className='relative aspect-[4/3] overflow-hidden rounded-md last:odd:col-span-full'>
						<div className='absolute inset-0 flex flex-col flex-wrap justify-between px-4 py-3 md:flex-row md:content-between md:items-start md:gap-4'>
							<div className='w-max rounded-full border bg-background px-2 py-1 text-sm font-light uppercase leading-none text-foreground'>
								{project.name}
							</div>

							<ul className='flex flex-wrap-reverse items-center gap-1'>
								{project.tags.map((tag, i) => (
									<li key={`tag-${i}`}>
										<span className='inline-block w-max rounded-full border border-foreground/20 bg-foreground/50 px-2 py-1 text-xs font-light uppercase !leading-none text-background backdrop-blur-md lg:text-sm'>
											{tag}
										</span>
									</li>
								))}
							</ul>
						</div>

						<Image src={project.image} alt={`${project.name}`} className='size-full object-cover' />
					</Link>
				))}
			</ul>
		</section>
	)
}
