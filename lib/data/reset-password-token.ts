import { prisma } from '@/prisma/prisma'
import { ResetPasswordToken } from '@prisma/client'

/**
 * Fetches a reset password token by token.
 */
export async function fetchResetPasswordTokenByToken(
  token: string
): Promise<ResetPasswordToken | null> {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
      where: { token },
    })
    return resetPasswordToken
  } catch {
    return null
  }
}
