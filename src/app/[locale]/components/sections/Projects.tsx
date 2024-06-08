import TypographyH2 from '@/components/ui/Typography/H2'
import { PROJECT_TAGS, PROJECTS } from '@/constants/PROJECTS'
import { Locales } from '@/i18nConfig'
import Image from 'next/image'
import Link from 'next/link'
import { Dictionary } from '../../dictionaries'

type Props = {
	dict: Dictionary
}

export const ProjectsSection = ({
	dict: {
		locale,
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
				{PROJECTS.map((project, i) => (
					<li key={`project-${i}`} className='aspect-[4/3] h-auto w-full last:odd:col-span-full'>
						<Link
							href={project.href}
							target='_blank'
							className='group relative block size-full overflow-hidden rounded-md'>
							<div className='absolute inset-0 z-10 flex flex-col flex-wrap justify-between px-4 py-3 md:flex-row md:content-between md:items-start md:gap-4'>
								<div className='w-max rounded-full border border-border bg-background/80 px-2 py-1 text-sm font-light uppercase leading-none text-foreground backdrop-blur-md'>
									{project.name}
								</div>

								<ul className='flex flex-wrap-reverse items-center gap-1'>
									{project.tags.map((tag, i) => (
										<li key={`tag-${i}`}>
											<span className='inline-block w-max rounded-full border border-foreground/20 bg-background/40 px-2 py-1 text-xs font-light uppercase !leading-none text-foreground backdrop-blur-md lg:text-sm'>
												{PROJECT_TAGS[tag][locale as Locales]}
											</span>
										</li>
									))}
								</ul>
							</div>

							<Image
								src={project.image}
								alt={`${project.name}`}
								className='absolute inset-0 z-0 size-full rounded-md object-cover brightness-90 duration-200 ease-in group-hover:scale-105 group-hover:brightness-100 group-active:scale-95 md:brightness-50'
							/>
						</Link>
					</li>
				))}
			</ul>
		</section>
	)
}
