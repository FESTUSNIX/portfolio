'use client'

import { Magnetic } from '@/components/Magnetic'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { ContactEmailPayload } from '@/lib/validators/contactForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from 'sonner'
import { z } from 'zod'
import { Dictionary } from '../../dictionaries'

type Props = {
	dict: Dictionary['contact']['form']
}

export const ContactForm = ({ dict }: Props) => {
	const IntlContactEmailValidator = z.object({
		name: z.string().min(1, { message: dict.fields.name.error }),
		email: z.string().email({ message: dict.fields.email.error }),
		message: z.string().min(1, { message: dict.fields.message.error })
	})

	const form = useForm<ContactEmailPayload>({
		resolver: zodResolver(IntlContactEmailValidator),
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
			return toast.error(dict.error)
		},
		onSuccess: data => {
			toast.success(dict.success)
			form.reset()
		}
	})

	const formTextStyles = 'text-3xl lg:text-5xl uppercase leading-none sm:text-4xl'
	const inputAnimateBorder =
		'relative h-full has-[>:focus-visible]:before:animate-[ScaleXToRight_0.3s_forwards] before:absolute before:bottom-0 before:z-10 before:w-full before:animate-[ScaleXToLeft_0.3s_forwards] before:origin-right before:duration-300 before:h-px before:bg-foreground'
	const inputStyles =
		'relative h-full w-full text-2xl border-b border-border bg-transparent py-2 outline-none placeholder:text-2xl placeholder:leading-tight placeholder:text-muted-foreground focus-visible:outline-none placeholder:uppercase'

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(e => sendEmail(e))}>
					<div className='flex flex-wrap items-center gap-x-8 gap-y-8'>
						<p className={formTextStyles}>{dict.fields.name.label}</p>

						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem className='h-12 grow'>
									<FormControl>
										<div
											className={cn(inputAnimateBorder, field.value && 'before:animate-[ScaleXToRight_0.3s_forwards]')}>
											<input {...field} placeholder={dict.fields.name.placeholder} className={inputStyles} />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<p className={formTextStyles}>{dict.fields.email.label}</p>

						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem className='h-12 grow'>
									<FormControl>
										<div
											className={cn(inputAnimateBorder, field.value && 'before:animate-[ScaleXToRight_0.3s_forwards]')}>
											<input {...field} placeholder={dict.fields.email.placeholder} className={inputStyles} />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex grow flex-wrap items-start gap-8'>
							<p className={formTextStyles}>{dict.fields.message.label}</p>

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
													placeholder={dict.fields.message.placeholder}
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
						className='group ml-auto mt-12 block p-0 text-2xl md:text-3xl lg:mt-16'
						disabled={isPending}
						type='submit'
						onClick={e => {
							e.preventDefault()
							form.handleSubmit(e => sendEmail(e))()
						}}>
						<Magnetic as='p' className='flex items-center px-16 py-6 hover:underline'>
							<>
								<span className='transition-elastic-out block group-active:scale-90'>
									{isPending ? dict.button.pending : dict.button.default}
								</span>
								{isPending && <span className='ml-4'>🚀</span>}
							</>
						</Magnetic>
					</Button>
				</form>
			</Form>
		</div>
	)
}
