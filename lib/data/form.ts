'use server'

import { FormQuestionSetType, FormType } from '@/lib/types/form'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession, getSessionPayload, getSessionUserID } from '@/lib/auth/session'
import { File } from '../types/file'
import { getCurrentOrgName } from '../utils/server'
import { keysToCamelCase } from '../utils/json'

interface SearchFormsInput {
  filters?: { formID?: number; userID?: number; applicationID?: number }
  query?: string
  limit?: number
  offset?: number
}

export async function searchForms({
  filters = { formID: 0, userID: 0, applicationID: 0 },
  query = '',
  limit = 0,
  offset = 0,
}: SearchFormsInput): Promise<{ forms: FormType[] | null; totalCount: number }> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { forms: null, totalCount: 0 }
  }

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', filters.userID?.toString() || '')
  queryParams.append('application_id', filters.applicationID?.toString() || '')
  queryParams.append('form_id', filters.formID?.toString() || '')
  queryParams.append('search_query', query)
  queryParams.append('limit', limit.toString())
  queryParams.append('offset', offset.toString())

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/search?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    const camelData = keysToCamelCase(data)
    if (camelData.status === 'error') {
      return { forms: null, totalCount: 0 }
    } else {
      return { forms: camelData.data.forms, totalCount: camelData.data.total }
    }
  } catch (error) {
    return { forms: null, totalCount: 0 }
  }
}

export async function fetchApplicantInformation(orgName: string, clientID: number, formID: number) {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${clientID}/form/${formID}/applicant`,
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

export async function fetchFullForm(formID: number, orgName: string): Promise<FormType | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }
  const payload = await getSessionPayload()
  const clientID = payload?.user.id || 0

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${clientID}/full-form/${formID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.form
  } catch (error) {
    return null
  }
}

export async function fetchClientFormIncludingCategoriesAndSections(
  orgName: string,
  formID: number
): Promise<FormType | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }
  const payload = await getSessionPayload()
  const clientID = payload?.user.id || 0

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', clientID.toString())

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/${formID}/including-categories-and-sections?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.form
  } catch (error) {
    return null
  }
}

export async function fetchSectionQuestionSets(
  orgName: string,
  clientID: number,
  sectionID: number
): Promise<FormQuestionSetType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${clientID}/form/section/${sectionID}/question-sets`,
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

export async function fetchFormAnswerFileUploadIntent(
  orgName: string,
  formID: number,
  questionID: number,
  file: File
): Promise<{
  uploadURL: string
  file: File
} | null> {
  try {
    const payload = await getSessionPayload()
    const userID = payload?.user.id || 0

    const accessToken = await getSession()
    if (!accessToken) {
      return null
    }

    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${userID}/form/${formID}/question/${questionID}/create-form-answer-file-upload-intent`,
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
