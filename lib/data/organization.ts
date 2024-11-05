import { OrganizationType } from '@/lib/types/organization'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { keysSnakeCaseToCamelCase } from '../utils/json'
import { apiRequest } from '../utils/http'
import { errorMessages } from '../constants/errors'

interface FetchOrganizationProfileProps {
  orgName: string
}

interface FetchOrganizationProfileResponse {
  error?: string
  organization?: OrganizationType
}

export async function fetchOrganizationProfile({
  orgName,
}: FetchOrganizationProfileProps): Promise<FetchOrganizationProfileResponse> {
  const { data: organizations, error } = await apiRequest<OrganizationType[]>({
    path: `organizations?org_name=eq.${orgName}&limit=1`,
    method: 'GET',
    authRequired: false,
  })

  if (error) {
    return { error: errorMessages(error) }
  }

  if (organizations && organizations.length > 0) {
    return { organization: organizations[0] }
  } else {
    return { error: errorMessages('organization_not_found') }
  }
}
