'use server'

import { UserType } from '@/lib/types/user'
import { getCurrentOrgName } from '../utils/server'
import { httpRequest, extractTotalCountFromHeaders } from '../utils/http'
import { errorMessages } from '../constants/errors'
import { fetchPresignedGetURL } from './s3'

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
  } = await httpRequest<UserType[]>({
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
    // Fetch presigned URLs for profile pictures
    const processedClients = await Promise.all(
      clients.map(async (client) => {
        if (client.profilePictureFile?.fileID) {
          const { url } = await fetchPresignedGetURL({
            fileID: client.profilePictureFile?.fileID,
            expiresIn: 60 * 60 * 2, // 2 hours
          })
          client.profilePictureFile.url = url
        }
        return client
      })
    )

    return {
      clients: processedClients,
      totalCount: totalCount || 0,
    }
  } else {
    return { error: errorMessages('no_clients_found'), totalCount: totalCount || 0 }
  }
}

interface FetchCurrentUserProfileResponse {
  user?: UserType
  error?: string
}

export async function fetchCurrentUserProfile(): Promise<FetchCurrentUserProfileResponse> {
  const { data, error } = await httpRequest<{ user: UserType }>({
    path: 'rpc/auth_user_profile',
    method: 'GET',
    authRequired: true,
  })

  const user = data?.user

  if (user?.profilePictureFile?.fileID) {
    const { url } = await fetchPresignedGetURL({
      fileID: user.profilePictureFile?.fileID,
      expiresIn: 60 * 60 * 2, // 2 hours
    })
    user.profilePictureFile.url = url
  }

  return { user, error }
}
