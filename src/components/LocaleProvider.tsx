'use client'

import { Locales } from '@/i18nConfig'
import { createContext, useContext } from 'react'

const LocaleContext = createContext<Locales>('en')

export const LocaleContextProvider = ({ children, locale }: { children: React.ReactNode; locale: Locales }) => {
	return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export const useLocaleContext = () => {
	const context = useContext(LocaleContext)

	if (!context) {
		console.log('useLocaleContext must be used inside an LocaleContextProvider')
		throw Error('useLocaleContext must be used inside an LocaleContextProvider')
	}

	return context
}
