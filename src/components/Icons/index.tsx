import { LucideProps } from 'lucide-react'

export const Icons = {
	spotify: (props: LucideProps) => (
		<svg
			{...props}
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='#1ED760'
			xmlns='http://www.w3.org/2000/svg'
			fillRule='evenodd'
			clipRule='evenodd'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z' />
		</svg>
	),
	locales: {
		pl: (props: LucideProps) => (
			<svg {...props} xmlns='http://www.w3.org/2000/svg' id='Flag of Poland' viewBox='0 0 16 10'>
				<rect width='16' height='10' fill='#fff' />
				<rect width='16' height='5' fill='#dc143c' y='5' />
			</svg>
		),
		en: (props: LucideProps) => (
			<svg {...props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7410 3900'>
				<rect width='7410' height='3900' fill='#b22234' />
				<path d='M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0' stroke='#fff' stroke-width='300' />
				<rect width='2964' height='2100' fill='#3c3b6e' />
				<g fill='#fff'>
					<g id='s18'>
						<g id='s9'>
							<g id='s5'>
								<g id='s4'>
									<path
										id='s'
										d='M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z'
									/>
									<use xlinkHref='#s' y='420' />
									<use xlinkHref='#s' y='840' />
									<use xlinkHref='#s' y='1260' />
								</g>
								<use xlinkHref='#s' y='1680' />
							</g>
							<use xlinkHref='#s4' x='247' y='210' />
						</g>
						<use xlinkHref='#s9' x='494' />
					</g>
					<use xlinkHref='#s18' x='988' />
					<use xlinkHref='#s9' x='1976' />
					<use xlinkHref='#s5' x='2470' />
				</g>
			</svg>
		)
	}
}
