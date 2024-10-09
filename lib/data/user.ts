'use server'

import { UserType } from '@/lib/types/user'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'
import { keysSnakeCaseToCamelCase } from '../utils/json'
import { getCurrentOrgName } from '../utils/server'

interface SearchUsersInput {
  filters?: {
    userID?: number
    role: string
  }
  query?: string
  limit?: number
  offset?: number
}

export async function searchUsers({
  filters = { userID: 0, role: '' },
  query = '',
  limit = 0,
  offset = 0,
}: SearchUsersInput): Promise<{ users: UserType[] | null; total: number }> {
  try {
    const accessToken = await getSession()
    if (!accessToken) {
      return { users: null, total: 0 }
    }

    const orgName = await getCurrentOrgName()

    const queryParams = new URLSearchParams()
    queryParams.append('user_id', filters.userID?.toString() || '')
    queryParams.append('role', filters.role)
    queryParams.append('search_query', query)
    queryParams.append('limit', limit.toString())
    queryParams.append('offset', offset.toString())

    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/user/search?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    const camelCaseData = keysSnakeCaseToCamelCase(data)

    if (camelCaseData.status === 'error') {
      return { users: null, total: 0 }
    } else {
      return { users: camelCaseData.data.clients, total: camelCaseData.data.total }
    }
  } catch (error) {
    return { users: null, total: 0 }
  }
}

export async function fetchProfilePictureUploadURL(
  orgName: string,
  clientID: number,
  mimeType: string
): Promise<string | null> {
  try {
    const accessToken = await getSession()
    if (!accessToken) {
      return null
    }

    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/user/admin/client/${clientID}/profile-picture-upload-url?mimeType=${mimeType}`,
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
      return data.data.uploadURL
    }
  } catch (error) {
    return null
  }
}
