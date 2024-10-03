'use server'

import { getSession } from '../auth/session'
import { GLOVEE_API_URL } from '../constants/api'
import { ApplicationType } from '../types/application'
import { getCurrentOrgName } from '../utils/server'

export async function fetchApplicationsByUserID(userID: number): Promise<ApplicationType[] | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }

  const orgName = await getCurrentOrgName()

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/client/${userID}/applications`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    if (data.status === 'error') {
      return null
    } else {
      return data.data.applications
    }
  } catch (error) {
    return null
  }
}
