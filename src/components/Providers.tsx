'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'
import { LocaleContextProvider } from './LocaleProvider'
import { Locales } from '@/i18nConfig'

type Props = {
	children: React.ReactNode
	locale: Locales
}

const Providers = ({ children, locale }: Props) => {
	const [client] = useState(new QueryClient())

	return (
		<LocaleContextProvider locale={locale}>
			<QueryClientProvider client={client}>{children}</QueryClientProvider>
		</LocaleContextProvider>
	)
}

export default Providers
