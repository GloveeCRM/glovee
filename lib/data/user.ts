'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/prisma/prisma'
import { Organization, User } from '@prisma/client'
import { UserRole } from '@prisma/client'
import { UserStatus } from '@prisma/client'
import { GLOVEE_API_URL } from '../constants/api'
import { getSession } from '../auth/session'
import { UserType } from '../types/user'

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

export async function fetchClientsByOrgName(orgName: string): Promise<User[] | null> {
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
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Fetches a user by their ID.
 */
export async function fetchClientProfileById(
  id: string,
  orgName: string
): Promise<UserType | null> {
  try {
    const accessToken = await getSession()
    if (!accessToken) {
      return null
    }

    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/user/admin/client/${id}/profile`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return null
    } else {
      return data.data.user
    }
  } catch (error) {
    return null
  }
}

export async function searchClients(
  orgName: string,
  query: string = '',
  limit: number = 0,
  offset: number = 0
): Promise<UserType[]> {
  try {
    const accessToken = await getSession()
    if (!accessToken) {
      return []
    }

    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/user/admin/client/search?query=${query}&limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return []
    } else {
      return data.data.clients || []
    }
  } catch (error) {
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
