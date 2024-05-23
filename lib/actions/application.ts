'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/prisma/prisma'
import { ApplicationSchema } from '../zod/schemas'
import { validateFormDataAgainstSchema } from '../utils/validation'
import { getSession } from '../auth/session'
import { GLOVEE_API_URL } from '../constants/api'

export async function createNewApplication(
  orgName: string,
  clientID: number,
  formData: FormData
): Promise<{ success?: string; error?: string; errors?: any }> {
  const { data, errors } = await validateFormDataAgainstSchema(ApplicationSchema, formData)

  if (errors || clientID === 0) {
    if (clientID === 0) {
      const combinedErrors = { ...errors, clientId: 'Client is required' }
      return { errors: combinedErrors }
    }
    return { errors }
  }

  const { role, applicantFirstName, applicantLastName, templateID } = data

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

/**
 * Set application status to submitted
 */
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
