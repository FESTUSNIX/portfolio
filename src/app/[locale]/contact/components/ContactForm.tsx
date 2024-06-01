'use client'

import { Magnetic } from '@/components/Magnetic'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { ContactEmailPayload, ContactEmailValidator } from '@/lib/validators/contactForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from 'sonner'

type Props = {}

export const ContactForm = ({}: Props) => {
	const form = useForm<ContactEmailPayload>({
		resolver: zodResolver(ContactEmailValidator),
		defaultValues: {
			name: '',
			email: '',
			message: ''
		}
	})

	const { mutate: sendEmail, isPending } = useMutation({
		mutationFn: async (values: ContactEmailPayload) => {
			const payload: ContactEmailPayload = {
				name: values.name,
				email: values.email,
				message: values.message
			}

			const res = await fetch('/api/contactForm', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})

			if (!res.ok) throw new Error('Could not send email')

			return 'OK'
		},
		onError: err => {
			return toast.error('There was an error sending the email')
		},
		onSuccess: data => {
			toast.success('Email sent!')
			form.reset()
		}
	})

	const formTextStyles = 'text-3xl lg:text-5xl uppercase leading-none sm:text-4xl'
	const inputAnimateBorder =
		'relative h-full has-[>:focus-visible]:before:animate-[ScaleXToRight_0.3s_forwards] before:absolute before:bottom-0 before:z-10 before:w-full before:animate-[ScaleXToLeft_0.3s_forwards] before:origin-right before:duration-300 before:h-px before:bg-foreground'
	const inputStyles =
		'relative h-full w-full text-2xl border-b border-border bg-transparent py-2 outline-none placeholder:text-2xl placeholder:leading-tight placeholder:text-muted-foreground focus-visible:outline-none'

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(e => sendEmail(e))}>
					<div className='flex flex-wrap items-center gap-x-8 gap-y-8'>
						<p className={formTextStyles}>Hello, my name is</p>

						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem className='h-12 grow'>
									<FormControl>
										<div
											className={cn(inputAnimateBorder, field.value && 'before:animate-[ScaleXToRight_0.3s_forwards]')}>
											<input {...field} placeholder='YOUR NAME' className={inputStyles} />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<p className={formTextStyles}>and you can reach me on</p>

						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem className='h-12 grow'>
									<FormControl>
										<div
											className={cn(inputAnimateBorder, field.value && 'before:animate-[ScaleXToRight_0.3s_forwards]')}>
											<input {...field} placeholder='YOUR EMAIL ADDRESS' className={inputStyles} />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex grow flex-wrap items-start gap-8'>
							<p className={formTextStyles}>i&apos;m looking for</p>

							<FormField
								control={form.control}
								name='message'
								render={({ field }) => (
									<FormItem className='h-auto grow'>
										<FormControl>
											<div
												className={cn(
													inputAnimateBorder,
													'before:bottom-1',
													field.value && 'before:animate-[ScaleXToRight_0.3s_forwards]'
												)}>
												<TextareaAutosize
													{...field}
													placeholder='SERVICE / YOUR MESSAGE'
													className={cn(inputStyles, 'min-w-72 shrink-0 resize-none')}
													minRows={2}
													maxRows={5}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<Button
						className='ml-auto mt-12 block p-0 text-2xl md:text-3xl lg:mt-16'
						disabled={isPending}
						type='submit'
						onClick={() => {
							form.handleSubmit(e => sendEmail(e))()
						}}>
						<Magnetic className='px-16 py-6 hover:underline'>
							<>
								<span>{isPending ? 'Sending it' : 'Send it'}</span>
								{isPending && <span className='ml-4'>🚀</span>}
							</>
						</Magnetic>
					</Button>
				</form>
			</Form>
		</div>
	)
}
