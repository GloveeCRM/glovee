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

interface SearchUsersProps {
  filters?: {
    userID?: number
    role: string
  }
  searchQuery?: string
  limit?: number
  offset?: number
}

type SearchUsersResponse = {
  users: UserType[] | null
  totalCount: number
}

export async function searchUsers({
  filters = { userID: 0, role: '' },
  searchQuery = '',
  limit = 0,
  offset = 0,
}: SearchUsersProps): Promise<SearchUsersResponse | null> {
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

interface FetchProfilePictureUploadURLProps {
  userID: number
  fileName: string
  mimeType: string
}

interface FetchProfilePictureUploadURLResponse {
  data?: {
    url: string
    objectKey: string
  }
  error?: string
}

export async function fetchProfilePictureUploadURL({
  userID,
  fileName,
  mimeType,
}: FetchProfilePictureUploadURLProps): Promise<FetchProfilePictureUploadURLResponse> {
  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('org_name', orgName || '')
  queryParams.append('user_id', userID.toString())
  queryParams.append('file_name', fileName)
  queryParams.append('mime_type', mimeType)
  const { data, error } = await apiRequest<{ url: string; objectKey: string }>({
    path: `rpc/profile_picture_upload_url?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return { data, error }
}
