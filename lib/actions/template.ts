'use server'

import { revalidatePath } from 'next/cache'

import { FormTemplateType } from '@/lib/types/template'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'
import { getCurrentOrgName } from '../utils/server'
import { keysSnakeCaseToCamelCase } from '../utils/json'

interface DeleteTemplateByIDInputDTO {
  formTemplateID: number
}

interface DeleteTemplateByIDOutputDTO {
  success?: string
  error?: string
}

export async function deleteFormTemplateByID({
  formTemplateID,
}: DeleteTemplateByIDInputDTO): Promise<DeleteTemplateByIDOutputDTO> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Failed to get access token!' }
  }

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('form_template_id', formTemplateID.toString())

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/template/delete?${queryParams.toString()}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    const camelCaseData = keysSnakeCaseToCamelCase(data)
    if (data.status === 'error') {
      return { error: camelCaseData.error }
    } else {
      revalidatePath('/admin/templates')
      return { success: camelCaseData.data.message }
    }
  } catch (error) {
    return { error: 'Failed to delete template!' }
  }
}

export async function updateFullTemplateByID(
  orgName: string,
  templateID: number,
  template: FormTemplateType
): Promise<{ success?: string; error?: string }> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Failed to get access token!' }
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/template/admin/full-template/${templateID}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ template }),
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      revalidatePath(`/admin/template/${templateID}/edit`)
      return { success: 'Template updated!' }
    }
  } catch (error) {
    return { error: 'Failed to update template!' }
  }
}
