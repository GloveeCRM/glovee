'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { GLOVEE_API_URL } from '@/lib/constants/api'
import { CreateFormSchema } from '@/lib/zod/schemas'
import { getSession, getSessionPayload } from '@/lib/auth/session'
import { File } from '../types/file'
import { FormQuestionSetType, FormStatusTypes } from '../types/form'

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

export async function submitFormById(
  formID: number,
  orgName: string
): Promise<{ success?: string; error?: string }> {
  try {
    const accessToken = await getSession()
    const payload = await getSessionPayload()
    const clientID = payload?.user?.id || 0

    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${clientID}/form/${formID}/set-status`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: FormStatusTypes.SUBMITTED }),
      }
    )

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
  orgName: string
  questionID: number
  text?: string
  optionIDs?: number[]
  date?: string
  files?: File[]
}

export async function saveAnswer({
  orgName,
  questionID,
  text,
  optionIDs,
  date,
  files,
}: SaveAnswerProps): Promise<{ success?: string; error?: string; data?: any }> {
  const accessToken = await getSession()
  const payload = await getSessionPayload()
  const clientID = payload?.user?.id || 0

  const body = JSON.stringify({
    questionID,
    answer: {
      questionID,
      text,
      files,
      optionIDs,
      date,
    },
  })

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${clientID}/question/${questionID}/update-answer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      revalidatePath('/application')
      return { success: 'Answer saved!', data: data.data }
    }
  } catch (error) {
    return { error: 'Failed to save answer!' }
  }
}

export async function createQuestionSetAndQuestions(
  orgName: string,
  questionSet: FormQuestionSetType
): Promise<{ success?: string; error?: string }> {
  const accessToken = await getSession()
  const payload = await getSessionPayload()
  const clientID = payload?.user?.id || 0

  const body = JSON.stringify({
    questionSet,
  })

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${clientID}/form/create-question-set`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      revalidatePath('/application')
      return { success: 'Question set created!' }
    }
  } catch (error) {
    return { error: 'Failed to create question set!' }
  }
}

export async function deleteQuestionSet(
  orgName: string,
  questionSetID: number
): Promise<{ success?: string; error?: string }> {
  const accessToken = await getSession()
  const payload = await getSessionPayload()
  const clientID = payload?.user?.id || 0

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/client/${clientID}/form/question-set/${questionSetID}`,
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
