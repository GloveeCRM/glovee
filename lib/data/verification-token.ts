import { prisma } from '@/prisma/prisma'
import { VerificationToken } from '@prisma/client'

/**
 * Fetches a verification token by token.
 * @param {string} token - The verification token.
 * @returns {Promise<VerificationToken | null>} The verification token or null if not found.
 */
export async function getVerificationTokenByToken(
  token: string
): Promise<VerificationToken | null> {
  const verifcationToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  return verifcationToken
}
