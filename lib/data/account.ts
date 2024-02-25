import { prisma } from '@/prisma/prisma'
import { Account } from '@prisma/client'

/**
 * Fetches an account by user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Account | null>} The account or null if not found.
 */
export async function fetchAccountByUserId(userId: string): Promise<Account | null> {
  try {
    const account = await prisma.account.findFirst({
      where: { userId: userId },
    })
    return account
  } catch {
    return null
  }
}
