'use server'

import { revalidatePath } from 'next/cache'

import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'
import { FileType } from '../types/file'
import {
  FormQuestionSetType,
  FormStatusTypes,
  FormCategoryType,
  FormSectionType,
} from '../types/form'
import { getCurrentOrgName } from '../utils/server'
import { keysCamelCaseToSnakeCase, keysSnakeCaseToCamelCase } from '../utils/json'
import { apiRequest } from '../utils/http'
import { FormTemplateType } from '../types/form'

interface CreateFormTemplateProps {
  templateName: string
}

interface CreateFormTemplateResponse {
  error?: string
}

export async function createFormTemplate({
  templateName,
}: CreateFormTemplateProps): Promise<CreateFormTemplateResponse> {
  const { error } = await apiRequest<{ formTemplate: FormTemplateType }>({
    path: 'rpc/create_form_template',
    method: 'POST',
    data: { templateName },
    authRequired: true,
  })

  revalidatePath('/admin/templates')
  return { error }
}

interface UpdateFormTemplateProps {
  formTemplate: Partial<FormTemplateType>
}

interface UpdateFormTemplateResponse {
  formTemplate?: FormTemplateType
  error?: string
}

export async function updateFormTemplate({
  formTemplate,
}: UpdateFormTemplateProps): Promise<UpdateFormTemplateResponse> {
  const { data, error } = await apiRequest<{ formTemplate: FormTemplateType }>({
    path: 'rpc/update_form_template',
    method: 'POST',
    data: {
      formTemplateID: formTemplate.formTemplateID,
      templateName: formTemplate.templateName,
    },
    authRequired: true,
  })
  revalidatePath(`/admin/template/${formTemplate.formTemplateID}`)
  return { formTemplate: data?.formTemplate, error }
}

interface DeleteFormTemplateProps {
  formTemplateID: number
}

interface DeleteFormTemplateResponse {
  error?: string
}

export async function deleteFormTemplate({
  formTemplateID,
}: DeleteFormTemplateProps): Promise<DeleteFormTemplateResponse> {
  const { error } = await apiRequest<{ success: boolean }>({
    path: 'rpc/delete_form_template',
    method: 'POST',
    data: { formTemplateID },
    authRequired: true,
  })

  revalidatePath('/admin/templates')
  return { error }
}

interface CreateFormTemplateCategoryProps {
  formTemplateID: number
  categoryName: string
  categoryPosition: number
}

interface CreateFormTemplateCategoryResponse {
  formCategory?: FormCategoryType
  error?: string
}

export async function createFormTemplateCategory({
  formTemplateID,
  categoryName,
  categoryPosition,
}: CreateFormTemplateCategoryProps): Promise<CreateFormTemplateCategoryResponse> {
  const { data, error } = await apiRequest<{ formCategory: FormCategoryType }>({
    path: 'rpc/create_form_template_category',
    method: 'POST',
    data: { formTemplateID, categoryName, categoryPosition },
    authRequired: true,
  })

  revalidatePath(`/admin/template/${formTemplateID}`)
  return { formCategory: data?.formCategory, error }
}

interface UpdateFormTemplateCategoriesProps {
  formCategories: Partial<FormCategoryType>[]
}

interface UpdateFormTemplateCategoriesResponse {
  formCategories?: FormCategoryType[]
  error?: string
}

export async function updateFormTemplateCategories({
  formCategories,
}: UpdateFormTemplateCategoriesProps): Promise<UpdateFormTemplateCategoriesResponse> {
  const { data, error } = await apiRequest<{ formCategories: FormCategoryType[] }>({
    path: 'rpc/update_form_template_categories',
    method: 'POST',
    data: {
      formCategories,
    },
    authRequired: true,
  })

  return { formCategories: data?.formCategories, error }
}

interface DeleteFormTemplateCategoryProps {
  formCategoryID: number
}

interface DeleteFormTemplateCategoryResponse {
  formCategories?: FormCategoryType[]
  error?: string
}

export async function deleteFormTemplateCategory({
  formCategoryID,
}: DeleteFormTemplateCategoryProps): Promise<DeleteFormTemplateCategoryResponse> {
  const { data, error } = await apiRequest<{ formCategories: FormCategoryType[] }>({
    path: 'rpc/delete_form_template_category',
    method: 'POST',
    data: { formCategoryID },
    authRequired: true,
  })

  return { formCategories: data?.formCategories, error }
}

