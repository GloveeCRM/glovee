'use server'

import {
  ApplicationFormType,
  FormCategoryType,
  FormQuestionSetType,
  FormQuestionType,
  FormSectionType,
  FormTemplateType,
  FormType,
} from '@/lib/types/form'
import { FileType } from '@/lib/types/file'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'
import { getCurrentOrgName } from '@/lib/utils/server'
import { apiRequest, extractTotalCountFromHeaders } from '@/lib/utils/http'
import { keysCamelCaseToSnakeCase, keysSnakeCaseToCamelCase } from '@/lib/utils/json'

interface SearchFormTemplatesFilters {
  formTemplateID?: number
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
  if (filters?.formTemplateID) {
    queryParams.append('form_template_id', `eq.${filters?.formTemplateID}`)
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

interface FetchFormTemplateWithCategoriesAndSectionsProps {
  formTemplateID: number
}

interface FetchFormTemplateWithCategoriesAndSectionsResponse {
  formTemplate?: FormTemplateType
  formCategories?: FormCategoryType[]
  formSections?: FormSectionType[]
  error?: string
}

export async function fetchFormTemplateWithCategoriesAndSections({
  formTemplateID,
}: FetchFormTemplateWithCategoriesAndSectionsProps): Promise<FetchFormTemplateWithCategoriesAndSectionsResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('form_template_id', formTemplateID.toString())

  const { data, error } = await apiRequest<{
    formTemplate: FormTemplateType
    formCategories: FormCategoryType[]
    formSections: FormSectionType[]
  }>({
    path: `rpc/form_template_with_categories_and_sections?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return {
    formTemplate: data?.formTemplate,
    formCategories: data?.formCategories,
    formSections: data?.formSections,
    error,
  }
}

interface FetchFormTemplateSectionQuestionSetsAndQuestionsProps {
  formSectionID: number
}

interface FetchFormTemplateSectionQuestionSetsAndQuestionsResponse {
  formQuestionSets?: FormQuestionSetType[]
  formQuestions?: FormQuestionType[]
  error?: string
}

export async function fetchFormTemplateSectionQuestionSetsAndQuestions({
  formSectionID,
}: FetchFormTemplateSectionQuestionSetsAndQuestionsProps): Promise<FetchFormTemplateSectionQuestionSetsAndQuestionsResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('form_section_id', formSectionID.toString())

  const { data, error } = await apiRequest<{
    formQuestionSets: FormQuestionSetType[]
    formQuestions: FormQuestionType[]
  }>({
    path: `rpc/form_template_section_question_sets_and_questions?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return { formQuestionSets: data?.formQuestionSets, formQuestions: data?.formQuestions, error }
}

interface FetchApplicationFormsProps {
  applicationID: number
}

interface FetchApplicationFormsResponse {
  applicationForms?: ApplicationFormType[]
  error?: string
}

export async function fetchApplicationForms({
  applicationID,
}: FetchApplicationFormsProps): Promise<FetchApplicationFormsResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('application_id', applicationID.toString())

  const { data, error } = await apiRequest<ApplicationFormType[]>({
    path: `rpc/application_forms?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return { applicationForms: data, error }
}

interface FetchApplicationFormCategoriesAndSectionsProps {
  applicationFormID: number
}

interface FetchApplicationFormCategoriesAndSectionsResponse {
  formCategories?: FormCategoryType[]
  formSections?: FormSectionType[]
  error?: string
}

export async function fetchApplicationFormCategoriesAndSections({
  applicationFormID,
}: FetchApplicationFormCategoriesAndSectionsProps): Promise<FetchApplicationFormCategoriesAndSectionsResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('application_form_id', applicationFormID.toString())

  const { data, error } = await apiRequest<{
    formCategories: FormCategoryType[]
    formSections: FormSectionType[]
  }>({
    path: `rpc/application_form_categories_and_sections?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return { formCategories: data?.formCategories, formSections: data?.formSections, error }
}

interface FetchApplicationFormSectionQuestionSetsAndQuestionsProps {
  formSectionID: number
}

interface FetchApplicationFormSectionQuestionSetsAndQuestionsResponse {
  formQuestionSets?: FormQuestionSetType[]
  formQuestions?: FormQuestionType[]
  error?: string
}

export async function fetchApplicationFormSectionQuestionSetsAndQuestions({
  formSectionID,
}: FetchApplicationFormSectionQuestionSetsAndQuestionsProps): Promise<FetchApplicationFormSectionQuestionSetsAndQuestionsResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('form_section_id', formSectionID.toString())

  const { data, error } = await apiRequest<{
    formQuestionSets: FormQuestionSetType[]
    formQuestions: FormQuestionType[]
  }>({
    path: `rpc/application_form_section_question_sets_and_questions?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return { formQuestionSets: data?.formQuestionSets, formQuestions: data?.formQuestions, error }
}

interface FetchFormAnswerFileUploadURLProps {
  formQuestionID: number
  fileName: string
  mimeType: string
}

interface FetchFormAnswerFileUploadURLResponse {
  url?: string
  objectKey?: string
  error?: string
}

export async function fetchFormAnswerFileUploadURL({
  formQuestionID,
  fileName,
  mimeType,
}: FetchFormAnswerFileUploadURLProps): Promise<FetchFormAnswerFileUploadURLResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('form_question_id', formQuestionID.toString())
  queryParams.append('file_name', fileName)
  queryParams.append('mime_type', mimeType)

  const { data, error } = await apiRequest<FetchFormAnswerFileUploadURLResponse>({
    path: `rpc/form_answer_file_upload_url?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return { url: data?.url, objectKey: data?.objectKey, error }
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
