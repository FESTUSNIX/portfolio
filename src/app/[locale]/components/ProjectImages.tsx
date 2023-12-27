'use client'

import { useMouseFollower } from '@/components/MouseFollower/context/MouseFollowerContext'
import Image, { StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Props = {
	image: StaticImageData
}

export const ProjectImages = ({ image }: Props) => {
	const mouse = useMouseFollower()

	const ref = useRef<HTMLDivElement>(null)
	const [positionX, setPositionX] = useState('0%')
	const [positionY, setPositionY] = useState('-100%')

	useEffect(() => {
		const calculatePositionX = () => {
			if (!ref.current || !mouse.clientX) return

			const spaceLeft = mouse.clientX - ref.current.clientWidth
			const spaceRight = window.innerWidth - (mouse.clientX + ref.current.clientWidth)

			const threshold = 25

			if (spaceRight < threshold && spaceLeft < threshold) return setPositionX('-50%')

			if (spaceRight < threshold && positionX !== '-100%') return setPositionX('-100%')

			if ((spaceLeft < threshold || spaceRight > threshold) && positionX !== '0%') return setPositionX('0%')
		}

		calculatePositionX()
	}, [mouse.clientX])

	useEffect(() => {
		const calculatePositionY = () => {
			if (!ref.current || !mouse.clientY) return

			const spaceAbove = mouse.clientY - ref.current.clientHeight
			const spaceBelow = window.innerHeight - (mouse.clientY + ref.current.clientHeight)

			const threshold = 25

			if (spaceBelow < threshold && spaceAbove < threshold) return setPositionY('-50%')

			if (spaceBelow < threshold && positionY !== '-100%') return setPositionY('-100%')

			if ((spaceAbove < threshold || spaceBelow > threshold) && positionY !== '0%') return setPositionY('0%')
		}

		calculatePositionY()
	}, [mouse.clientY])

	return (
		<div
			ref={ref}
			className='pointer-events-none h-auto min-h-full w-[600px] max-w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-6rem)] origin-center -translate-y-full scale-0 overflow-hidden rounded-xl border opacity-0 duration-300 [animation-direction:reverse] [animation-duration:0.3s] group-hover:scale-100 group-hover:opacity-100 group-hover:[animation-direction:normal] group-hover:[animation-name:ScaleUp]'
			style={{
				transform: `translateX(${positionX}) translateY(${positionY})`
			}}>
			<Image src={image ?? ''} alt='' className='h-auto w-full' />
		</div>
	)
}
