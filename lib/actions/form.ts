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
import { FormTemplateType } from '../types/template'

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

type CreateNewFormInputDTO = {
  ownerID: number
  role: string
  templateID: number
}

type CreateNewFormOutputDTO = {
  success?: string
  error?: string
}

export async function createNewForm({
  ownerID,
  role,
  templateID,
}: CreateNewFormInputDTO): Promise<CreateNewFormOutputDTO> {
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

interface CreateFormCategoryInputDTO {
  userID: number
  formCategory: Partial<FormCategoryType>
}

type CreateFormCategoryOutputDTO = {
  error?: string
  success?: string
  formCategory?: FormCategoryType
}

export async function createFormCategory({
  userID,
  formCategory,
}: CreateFormCategoryInputDTO): Promise<CreateFormCategoryOutputDTO> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID?.toString() || '')

  const body = {
    formCategory,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/category/create?${queryParams}`,
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
      revalidatePath('/admin/template')
      return { success: 'Form category created!', formCategory: camelData.data }
    }
  } catch (error) {
    return { error: 'Failed to create form category!' }
  }
}

interface UpdateFormCategoryInputDTO {
  userID: number
  formCategory: Partial<FormCategoryType>
}

type UpdateFormCategoryOutputDTO = {
  error?: string
  success?: string
  formCategory?: FormCategoryType
}

export async function updateFormCategory({
  userID,
  formCategory,
}: UpdateFormCategoryInputDTO): Promise<UpdateFormCategoryOutputDTO> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID?.toString() || '')

  const body = {
    formCategory,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/category/update?${queryParams}`,
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
    if (data.status === 'error') {
      return { error: camelData.error }
    } else {
      revalidatePath('/admin/template')
      return { success: 'Form category updated!', formCategory: camelData.data }
    }
  } catch (error) {
    return { error: 'Failed to update form category!' }
  }
}

interface DeleteFormCategoryInputDTO {
  userID: number
  formCategoryID: number
}

type DeleteFormCategoryOutputDTO = {
  error?: string
  success?: string
}

export async function deleteFormCategory({
  userID,
  formCategoryID,
}: DeleteFormCategoryInputDTO): Promise<DeleteFormCategoryOutputDTO> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID?.toString() || '')
  queryParams.append('form_category_id', formCategoryID?.toString() || '')

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/category/delete?${queryParams}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    const camelData = keysSnakeCaseToCamelCase(data)
    if (data.status === 'error') {
      return { error: camelData.error }
    } else {
      revalidatePath('/admin/template')
      return { success: 'Form category deleted!' }
    }
  } catch (error) {
    return { error: 'Failed to delete form category!' }
  }
}

interface CreateFormSectionInputDTO {
  userID: number
  formSection: Partial<FormSectionType>
}

type CreateFormSectionOutputDTO = {
  error?: string
  success?: string
  formSection?: FormSectionType
}

export async function createFormSection({
  userID,
  formSection,
}: CreateFormSectionInputDTO): Promise<CreateFormSectionOutputDTO> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID?.toString() || '')

  const body = {
    formSection,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/section/create?${queryParams}`,
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
      revalidatePath('/admin/template')
      return { success: 'Form section created!', formSection: camelData.data }
    }
  } catch (error) {
    return { error: 'Failed to create form section!' }
  }
}

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
