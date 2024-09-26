'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { LoginPayload, LoginValidator } from '@/lib/validators/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const LoginForm = () => {
	const router = useRouter()

	const form = useForm<LoginPayload>({
		resolver: zodResolver(LoginValidator),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { mutate: login, isPending } = useMutation({
		mutationFn: async (values: LoginPayload) => {
			const { email, password } = values

			const supabase = createClient()

			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			})

			if (error) throw new Error(error.message)

			return 'OK'
		},
		onError: err => {
			return toast.error(err.message)
		},
		onSuccess: data => {
			form.reset()
			toast.success('Zalogowano pomyślnie.')

			router.replace('/admin/blog')
		}
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => login(e))} className='mx-auto max-w-lg space-y-6'>
				<FormField
					control={form.control}
					name={'email'}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} placeholder={'john@doe.com'} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'password'}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input {...field} placeholder={'***********'} type='password' value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' disabled={isPending} className='mt-6 h-12 w-full rounded-full'>
					{isPending ? 'Logowanie...' : 'Zaloguj się'}
				</Button>
			</form>
		</Form>
	)
}
