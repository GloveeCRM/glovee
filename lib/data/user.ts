'use server'

import { UserType } from '@/lib/types/user'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'

export async function fetchClientProfileById(
  id: number,
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
): Promise<{ clients: UserType[] | null; total: number }> {
  try {
    const accessToken = await getSession()
    if (!accessToken) {
      return { clients: null, total: 0 }
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
      return { clients: null, total: 0 }
    } else {
      return { clients: data.data.clients, total: data.data.total }
    }
  } catch (error) {
    return { clients: null, total: 0 }
  }
}
