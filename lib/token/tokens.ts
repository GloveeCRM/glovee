import { v4 as uuidv4 } from 'uuid'

import { upsertVerificationToken } from '../data/verification-token'
import { VerificationToken } from '@prisma/client'

/**
 * Generates and stores a verification token for the given email.
 * @param {string} email - The email for which the verification token is generated.
 * @param {number} expiresInSeconds - The number of seconds after which the token will expire.
 * @returns {Promise<VerificationToken>} - The generated verification token.
 */
export async function generateAndStoreVerificationToken(
  email: string,
  expiresInSeconds: number
): Promise<VerificationToken> {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + expiresInSeconds * 1000)
  const verificationToken = await upsertVerificationToken(email, token, expires)
  return verificationToken
}
