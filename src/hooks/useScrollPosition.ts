'use client'

import useWindowScroll from 'beautiful-react-hooks/useWindowScroll'
import { useState } from 'react'

export const useScrollPosition = () => {
	const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })

	const onWindowScroll = useWindowScroll()

	onWindowScroll(event => {
		setScrollPosition({ x: window.scrollX, y: window.scrollY })
	})

	return scrollPosition
}
