'use client'

import useMouse, { type MousePosition } from '@react-hook/mouse-position'
import { createContext, useContext, useRef } from 'react'

type MouseFollowerContextType = MousePosition | null

const MouseFollowerContext = createContext<MouseFollowerContextType>(null)

export const MouseFollowerProvider = ({ children }: { children: React.ReactNode }) => {
	const ref = useRef<HTMLDivElement>(null)
	const mouse = useMouse(ref, {
		enterDelay: 100,
		leaveDelay: 100
	})

	return (
		<MouseFollowerContext.Provider value={mouse}>
			<div ref={ref}>{children}</div>
		</MouseFollowerContext.Provider>
	)
}

export const useMouseFollower = () => {
	const context = useContext(MouseFollowerContext)

	if (!context) {
		throw new Error('useMouseFollower must be used within a MouseFollowerProvider')
	}

	return context
}
