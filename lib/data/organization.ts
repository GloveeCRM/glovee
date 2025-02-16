import { OrganizationType } from '@/lib/types/organization'
import { httpRequest } from '@/lib/utils/http'

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
  const { data: organizations, error } = await httpRequest<OrganizationType[]>({
    path: `organizations?org_name=eq.${orgName}&limit=1`,
    method: 'GET',
    authRequired: false,
  })

  return { organization: organizations?.[0], error }
}
