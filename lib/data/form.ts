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
import { GLOVEE_POSTGREST_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'
import { getCurrentOrgName } from '@/lib/utils/server'
import { httpRequest, extractTotalCountFromHeaders } from '@/lib/utils/http'
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
  searchQuery,
  limit,
  offset,
}: SearchFormTemplatesProps): Promise<SearchFormTemplatesResponse> {
  const queryParams = new URLSearchParams()
  if (filters?.formTemplateID) {
    queryParams.append('form_template_id', `eq.${filters?.formTemplateID}`)
  }

  if (searchQuery) {
    const numericTerm = searchQuery.replace(/\D/g, '')

    const searchConditions = []
    searchConditions.push(`template_name.ilike.*${searchQuery}*`)
    // TODO: Add description search
    // searchConditions.push(`description.ilike.*${searchQuery}*`)
    if (numericTerm && !filters?.formTemplateID) {
      searchConditions.push(`form_template_id.eq.${numericTerm}`)
    }
    queryParams.append('or', `(${searchConditions.join(',')})`)
  }

  if (limit) {
    queryParams.append('limit', limit?.toString() || '')
  }
  if (offset) {
    queryParams.append('offset', offset?.toString() || '')
  }

  const { data, error, headers } = await httpRequest<FormTemplateType[]>({
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

  const { data, error } = await httpRequest<{
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

  const { data, error } = await httpRequest<{
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

  const { data, error } = await httpRequest<ApplicationFormType[]>({
    path: `rpc/application_forms?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return { applicationForms: data, error }
}

interface FetchApplicationFormProps {
  applicationFormID: number
}

interface FetchApplicationFormResponse {
  applicationForm?: ApplicationFormType
  error?: string
}

export async function fetchApplicationForm({
  applicationFormID,
}: FetchApplicationFormProps): Promise<FetchApplicationFormResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('application_form_id', applicationFormID.toString())

  const { data, error } = await httpRequest<{ applicationForm: ApplicationFormType }>({
    path: `rpc/application_form?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return { applicationForm: data?.applicationForm, error }
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

  const { data, error } = await httpRequest<{
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
  includeAnswers?: boolean
}

interface FetchApplicationFormSectionQuestionSetsAndQuestionsResponse {
  formQuestionSets?: FormQuestionSetType[]
  formQuestions?: FormQuestionType[]
  error?: string
}

export async function fetchApplicationFormSectionQuestionSetsAndQuestions({
  formSectionID,
  includeAnswers = false,
}: FetchApplicationFormSectionQuestionSetsAndQuestionsProps): Promise<FetchApplicationFormSectionQuestionSetsAndQuestionsResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('form_section_id', formSectionID.toString())
  queryParams.append('include_answers', includeAnswers.toString())

  const { data, error } = await httpRequest<{
    formQuestionSets: FormQuestionSetType[]
    formQuestions: FormQuestionType[]
  }>({
    path: `rpc/application_form_section_question_sets_and_questions?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return { formQuestionSets: data?.formQuestionSets, formQuestions: data?.formQuestions, error }
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

    const orgName = getCurrentOrgName()

    const queryParams = new URLSearchParams()
    queryParams.append('user_id', userID.toString() || '')

    const body = {
      formID,
      questionID,
      file,
    }
    const bodySnakeCase = keysCamelCaseToSnakeCase(body)

    const response = await fetch(
      `${GLOVEE_POSTGREST_URL}/v1/${orgName}/form/question/answer/file-upload-intent?${queryParams.toString()}`,
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
