'use client'

import { Locales } from '@/i18nConfig'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'
import { LayoutEmbeds } from './LayoutEmbeds'
import { LocaleContextProvider } from './LocaleProvider'

type Props = {
	children: React.ReactNode
	locale: Locales
}

const Providers = ({ children, locale }: Props) => {
	const [client] = useState(new QueryClient())

	return (
		<LocaleContextProvider locale={locale}>
			<QueryClientProvider client={client}>{children}</QueryClientProvider>
			<LayoutEmbeds />
		</LocaleContextProvider>
	)
}

export default Providers
