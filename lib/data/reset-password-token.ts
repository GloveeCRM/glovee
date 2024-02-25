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
