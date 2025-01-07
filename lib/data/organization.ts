import { OrganizationType } from '@/lib/types/organization'
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

  return { organization: organizations?.[0], error }
}
