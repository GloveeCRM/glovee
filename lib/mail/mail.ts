import { Resend } from 'resend'

import { getCurrentOrgName } from '@/lib/utils/server'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Sends an email using the provided parameters.
 * @param {string} from - The email address to send the email from.
 * @param {string} to - The email address to send the email to.
 * @param {string} subject - The subject of the email.
 * @param {string} html - The HTML content of the email.
 * @returns {Promise<void>} A promise that resolves when the email is sent.
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
 * @param {string} email - The email address to send the verification email to.
 * @param {string} verificationToken - The token used for verification.
 * @returns {Promise<{ success: string }>} A promise that resolves with a success message if the email is sent successfully.
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
 * @param {string} email - The email address to send the password reset email to.
 * @param {string} token - The token used for password reset.
 * @returns {Promise<{ success: string }>} A promise that resolves with a success message if the email is sent successfully.
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
