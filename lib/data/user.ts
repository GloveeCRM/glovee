import { prisma } from '@/prisma/prisma'
import { Organization, User } from '@prisma/client'

/**
 * Fetches a user by email and organization name.
 * @param {string} email - The email of the user.
 * @param {string} orgName - The name of the organization.
 * @returns {Promise<User | null>} The user or null if not found.
 */
export async function fetchUserByEmailAndOrgName(
  email: string,
  orgName: string
): Promise<(User & { organization: Organization | null }) | null> {
  try {
    const user = await prisma.user.findFirst({
      include: {
        organization: true,
      },
      where: {
        email: email,
        organization: {
          name: orgName,
        },
      },
    })

    return user
  } catch {
    return null
  }
}

/**
 * Fetches a user by their ID.
 * @param {string} id - The ID of the user.
 * @returns {Promise<User | null>} The user or null if not found.
 */
export async function fetchUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { id: id } })
  return user
}
