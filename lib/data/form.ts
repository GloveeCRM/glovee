'use server'

import { FormQuestionSetType, FormType } from '@/lib/types/form'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession, getSessionPayload } from '@/lib/auth/session'
import { File } from '../types/file'
import { getCurrentOrgName } from '../utils/server'
import { keysCamelCaseToSnakeCase, keysSnakeCaseToCamelCase } from '../utils/json'

interface SearchFormsInput {
  filters?: {
    formID?: number
    userID?: number
    applicationID?: number
    includeCategories?: boolean
    includeSections?: boolean
  }
  query?: string
  limit?: number
  offset?: number
}

export async function searchForms({
  filters = {
    formID: 0,
    userID: 0,
    applicationID: 0,
    includeCategories: false,
    includeSections: false,
  },
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
  queryParams.append('include_categories', filters.includeCategories?.toString() || '')
  queryParams.append('include_sections', filters.includeSections?.toString() || '')
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
    const camelData = keysSnakeCaseToCamelCase(data)
    if (camelData.status === 'error') {
      return { forms: null, totalCount: 0 }
    } else {
      return { forms: camelData.data.forms, totalCount: camelData.data.total }
    }
  } catch (error) {
    return { forms: null, totalCount: 0 }
  }
}

interface FetchFormQuestionSetsInput {
  filters: {
    userID?: number
    sectionID?: number
    includeQuestions?: boolean
    includeAnswers?: boolean
  }
}

export async function fetchFormQuestionSets({
  filters = { userID: 0, sectionID: 0, includeQuestions: false, includeAnswers: false },
}: FetchFormQuestionSetsInput): Promise<FormQuestionSetType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', filters.userID?.toString() || '')
  queryParams.append('section_id', filters.sectionID?.toString() || '')
  queryParams.append('include_questions', filters.includeQuestions?.toString() || '')
  queryParams.append('include_answers', filters.includeAnswers?.toString() || '')

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/question-sets?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    const camelData = keysSnakeCaseToCamelCase(data)
    return camelData.data.questionSets
  } catch (error) {
    return []
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

export async function fetchFormAnswerFileUploadIntent(
  userID: number,
  formID: number,
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

    const orgName = await getCurrentOrgName()

    const queryParams = new URLSearchParams()
    queryParams.append('user_id', userID.toString() || '')

    const body = {
      formID,
      questionID,
      file,
    }
    const bodySnakeCase = keysCamelCaseToSnakeCase(body)

    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/question/answer/file-upload-intent?${queryParams.toString()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodySnakeCase),
      }
    )

    const data = await response.json()
    const camelData = keysSnakeCaseToCamelCase(data)

    if (data.status === 'error') {
      return null
    } else {
      return camelData.data
    }
  } catch (error) {
    return null
  }
}
