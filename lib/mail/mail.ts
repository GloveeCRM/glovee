import { headers } from 'next/headers'
import { Resend } from 'resend'
import { extractSubdomainFromHostname } from '../utils/url'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const headerList = headers()
  const hostname = headerList.get('host')
  const subdomain = extractSubdomainFromHostname(hostname!) || ''

  let confirmLink = ''
  if (!subdomain) {
    confirmLink = `${process.env.NEXT_PUBLIC_ROOT_URL}/new-verification?token=${token}`
  } else if (subdomain && process.env.NEXT_PUBLIC_ROOT_DOMAIN === 'localhost:3000') {
    confirmLink = `http://${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/new-verification?token=${token}&subdomain=${subdomain}`
  } else {
    confirmLink = `https://${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/new-verification?token=${token}&subdomain=${subdomain}`
  }

  await resend.emails.send({
    from: `${process.env.RESEND_VERIFICATION_FROM_EMAIL}`,
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email </p>`,
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_ROOT_URL}/new-password?token=${token}`

  await resend.emails.send({
    from: `${process.env.RESEND_VERIFICATION_FROM_EMAIL}`,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset password </p>`,
  })
}
