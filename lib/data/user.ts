'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/prisma/prisma'
import { Organization, User } from '@prisma/client'
import { UserRole } from '@prisma/client'
import { UserStatus } from '@prisma/client'

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
          orgName: orgName,
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

export async function fetchClientsByOrgName(orgName: string) {
  try {
    const clients = await prisma.user.findMany({
      where: {
        role: UserRole.ORG_CLIENT,
        organization: {
          orgName: orgName,
        },
      },
    })

    return clients
  } catch {
    return []
  }
}

export async function fetchClientsByOrgNameandSearchQuery(orgName: string, query: string) {
  try {
    const clients = await prisma.user.findMany({
      where: {
        role: UserRole.ORG_CLIENT,
        organization: {
          orgName: orgName,
        },
        OR: [
          {
            id: {
              contains: query,
            },
          },
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    })

    return clients
  } catch {
    return []
  }
}

export async function deactivateClientById(id: string) {
  try {
    await prisma.user.update({
      where: { id: id },
      data: {
        status: UserStatus.INACTIVE,
      },
    })

    revalidatePath('/admin/clients')
    return { success: 'Client deactived!' }
  } catch (error) {
    return { error: 'Client not found!' }
  }
}

export async function activateClientById(id: string) {
  try {
    await prisma.user.update({
      where: { id: id },
      data: {
        status: UserStatus.ACTIVE,
      },
    })

    revalidatePath('/admin/clients')
    return { success: 'Client activated!' }
  } catch (error) {
    return { error: 'Client not found!' }
  }
}
