'use server'

import { revalidatePath } from 'next/cache'

import { GLOVEE_API_URL } from '../constants/api'
import { getSession } from '../auth/session'
import { UserType } from '../types/user'

/**
 * Fetches a user by their ID.
 */
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
