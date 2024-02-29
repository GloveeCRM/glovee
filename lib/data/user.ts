import { prisma } from '@/prisma/prisma'
import { Organization, User } from '@prisma/client'

/**
 * Fetches a user by email and organization name.
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
 */
export async function fetchUserById(id: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } })
    return user
  } catch {
    return null
  }
}
