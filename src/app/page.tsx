import CurrentlyPlaying from '@/components/CurrentlyPlaying'
import { socialLinks } from '@/constants/socialLinks'
import Link from 'next/link'

export default async function Home() {
	return (
		<main className='wrapper flex min-h-screen flex-col py-24'>
			<div className='mb-24'>
				<h1 className='font-heading text-5xl font-black uppercase tracking-tight'>Mateusz Hada</h1>
				<h2 className='text-muted-foreground'>aka Festus(nix)</h2>
			</div>

			<div className='mb-12 flex flex-col gap-2'>
				{socialLinks.map((link, i) => (
					<Link
						key={`link-${i}`}
						href={link.href}
						target='_blank'
						rel='noopener'
						className='flex items-center gap-4 rounded-md border px-4 py-2 text-xl hover:underline'>
						<link.Icon className='h-5 w-5' />
						<span>{link.name}</span>
					</Link>
				))}
			</div>

			<CurrentlyPlaying />
		</main>
	)
}
