import ContactEmailTemplate from '@/components/ContactEmailTemplate'
import { contactInfo } from '@/constants/contactInfo'
import { mailTransporter } from '@/lib/nodemailer/transporter'
import { ContactEmailValidator } from '@/lib/validators/contactForm'
import { render } from '@react-email/render'
import { z } from 'zod'

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const { name, email, message } = ContactEmailValidator.parse(body)

		const plainText = `Name: ${name}, Email: ${email}, Message: ${message}`
		const emailHtml = render(ContactEmailTemplate({ name, email, message }))

		const data = await mailTransporter.sendMail({
			from: `"Contact Form" <${contactInfo.email}>`,
			to: [`${contactInfo.email}`],
			subject: `Contact Form - ${email}`,
			text: plainText,
			html: emailHtml
		})

		return new Response(JSON.stringify(data))
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid POST request data passed', { status: 422 })
		}

		return new Response('Could not send email', { status: 500 })
	}
}
