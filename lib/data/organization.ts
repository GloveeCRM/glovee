import { OrganizationType } from '../types/organization'
import { GLOVEE_API_URL } from '../constants/api'

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
