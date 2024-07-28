'use server'

import {
  ApplicationCategoryType,
  ApplicationQuestionSetType,
  ApplicationType,
} from '@/lib/types/application'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'
import { File } from '../types/file'

export async function fetchClientApplications(
  orgName: string,
  clientID: number
): Promise<ApplicationType[] | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
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

    if (data.status === 'error') {
      return null
    } else {
      return data.data.applications
    }
  } catch (error) {
    return null
  }
}

export async function searchApplications(
  orgName: string,
  userID: number = 0,
  query: string = '',
  limit: number = 0,
  offset: number = 0
): Promise<{ applications: ApplicationType[] | null; total: number }> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { applications: null, total: 0 }
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/admin/search?userID=${userID}&query=${query}&limit=${limit}&offset=${offset}`,
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
      return { applications: null, total: 0 }
    } else {
      return { applications: data.data.applications, total: data.data.total }
    }
  } catch (error) {
    return { applications: null, total: 0 }
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

export async function fetchApplicationAnswerFileUploadIntent(
  orgName: string,
  clientID: number,
  applicationID: number,
  questionID: number,
  file: File
): Promise<{
  uploadURL: string
  file: File
} | null> {
  try {
    const accessToken = await getSession()
    if (!accessToken) {
      return null
    }

    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/client/${clientID}/application/${applicationID}/question/${questionID}/create-application-answer-file-upload-intent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          file: file,
        }),
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return null
    } else {
      return data.data
    }
  } catch (error) {
    return null
  }
}
