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

/**
 * Updates or creates a verification token for a given email.
 * @param {string} email - The email associated with the verification token.
 * @param {string} token - The verification token.
 * @param {Date} expires - The expiration date of the verification token.
 * @returns {Promise<VerificationToken>} The upserted verification token.
 */
export async function upsertVerificationToken(
  email: string,
  token: string,
  expires: Date
): Promise<VerificationToken> {
  const verificationToken = await prisma.verificationToken.upsert({
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

  return verificationToken
}
