import { Resend } from 'resend'

import { getCurrentOrgName } from '@/lib/utils/server'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Sends an email using the provided parameters.
 */
export async function sendEmail(
  from: string,
  to: string,
  subject: string,
  html: string
): Promise<void> {
  await resend.emails.send({ from, to, subject, html })
}

/**
 * Sends a verification email to the specified email address.
 */
export async function sendVerificationEmail(
  email: string,
  verificationToken: string
): Promise<{ success: string }> {
  const orgName = getCurrentOrgName()

  let confirmLink = ''
  if (!orgName) {
    confirmLink = `${process.env.NEXT_PUBLIC_ROOT_URL}/email-verification?token=${verificationToken}`
  } else if (orgName && process.env.NEXT_PUBLIC_ROOT_DOMAIN === 'localhost:3000') {
    confirmLink = `http://${orgName}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/email-verification?verificationToken=${verificationToken}`
  } else {
    confirmLink = `https://${orgName}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/email-verification?verificationToken=${verificationToken}`
  }

  const fromEmail = process.env.RESEND_VERIFICATION_FROM_EMAIL || ''
  const subject = 'Confirm your email'
  const content = `<p>Click <a href="${confirmLink}">here</a> to confirm email </p>`

  sendEmail(fromEmail, email, subject, content)

  return { success: 'Confirmation email sent!' }
}

/**
 * Sends a reset password email to the specified email address.
 */
export async function sendResetPasswordEmail(
  email: string,
  resetPasswordToken: string
): Promise<{ success: string }> {
  const orgName: string = getCurrentOrgName()

  let resetLink: string = ''
  if (!orgName) {
    resetLink = `${process.env.NEXT_PUBLIC_ROOT_URL}/set-new-password?resetPasswordToken=${resetPasswordToken}`
  } else if (orgName && process.env.NEXT_PUBLIC_ROOT_DOMAIN === 'localhost:3000') {
    resetLink = `http://${orgName}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/set-new-password?resetPasswordToken=${resetPasswordToken}`
  } else {
    resetLink = `https://${orgName}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/set-new-password?resetPasswordToken=${resetPasswordToken}`
  }

  const fromEmail = process.env.RESEND_RESET_PASSWORD_FROM_EMAIL || ''
  const subject = 'Reset your password'
  const content = `<p>Click <a href="${resetLink}">here</a> to reset password </p>`

  sendEmail(fromEmail, email, subject, content)

  return { success: 'Reset password email sent!' }
}
