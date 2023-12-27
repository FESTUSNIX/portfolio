import { MouseFollower } from '@/components/MouseFollower'
import { MouseFollowerProvider } from '@/components/MouseFollower/context/MouseFollowerContext'
import TypographyH2 from '@/components/ui/Typography/H2'
import { projects } from '@/constants/projects'
import Image from 'next/image'
import Link from 'next/link'
import { StarParticles } from '../../../components/StarParticles'
import { ProjectImages } from './ProjectImages'

type Props = {
	translations: {
		heading: string
	}
}

export const Projects = ({ translations }: Props) => {
	return (
		<section className='my-auto py-12'>
			<TypographyH2 className='mb-6'>{translations.heading}</TypographyH2>

			<MouseFollowerProvider>
				<div className='flex flex-col gap-2'>
					{projects.map((project, i) => (
						<Link
							key={`project-${i}`}
							href={project.href}
							target='_blank'
							rel='noopener'
							className='group relative flex flex-row items-center gap-4 overflow-hidden rounded-md border px-4 py-2 text-xl hover:underline'>
							<Image src={project.logo} alt={`Logo ${project.name}`} className='h-8 w-8 rounded-sm border p-0.5' />

							<span>{project.name}</span>

							<MouseFollower>
								<ProjectImages image={project.image} />
							</MouseFollower>

							<div className='absolute inset-0 h-full w-full [clip-path:inset(0)]'>
								<StarParticles className='fixed' />
							</div>
						</Link>
					))}
				</div>
			</MouseFollowerProvider>
		</section>
	)
}
