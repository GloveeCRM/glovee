'use server'

import { getSession } from '../auth/session'
import { GLOVEE_API_URL } from '../constants/api'
import { ApplicationType } from '../types/application'
import { keysSnakeCaseToCamelCase } from '../utils/json'
import { getCurrentOrgName } from '../utils/server'

interface SearchApplicationsInput {
  filters?: { applicationID?: number; userID?: number }
  query?: string
  limit?: number
  offset?: number
}

export async function searchApplications({
  filters = { applicationID: 0, userID: 0 },
  query = '',
  limit = 0,
  offset = 0,
}: SearchApplicationsInput): Promise<{
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
