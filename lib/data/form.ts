'use server'

import { FormQuestionSetType, FormTemplateType, FormType } from '@/lib/types/form'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession, getSessionPayload } from '@/lib/auth/session'
import { FileType } from '../types/file'
import { getCurrentOrgName } from '../utils/server'
import { keysCamelCaseToSnakeCase, keysSnakeCaseToCamelCase } from '../utils/json'
import { apiRequest, extractTotalCountFromHeaders } from '../utils/http'

interface SearchFormTemplatesFilters {
  templateID?: number
}

interface SearchFormTemplatesProps {
  filters?: SearchFormTemplatesFilters
  searchQuery?: string
  limit?: number
  offset?: number
}

interface SearchFormTemplatesResponse {
  error?: string
  formTemplates?: FormTemplateType[]
  totalCount?: number
}

export async function searchFormTemplates({
  filters,
  limit,
  offset,
}: SearchFormTemplatesProps): Promise<SearchFormTemplatesResponse> {
  const queryParams = new URLSearchParams()
  if (filters?.templateID) {
    queryParams.append('form_template_id', `eq.${filters?.templateID}`)
  }

  if (limit) {
    queryParams.append('limit', limit?.toString() || '')
  }
  if (offset) {
    queryParams.append('offset', offset?.toString() || '')
  }

  const { data, error, headers } = await apiRequest<FormTemplateType[]>({
    path: `form_templates?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  const { totalCount } = extractTotalCountFromHeaders({ headers })

  return { error, formTemplates: data, totalCount: totalCount || 0 }
}

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
    const camelCaseData = keysSnakeCaseToCamelCase(data)
    if (camelCaseData.status === 'error') {
      return { forms: null, totalCount: 0 }
    } else {
      return { forms: camelCaseData.data.forms, totalCount: camelCaseData.data.total }
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

export async function fetchFormAnswerFileUploadIntent(
  userID: number,
  formID: number,
  questionID: number,
  file: FileType
): Promise<{
  uploadURL: string
  file: FileType
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
