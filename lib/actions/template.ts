'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { TemplateType } from '@/lib/types/template'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { TemplateSchema } from '@/lib/zod/schemas'
import { getSession } from '@/lib/auth/session'

export async function createNewTemplate(orgName: string, values: z.infer<typeof TemplateSchema>) {
  const { name, description } = values

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

// TODO: Implement the following function
export async function updateTemplateTitleByID(templateID: number, title: string) {
  return null
}

// TODO: Implement the following function
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

export async function updateFullTemplateByID(
  orgName: string,
  templateID: number,
  template: TemplateType
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
