'use client'

import { cn } from '@/lib/utils'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { BufferAttribute, PerspectiveCamera, Points } from 'three'

const cursor = {
	x: 0,
	y: 0
}

const particlesCount = 1000

const posArray = new Float32Array(particlesCount * 3)
for (let i = 0; i < particlesCount * 3; i++) {
	posArray[i] = (Math.random() - 0.5) * (Math.random() * 6)
}

const particlesBuffer = new BufferAttribute(posArray, 3)

const Particles = () => {
	const particlesRef = useRef<Points>(null)

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime()

		if (!particlesRef.current) return

		particlesRef.current.rotation.y = 0.05 * elapsedTime
	})

	return (
		<points ref={particlesRef}>
			<pointsMaterial size={0.005} opacity={0.4} transparent />
			<bufferGeometry attributes={{ position: particlesBuffer }} />
		</points>
	)
}

const Camera = ({ children }: { children: React.ReactNode }) => {
	const camera = useRef<PerspectiveCamera>(null)

	window.addEventListener('mousemove', event => {
		cursor.x = event.clientX
		cursor.y = event.clientY
	})

	useFrame(() => {
		if (cursor.x > 0 && camera.current) {
			camera.current.rotation.x = (-cursor.y * 0.0005) / 10
			camera.current.rotation.y = (-cursor.x * 0.0005) / 10
		}
	})
	return (
		<perspectiveCamera ref={camera} fov={75} near={0.1} far={100} position={[0, 0, 2]}>
			{children}
		</perspectiveCamera>
	)
}

type Props = {
	className?: string
}

export const StarParticles = ({ className }: Props) => {
	return (
		<div className={cn('pointer-events-none absolute inset-0 -z-50 h-full w-full', className)}>
			<Canvas>
				<ambientLight color={'#ffffff'} intensity={1} position={[2, 3, 4]} />

				<Camera>
					<Particles />
				</Camera>
			</Canvas>
		</div>
	)
}
