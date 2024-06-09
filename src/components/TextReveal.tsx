'use client'

import { cn } from '@/lib/utils'
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion'
import { FC, ReactNode, createContext, useContext, useRef } from 'react'

const ScrollProgressContext = createContext<MotionValue<number> | null>(null)

export const useScrollProgress = () => useContext(ScrollProgressContext)

interface TextRevealContainerProps {
	wrapperClassName?: string
	containerClassName?: string
	children?: ReactNode
}

export const TextRevealContainer: FC<TextRevealContainerProps> = ({
	wrapperClassName,
	containerClassName,
	children
}) => {
	const targetRef = useRef<HTMLDivElement | null>(null)

	const { scrollYProgress } = useScroll({
		target: targetRef
	})

	return (
		<ScrollProgressContext.Provider value={scrollYProgress}>
			<div ref={targetRef} className={cn('relative z-0 h-[200vh]', wrapperClassName)}>
				<div
					className={cn('sticky top-0 mx-auto flex h-[50%] items-center bg-transparent py-[5rem]', containerClassName)}>
					{children}
				</div>
			</div>
		</ScrollProgressContext.Provider>
	)
}

interface TextRevealProps {
	text: string
	textAs?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	className?: string
}

export const TextReveal: FC<TextRevealProps> = ({ text, textAs, className }) => {
	const scrollYProgress = useScrollProgress()

	const words = text.split(' ')
	const Tag = textAs || 'p'

	return (
		<Tag className={cn('flex flex-wrap gap-[0.2em] text-muted-foreground', className)}>
			{words.map((word, i) => {
				const start = i / words.length
				const end = start + 1 / words.length

				return (
					<Word key={i} progress={scrollYProgress} range={[start, end]}>
						{word}
					</Word>
				)
			})}
		</Tag>
	)
}

interface WordProps {
	children: ReactNode
	progress: any
	range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
	const opacity = useTransform(progress, range, [0, 1])
	return (
		<span className='relative'>
			<span className={'absolute opacity-30'}>{children}</span>
			<motion.span style={{ opacity: opacity }} className={'text-foreground'}>
				{children}
			</motion.span>
		</span>
	)
}
