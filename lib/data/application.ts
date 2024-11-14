'use server'

import { getSession } from '../auth/session'
import { GLOVEE_API_URL } from '../constants/api'
import { ApplicationType } from '../types/application'
import { apiRequest, extractTotalCountFromHeaders } from '../utils/http'
import { keysSnakeCaseToCamelCase } from '../utils/json'
import { getCurrentOrgName } from '../utils/server'

interface SearchApplicationsFilters {
  applicationID?: number
  userID?: number
}

interface SearchApplicationsProps {
  filters?: SearchApplicationsFilters
  searchQuery?: string
  limit?: number
  offset?: number
}

interface SearchApplicationsResponse {
  error?: string
  applications?: ApplicationType[] | null
  totalCount: number
}

export async function searchApplications({
  filters,
  searchQuery,
  limit,
  offset,
}: SearchApplicationsProps): Promise<SearchApplicationsResponse> {
  const queryParams = new URLSearchParams()
  if (filters?.applicationID) {
    queryParams.append('application_id', filters?.applicationID?.toString() || '')
  }
  if (filters?.userID) {
    queryParams.append('user_id', filters?.userID?.toString() || '')
  }
  if (searchQuery) {
    queryParams.append('search_query', searchQuery)
  }
  if (limit) {
    queryParams.append('limit', limit?.toString() || '')
  }
  if (offset) {
    queryParams.append('offset', offset?.toString() || '')
  }

  const { data, error, headers } = await apiRequest<ApplicationType[]>({
    path: `applications?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  const { totalCount } = extractTotalCountFromHeaders({ headers })

  if (error) {
    return { error, totalCount: totalCount || 0 }
  }

  return { applications: data, totalCount: totalCount || 0 }
}

interface SearchApplicationsInputOld {
  filters?: { applicationID?: number; userID?: number }
  query?: string
  limit?: number
  offset?: number
}

export async function searchApplicationsOld({
  filters = { applicationID: 0, userID: 0 },
  query = '',
  limit = 0,
  offset = 0,
}: SearchApplicationsInputOld): Promise<{
  applications: ApplicationType[] | null
  totalCount: number
}> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { applications: null, totalCount: 0 }
  }

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', filters.userID?.toString() || '')
  queryParams.append('application_id', filters.applicationID?.toString() || '')
  queryParams.append('search_query', query)
  queryParams.append('limit', limit.toString())
  queryParams.append('offset', offset.toString())

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/search?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    const camelData = keysSnakeCaseToCamelCase(data)
    if (data.status === 'error') {
      return { applications: null, totalCount: 0 }
    } else {
      return { applications: camelData.data.applications, totalCount: camelData.data.totalCount }
    }
  } catch (error) {
    return { applications: null, totalCount: 0 }
  }
}
