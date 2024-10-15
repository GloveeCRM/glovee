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
  searchQuery?: string
  limit?: number
  offset?: number
}

type SearchUsersOutputDTO = {
  users: UserType[] | null
  totalCount: number
}

export async function searchUsers({
  filters = { userID: 0, role: '' },
  searchQuery = '',
  limit = 0,
  offset = 0,
}: SearchUsersInput): Promise<SearchUsersOutputDTO | null> {
  try {
    const accessToken = await getSession()
    if (!accessToken) {
      return { users: null, totalCount: 0 }
    }

    const orgName = await getCurrentOrgName()

    const queryParams = new URLSearchParams()
    queryParams.append('user_id', filters.userID?.toString() || '')
    queryParams.append('role', filters.role)
    queryParams.append('search_query', searchQuery)
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
      return { users: null, totalCount: 0 }
    } else {
      return { users: camelCaseData.data.users, totalCount: camelCaseData.data.totalCount }
    }
  } catch (error) {
    return { users: null, totalCount: 0 }
  }
}

export async function fetchProfilePictureUploadURL(
  clientID: number,
  mimeType: string
): Promise<string | null> {
  try {
    const accessToken = await getSession()
    if (!accessToken) {
      return null
    }

    const orgName = await getCurrentOrgName()

    const queryParams = new URLSearchParams()
    queryParams.append('user_id', clientID.toString())
    queryParams.append('mime_type', mimeType)

    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/user/avatar/upload-intent?${queryParams.toString()}`,
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
    if (data.status === 'error') {
      return null
    } else {
      return camelCaseData.data.uploadURL
    }
  } catch (error) {
    return null
  }
}
