'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'
import { File } from '../types/file'
import {
  FormQuestionSetType,
  FormStatusTypes,
  FormCategoryType,
  FormSectionType,
} from '../types/form'
import { getCurrentOrgName } from '../utils/server'
import { keysCamelCaseToSnakeCase, keysSnakeCaseToCamelCase } from '../utils/json'

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
  files?: File[]
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
    if (data.status === 'error') {
      return { error: camelData.error }
    } else {
      revalidatePath('/application')
      return { success: 'Question set created!' }
    }
  } catch (error) {
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
    console.log('camelData', JSON.stringify(camelData, null, 2))
    if (data.status === 'error') {
      return { error: camelData.error }
    } else {
      revalidatePath('/admin/forms')
      return { success: 'Form category created!', formCategory: camelData.data }
    }
  } catch (error) {
    return { error: 'Failed to create form category!' }
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
    console.log('camelData', JSON.stringify(camelData, null, 2))
    if (data.status === 'error') {
      return { error: camelData.error }
    } else {
      revalidatePath('/admin/forms')
      return { success: 'Form section created!', formSection: camelData.data }
    }
  } catch (error) {
    return { error: 'Failed to create form section!' }
  }
}
