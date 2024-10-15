import { OrganizationType } from '@/lib/types/organization'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '../auth/session'
import { getCurrentOrgName } from '../utils/server'
import { keysSnakeCaseToCamelCase } from '../utils/json'

export async function fetchOrganizationProfile(orgName: string): Promise<OrganizationType | null> {
  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/organization/${orgName}/profile`)

    const data = await response.json()

    if (data.error) {
      return null
    } else {
      return data.data.organization
    }
  } catch {
    return null
  }
}

type SearchOrganizationsInputDTO = {
  filters?: {
    organizationID?: number
    orgName?: string
  }
  searchQuery?: string
  limit?: number
  offset?: number
}

type SearchOrganizationsOutputDTO = {
  success?: string
  error?: string
  organizations: OrganizationType[] | null
  totalCount: number
}

export async function searchOrganizations({
  filters = { organizationID: 0, orgName: '' },
  searchQuery = '',
  limit = 0,
  offset = 0,
}: SearchOrganizationsInputDTO): Promise<SearchOrganizationsOutputDTO | null> {
  try {
    const queryParams = new URLSearchParams()
    queryParams.append('organization_id', filters.organizationID?.toString() || '')
    queryParams.append('org_name', filters.orgName || '')
    queryParams.append('search_query', searchQuery)
    queryParams.append('limit', limit.toString())
    queryParams.append('offset', offset.toString())

    const response = await fetch(
      `${GLOVEE_API_URL}/v1/organization/search?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()
    const camelCaseData = keysSnakeCaseToCamelCase(data)
    if (camelCaseData.status === 'error') {
      return { organizations: null, totalCount: 0, error: camelCaseData.error }
    } else {
      return {
        organizations: camelCaseData.data.organizations,
        totalCount: camelCaseData.data.totalCount,
      }
    }
  } catch {
    return null
  }
}
