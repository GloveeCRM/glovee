'use server'

import { revalidatePath } from 'next/cache'

import { TemplateSchema } from '../zod/schemas'
import { TemplateType } from '../types/template'
import { validateFormDataAgainstSchema } from '../utils/validation'
import { getSession } from '../auth/session'
import { GLOVEE_API_URL } from '../constants/api'
import { getCurrentOrgName } from '../utils/server'

export async function createNewTemplate(orgName: string, formData: FormData) {
  const { data, errors } = await validateFormDataAgainstSchema(TemplateSchema, formData)
  if (errors) {
    return { errors }
  }

  const { name, description } = data

  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Failed to get access token!' }
  }

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/template/admin/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, description }),
    })

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      revalidatePath('/admin/templates')
      return { success: 'Template created!' }
    }
  } catch (error) {
    return { error: 'Failed to create template!' }
  }
}

export async function updateTemplateTitleByID(templateID: number, title: string) {
  return null
}

export async function updateTemplateDescriptionByID(templateID: number, description: string) {
  return null
}

export async function deleteTemplateByID(orgName: string, templateID: number) {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Failed to get access token!' }
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/template/admin/delete/${templateID}`,
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
      revalidatePath('/admin/templates')
      return { success: 'Template deleted!' }
    }
  } catch (error) {
    return { error: 'Failed to delete template!' }
  }
}

/**
 * Update full template by id
 */
export async function updateFullTemplateById(
  templateId: number,
  template: TemplateType
): Promise<{ success?: string; error?: string }> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Failed to get access token!' }
  }

  const orgName = await getCurrentOrgName()

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/template/admin/full-template/${templateId}`,
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
      revalidatePath(`/admin/template/${templateId}/edit`)
      return { success: 'Template updated!' }
    }
  } catch (error) {
    return { error: 'Failed to update template!' }
  }
}
