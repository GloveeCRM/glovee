import {
  ApplicationCategoryType,
  ApplicationQuestionSetType,
  ApplicationType,
} from '@/lib/types/application'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'

export async function fetchAdminClientApplications(
  orgName: string,
  clientID: number
): Promise<ApplicationType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/admin/client/${clientID}/applications`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.applications
  } catch (error) {
    return []
  }
}

export async function fetchClientApplications(
  orgName: string,
  clientID: number
): Promise<ApplicationType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/client/${clientID}/applications`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.applications
  } catch (error) {
    return []
  }
}

export async function searchApplications(
  orgName: string,
  query: string = '',
  limit: number = 0,
  offset: number = 0
): Promise<ApplicationType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/admin/search?query=${query}&limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.applications
  } catch (error) {
    return []
  }
}

export async function fetchApplicantInformation(
  orgName: string,
  clientID: number,
  applicationID: number
) {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/client/${clientID}/application/${applicationID}/applicant`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.applicant
  } catch (error) {
    return null
  }
}

export async function fetchClientApplicationCategoriesIncludingSections(
  orgName: string,
  clientID: number,
  applicationID: number
): Promise<ApplicationCategoryType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/client/${clientID}/application/${applicationID}/categories`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.categories
  } catch (error) {
    return []
  }
}

export async function fetchSectionQuestionSets(
  orgName: string,
  clientID: number,
  sectionID: number
): Promise<ApplicationQuestionSetType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/client/${clientID}/application/section/${sectionID}/question-sets`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.questionSets
  } catch (error) {
    return []
  }
}
