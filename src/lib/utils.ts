import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getLocalStorage(key: string, defaultValue: any) {
	if (localStorage === undefined) return
	const stickyValue = localStorage.getItem(key)
	return stickyValue !== null && stickyValue !== 'undefined' ? JSON.parse(stickyValue) : defaultValue
}

export function setLocalStorage(key: string, value: any) {
	if (localStorage === undefined) return
	localStorage.setItem(key, JSON.stringify(value))
}
