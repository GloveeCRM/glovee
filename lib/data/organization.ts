import { OrganizationType } from '@/lib/types/organization'
import { httpRequest } from '@/lib/utils/http'
import { fetchPresignedGetURL } from './s3'

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

  const organization = organizations?.[0]

  if (organization?.logoFile?.fileID) {
    const { url } = await fetchPresignedGetURL({
      fileID: organization.logoFile.fileID,
      expiresIn: 60 * 60 * 2, // 2 hours
    })
    organization.logoFile.url = url
  }

  return { organization, error }
}
