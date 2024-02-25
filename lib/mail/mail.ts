import { Resend } from 'resend'

import { getCurrentOrgName } from '../utils/server'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Sends a verification email to the specified email address with a confirmation link.
 * @param email - The email address to send the verification email to.
 * @param token - The verification token to include in the confirmation link.
 * @returns A promise that resolves when the email is sent successfully.
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const orgName = getCurrentOrgName()

  let confirmLink = ''
  if (!orgName) {
    confirmLink = `${process.env.NEXT_PUBLIC_ROOT_URL}/new-verification?token=${token}`
  } else if (orgName && process.env.NEXT_PUBLIC_ROOT_DOMAIN === 'localhost:3000') {
    confirmLink = `http://${orgName}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/new-verification?token=${token}`
  } else {
    confirmLink = `https://${orgName}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/new-verification?token=${token}`
  }

  await resend.emails.send({
    from: `${process.env.RESEND_VERIFICATION_FROM_EMAIL}`,
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email </p>`,
  })
}

/**
 * Sends a password reset email to the specified email address.
 * @param email - The email address to send the password reset email to.
 * @param token - The token used for password reset.
 * @returns A promise that resolves when the email is sent successfully.
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const orgName = getCurrentOrgName()

  let resetLink = ''
  if (!orgName) {
    resetLink = `${process.env.NEXT_PUBLIC_ROOT_URL}/new-password?token=${token}`
  } else if (orgName && process.env.NEXT_PUBLIC_ROOT_DOMAIN === 'localhost:3000') {
    resetLink = `http://${orgName}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/new-password?token=${token}`
  } else {
    resetLink = `https://${orgName}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}//new-password?token=${token}`
  }

  await resend.emails.send({
    from: `${process.env.RESEND_RESET_PASSWORD_FROM_EMAIL}`,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset password </p>`,
  })
}
