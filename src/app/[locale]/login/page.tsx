import TypographyH1 from '@/components/ui/Typography/H1'
import React from 'react'
import { LoginForm } from './components/LoginForm'
import TypographyH2 from '@/components/ui/Typography/H2'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type Props = {}

const LoginPage = async (props: Props) => {
	const supabase = createClient()
	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (user?.id) {
		return redirect('/admin')
	}

	return (
		<main className='grid-container my-24'>
			<div className='flex flex-col items-center justify-center gap-y-12'>
				<h1 className='scroll-m-20 font-heading text-8xl font-normal uppercase !leading-[0.8] transition-colors sm:text-9xl md:text-10xl lg:text-11xl xl:text-12xl'>
					Login
				</h1>

				<div className='w-full'>
					<LoginForm />
				</div>
			</div>
		</main>
	)
}

export default LoginPage
