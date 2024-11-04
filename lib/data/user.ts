'use server'

import { UserType } from '@/lib/types/user'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'
import { keysSnakeCaseToCamelCase } from '../utils/json'
import { getCurrentOrgName } from '../utils/server'
import { apiRequest, extractTotalCountFromHeaders } from '../utils/http'
import { errorMessages } from '../constants/errors'

interface SearchClientsFilters {
  userID?: number
}

interface SearchClientsInputProps {
  filters?: SearchClientsFilters
  searchQuery?: string
  limit?: number
  offset?: number
}

interface SearchClientsResponse {
  error?: string
  clients?: UserType[] | null
  totalCount: number
}

export async function searchClients({
  filters,
  searchQuery,
  limit,
  offset,
}: SearchClientsInputProps): Promise<SearchClientsResponse> {
  const queryParams = new URLSearchParams()
  if (filters?.userID) {
    queryParams.append('user_id', `eq.${filters?.userID}`)
  }
  if (limit) {
    queryParams.append('limit', limit?.toString())
  }
  if (offset) {
    queryParams.append('offset', offset?.toString())
  }

  if (searchQuery) {
    const term = searchQuery.trim()
    const numericTerm = term.replace(/\D/g, '')
    queryParams.append(
      'or',
      `(full_name.ilike.*${term}*,email.ilike.*${term}*${numericTerm && !filters?.userID && `,user_id.eq.${numericTerm}`})`
    )
  }

  const {
    data: clients,
    error,
    headers,
  } = await apiRequest<UserType[]>({
    path: `clients?${queryParams.toString()}`,
    method: 'GET',
    headers: {
      Prefer: 'count=exact',
    },
    authRequired: true,
  })

  const { totalCount } = extractTotalCountFromHeaders({ headers })

  if (error) {
    return { error, totalCount: totalCount || 0 }
  }

  if (clients && clients.length > 0) {
    return {
      clients,
      totalCount: totalCount || 0,
    }
  } else {
    return { error: errorMessages('no_clients_found'), totalCount: totalCount || 0 }
  }
}

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
