import { z } from 'zod'

export const ContactEmailValidator = z.object({
	name: z.string().min(1, { message: 'Please provide your name' }),
	email: z.string().email({
		message: 'Please provide a valid email address'
	}),
	message: z.string().min(1, {
		message: 'Please provide a message'
	})
})

export type ContactEmailPayload = z.infer<typeof ContactEmailValidator>
