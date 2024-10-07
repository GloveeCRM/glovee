'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { GLOVEE_API_URL } from '@/lib/constants/api'
import { CreateFormSchema } from '@/lib/zod/schemas'
import { getSession, getSessionPayload } from '@/lib/auth/session'
import { File } from '../types/file'
import { FormQuestionSetType, FormStatusTypes } from '../types/form'
import { getCurrentOrgName } from '../utils/server'
import { keysCamelCaseToSnakeCase, keysSnakeCaseToCamelCase } from '../utils/json'

export async function createNewForm(
  orgName: string,
  values: z.infer<typeof CreateFormSchema>
): Promise<{ success?: string; error?: string }> {
  const { clientID, role, applicantFirstName, applicantLastName, templateID } = values

  const accessToken = await getSession()

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/form/admin/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        clientID,
        templateID: templateID || null,
        role,
        applicantFirstName,
        applicantLastName,
      }),
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
