import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.HOST_URL}/new-verification?token=${token}`

  await resend.emails.send({
    from: `${process.env.RESEND_VERIFICATION_FROM_EMAIL}`,
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email </p>`,
  })
}
