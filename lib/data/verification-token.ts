import { prisma } from '@/prisma/prisma'
import { VerificationToken } from '@prisma/client'

/**
 * Fetches a verification token by token.
 */
export async function getVerificationTokenByToken(
  token: string
): Promise<VerificationToken | null> {
  try {
    const verifcationToken = await prisma.verificationToken.findUnique({
      where: { token },
    })
    return verifcationToken
  } catch {
    return null
  }
}