interface CreateFormSectionProps {
  formCategoryID: number
  sectionName: string
  sectionPosition: number
}

interface CreateFormSectionResponse {
  formSection?: FormSectionType
  error?: string
}

export async function createFormSection({
  formCategoryID,
  sectionName,
  sectionPosition,
}: CreateFormSectionProps): Promise<CreateFormSectionResponse> {
  const { data, error } = await apiRequest<{ formSection: FormSectionType }>({
    path: 'rpc/create_form_section',
    method: 'POST',
    data: { formCategoryID, sectionName, sectionPosition },
    authRequired: true,
  })

  return { formSection: data?.formSection, error }
}

interface UpdateFormTemplateSectionsProps {
  formSections: Partial<FormSectionType>[]
}

interface UpdateFormTemplateSectionsResponse {
  formSections?: FormSectionType[]
  error?: string
}

export async function updateFormTemplateSections({
  formSections,
}: UpdateFormTemplateSectionsProps): Promise<UpdateFormTemplateSectionsResponse> {
  const { data, error } = await apiRequest<{ formSections: FormSectionType[] }>({
    path: 'rpc/update_form_template_sections',
    method: 'POST',
    data: { formSections },
    authRequired: true,
  })

  return { formSections: data?.formSections, error }
}

interface DeleteFormTemplateSectionProps {
  formSectionID: number
}

interface DeleteFormTemplateSectionResponse {
  formSections?: FormSectionType[]
  error?: string
}

export async function deleteFormTemplateSection({
  formSectionID,
}: DeleteFormTemplateSectionProps): Promise<DeleteFormTemplateSectionResponse> {
  const { data, error } = await apiRequest<{ formSections: FormSectionType[] }>({
    path: 'rpc/delete_form_template_section',
    method: 'POST',
    data: { formSectionID },
    authRequired: true,
  })

  return { formSections: data?.formSections, error }
}

interface CreateNewFormProps {
  ownerID: number
  role: string
  templateID: number
}

interface CreateNewFormResponse {
  success?: string
  error?: string
}

export async function createNewForm({
  ownerID,
  role,
  templateID,
}: CreateNewFormProps): Promise<CreateNewFormResponse> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = await getCurrentOrgName()

  const body = {
    ownerID,
    templateID: templateID || null,
    role,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/form/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bodySnakeCase),
    })

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      revalidatePath('/admin/applications')
      return { success: 'Application created!' }
    }
  } catch (error) {
    return { error: 'Failed to create application!' }
  }
}

export async function setFormStatus(
  formID: number,
  status: FormStatusTypes,
  userID: number
): Promise<{ success?: string; error?: string }> {
  try {
    const accessToken = await getSession()
    if (!accessToken) {
      return { error: 'Unauthorized' }
    }

    const orgName = await getCurrentOrgName()

    const queryParams = new URLSearchParams()
    queryParams.append('user_id', userID?.toString() || '')

    const body = {
      formID,
      status,
    }
    const bodySnakeCase = keysCamelCaseToSnakeCase(body)

    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/form/set-status?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bodySnakeCase),
    })

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      revalidatePath('/admin/applications')
      return { success: 'Application submitted!' }
    }
  } catch (error) {
    return { error: 'Failed to submit form!' }
  }
}

interface SaveAnswerProps {
  userID: number
  questionID: number
  text?: string
  optionIDs?: number[]
  date?: string
  files?: FileType[]
}

export async function saveAnswer({
  userID,
  questionID,
  text,
  optionIDs,
  date,
  files,
}: SaveAnswerProps): Promise<{ success?: string; error?: string; data?: any }> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = await getCurrentOrgName()

  const body = {
    questionID,
    answer: {
      questionID,
      text,
      files,
      optionIDs,
      date,
    },
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID?.toString() || '')

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/question/answer?${queryParams}`,
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
      return { error: camelData.error }
    } else {
      revalidatePath('/application')
      return { success: 'Answer saved!', data: camelData.data }
    }
  } catch (error) {
    return { error: 'Failed to save answer!' }
  }
}

export async function createQuestionSetAndQuestions(
  userID: number,
  questionSet: FormQuestionSetType
): Promise<{ success?: string; error?: string }> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID?.toString() || '')

  const body = { questionSet }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)
  console.log('bodySnakeCase', JSON.stringify(bodySnakeCase, null, 2))
  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/question-set/create?${queryParams}`,
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
    console.log('camelData', JSON.stringify(camelData, null, 2))
    if (data.status === 'error') {
      return { error: camelData.error }
    } else {
      revalidatePath('/application')
      return { success: 'Question set created!' }
    }
  } catch (error) {
    console.error('error', error)
    return { error: 'Failed to create question set!' }
  }
}

