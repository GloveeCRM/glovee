import { prisma } from '@/prisma/prisma'
import { ResetPasswordToken } from '@prisma/client'

/**
 * Fetches a reset password token by token.
 * @param {string} token - The reset password token.
 * @returns {Promise<ResetPasswordToken | null>} The reset password token or null if not found.
 */
export async function fetchResetPasswordTokenByToken(
  token: string
): Promise<ResetPasswordToken | null> {
  const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
    where: { token },
  })
  return resetPasswordToken
}

/**
 * Updates or creates a reset password token for a given email.
 * @param {string} email - The email associated with the reset password token.
 * @param {string} token - The reset password token.
 * @param {Date} expires - The expiration date of the reset password token.
 * @returns {Promise<ResetPasswordToken>} The upserted reset password token.
 */
export async function upsertResetPasswordToken(
  email: string,
  token: string,
  expires: Date
): Promise<ResetPasswordToken> {
  const resetPasswordToken = await prisma.resetPasswordToken.upsert({
    create: {
      email: email,
      token: token,
      expires: expires,
    },
    update: {
      token: token,
      expires: expires,
    },
    where: {
      email: email,
    },
  })

  return resetPasswordToken
}
