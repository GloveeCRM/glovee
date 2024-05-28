'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { GLOVEE_API_URL } from '@/lib/constants/api'
import { validateValuesAgainstSchema } from '@/lib/utils/validation'
import { ApplicationSchema } from '@/lib/zod/schemas'
import { getSession } from '@/lib/auth/session'

export async function createNewApplication(
  orgName: string,
  values: z.infer<typeof ApplicationSchema>
): Promise<{ success?: string; error?: string; errors?: any }> {
  const { data, errors } = await validateValuesAgainstSchema(ApplicationSchema, values)

  if (errors) {
    return { errors }
  }

  const { clientID, role, applicantFirstName, applicantLastName, templateID } = data

  const accessToken = await getSession()

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/application/admin/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        clientID,
        templateID: parseInt(templateID),
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

export async function submitApplicationById(
  applicationId: number
): Promise<{ success?: string; error?: string }> {
  try {
    revalidatePath('/applications')
    return { success: 'Application submitted!' }
  } catch (error) {
    return { error: 'Failed to submit application!' }
  }
}

export async function saveAnswer(
  orgName: string,
  applicationId: number,
  questionId: number,
  answer: string
): Promise<{ success?: string; error?: string }> {
  const accessToken = await getSession()

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/${applicationId}/question/${questionId}/answer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ answer }),
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      revalidatePath('/applications')
      return { success: 'Answer saved!' }
    }
  } catch (error) {
    return { error: 'Failed to save answer!' }
  }
}
