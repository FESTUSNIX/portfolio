import { i18nRouter } from 'next-i18n-router'
import { NextRequest } from 'next/server'
import { i18nConfig } from './i18nConfig'
import { updateSession } from './lib/supabase/middleware'

export async function middleware(request: NextRequest) {
	await updateSession(request)

	if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/auth')) return
	return i18nRouter(request, i18nConfig)
}

export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)'
}
