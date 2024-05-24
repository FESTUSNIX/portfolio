'use client'

import { getUserSession } from '@/lib/supabase/client'
import { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js'
import useThrottledCallback from 'beautiful-react-hooks/useThrottledCallback'
import { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
	client: SupabaseClient
	userId: string
}

type CursorPosition = {
	x: number
	y: number
}

type CursorPositions = {
	[key: string]: CursorPosition
}

export const RealtimeCursors = ({ client, userId }: Props) => {
	const MOUSE_EVENT = 'cursor'

	const containerRef = useRef<HTMLDivElement>(null)
	const createdCursorsRef = useRef<string[]>([])

	const [session, setSession] = useState<any>()
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	const [channel, setChannel] = useState<RealtimeChannel | null>(null)

	const createUserMouseCursor = async (_userId: string) => {
		// Check if the cursor for this user has already been created
		if (createdCursorsRef.current.includes(_userId) || _userId === userId) return

		// Check if the cursor div for this user already exists
		const existingCursorDiv = document.getElementById(_userId + '-cursor')
		if (existingCursorDiv) {
			return
		}

		const cursorDiv = document.createElement('div')
		const svgElem = document.createElement('svg')
		svgElem.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">  
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
    </svg>
    `

		cursorDiv.id = _userId + '-cursor'
		cursorDiv.classList.add(
			'h-4',
			'w-4',
			'absolute',
			'z-50',
			'-scale-x-100',
			'-translate-x-1/2',
			'-translate-y-1/2',
			'duration-300',
			'ease-in-out',
			'pointer-events-none'
		)

		cursorDiv.style.color = getRandomColor()

		cursorDiv.appendChild(svgElem)
		if (containerRef) {
			containerRef.current!.appendChild(cursorDiv)
		}

		// Add the user to the list of created cursors
		createdCursorsRef.current.push(_userId)
	}

	const getRandomColor = useCallback(() => {
		const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

		const h = randomInt(0, 360)
		const s = randomInt(42, 98)
		const l = randomInt(40, 90)

		return `hsl(${h},${s}%,${l}%)`
	}, [])

	const receivedCursorPosition = ({ payload }: { [key: string]: any; type: 'broadcast'; event: string }) => {
		// console.log("Receiving cursor position: " + payload);
		const { userId: _userId, x, y } = payload || {}

		if (_userId === userId) return

		const cursorDiv = document.getElementById(_userId + '-cursor')

		if (cursorDiv) {
			cursorDiv.style.left = x + '%'
			cursorDiv.style.top = y + '%'
		} else {
			createUserMouseCursor(_userId)
		}
	}

	const throttledSendMousePosition = useThrottledCallback(
		(channel: RealtimeChannel, userId: string, x: number, y: number) => {
			return channel.send({
				type: 'broadcast',
				event: MOUSE_EVENT,
				payload: { userId, x, y }
			})
		},
		[],
		150
	)

	useEffect(() => {
		const containerElement = containerRef.current

		containerElement?.addEventListener('mousemove', e => {
			if (isAuthenticated && channel) {
				const container = document.querySelector('#container') // Get the container
				const containerOffset = container!.getBoundingClientRect()

				const containerWidth = containerOffset.width
				const containerHeight = containerOffset.height

				const xPercent = ((e.clientX - containerOffset.left) / containerWidth) * 100
				const yPercent = ((e.clientY - containerOffset.top) / containerHeight) * 100

				throttledSendMousePosition(channel, session?.user?.id, xPercent, yPercent)
			}
		})

		return () => {
			containerElement?.removeEventListener('mousemove', () => {})
		}
	}, [isAuthenticated, channel, session?.user?.id])

	useEffect(() => {
		if (channel) {
			// Subscribe to mouse events.
			channel
				.on('broadcast', { event: MOUSE_EVENT }, payload => {
					receivedCursorPosition(payload)
				})
				.subscribe()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [channel])

	useEffect(() => {
		getUserSession().then(session => {
			if (session?.user?.id) {
				setSession(session)
				setIsAuthenticated(true)
				const channel = client.channel('emoji-board')
				setChannel(channel)
			} else {
				setIsAuthenticated(false)
			}
		})
	}, [session?.user?.id])

	return (
		<div className='relative z-50 h-full w-full'>
			<div
				id='container'
				ref={containerRef}
				className='h-full w-full cursor-[url("/assets/custom-cursor.svg"),auto]'></div>
		</div>
	)
}
