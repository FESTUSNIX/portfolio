'use client'

import { useEffect, useState, type ReactPortal } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
	children: React.ReactNode
}

export function Portal(props: PortalProps): ReactPortal | null {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return isMounted ? createPortal(props.children, document.body) : null // createPortal will not be rendered on the server. Only on the client after hydration
}