export async function deleteQuestionSet(
  userID: number,
  questionSetID: number
): Promise<{ success?: string; error?: string }> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID?.toString() || '')
  queryParams.append('question_set_id', questionSetID?.toString() || '')

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/question-set/delete?${queryParams}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      revalidatePath('/application')
      return { success: 'Question set deleted!' }
    }
  } catch (error) {
    return { error: 'Failed to delete question set!' }
  }
}

// interface CreateFormCategoryInputDTO {
//   userID: number
//   formCategory: Partial<FormCategoryType>
// }

// type CreateFormCategoryOutputDTO = {
//   error?: string
//   success?: string
//   formCategory?: FormCategoryType
// }

// export async function createFormCategory({
//   userID,
//   formCategory,
// }: CreateFormCategoryInputDTO): Promise<CreateFormCategoryOutputDTO> {
//   const accessToken = await getSession()
//   if (!accessToken) {
//     return { error: 'Unauthorized' }
//   }

//   const orgName = await getCurrentOrgName()

//   const queryParams = new URLSearchParams()
//   queryParams.append('user_id', userID?.toString() || '')

//   const body = {
//     formCategory,
//   }
//   const bodySnakeCase = keysCamelCaseToSnakeCase(body)

//   try {
//     const response = await fetch(
//       `${GLOVEE_API_URL}/v1/${orgName}/form/category/create?${queryParams}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(bodySnakeCase),
//       }
//     )

//     const data = await response.json()
//     const camelData = keysSnakeCaseToCamelCase(data)
//     if (data.status === 'error') {
//       return { error: camelData.error }
//     } else {
//       revalidatePath('/admin/template')
//       return { success: 'Form category created!', formCategory: camelData.data }
//     }
//   } catch (error) {
//     return { error: 'Failed to create form category!' }
//   }
// }

interface UpdateFormSectionInputDTO {
  userID: number
  formSections: Partial<FormSectionType>[]
}

type UpdateFormSectionOutputDTO = {
  error?: string
  success?: string
  formSections?: FormSectionType[]
}

export async function updateFormSections({
  userID,
  formSections,
}: UpdateFormSectionInputDTO): Promise<UpdateFormSectionOutputDTO> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID?.toString() || '')

  const body = {
    formSections,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/section/update?${queryParams}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodySnakeCase),
      }
    )

    const data = await response.json()
    const camelData = keysSnakeCaseToCamelCase(data)
    console.log('body', JSON.stringify(bodySnakeCase, null, 2))
    console.log('camelData', JSON.stringify(camelData, null, 2))
    if (data.status === 'error') {
      return { error: camelData.error }
    } else {
      revalidatePath('/admin/template')
      return { success: 'Form section updated!', formSections: camelData.data.formSections }
    }
  } catch (error) {
    return { error: 'Failed to update form section!' }
  }
}

interface DeleteFormSectionInputDTO {
  userID: number
  formSectionIDs: number[]
}

type DeleteFormSectionOutputDTO = {
  error?: string
  success?: string
}

export async function deleteFormSections({
  userID,
  formSectionIDs,
}: DeleteFormSectionInputDTO): Promise<DeleteFormSectionOutputDTO> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  console.log('formSectionIDs', formSectionIDs)

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID?.toString() || '')

  const body = {
    formSectionIDs,
  }
  console.log('body', JSON.stringify(body, null, 2))
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/section/delete?${queryParams}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodySnakeCase),
      }
    )

    const data = await response.json()
    const camelData = keysSnakeCaseToCamelCase(data)
    console.log('body', JSON.stringify(bodySnakeCase, null, 2))
    console.log('camelData', JSON.stringify(camelData, null, 2))
    if (data.status === 'error') {
      return { error: camelData.error }
    } else {
      revalidatePath('/admin/template')
      return { success: 'Form section deleted!' }
    }
  } catch (error) {
    console.error('error', error)
    return { error: 'Failed to delete form section!' }
  }
}
