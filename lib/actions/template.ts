'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/prisma/prisma'
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

/**
 * Delete template by id
 */
export async function deleteTemplateById(templateId: string) {
  try {
    await prisma.template.delete({
      where: {
        id: templateId,
      },
    })

    revalidatePath('/admin/templates')
  } catch (error) {
    return { error: 'Failed to delete template!' }
  }
  revalidatePath('/admin/templates')
}

/**
 * Update template title by id
 */
export async function updateTemplateTitleById(
  templateId: string,
  title: string
): Promise<{ success?: string; error?: string }> {
  try {
    await prisma.template.update({
      where: {
        id: templateId,
      },
      data: {
        title: title,
      },
    })

    revalidatePath(`/admin/template/${templateId}/edit`)
    return { success: 'Template title updated!' }
  } catch (error) {
    return { error: 'Failed to update template title!' }
  }
}

/**
 * Update template description by id
 */
export async function updateTemplateDescriptionById(
  templateId: string,
  description: string
): Promise<{ success?: string; error?: string }> {
  try {
    await prisma.template.update({
      where: {
        id: templateId,
      },
      data: {
        description: description,
      },
    })

    revalidatePath(`/admin/template/${templateId}/edit`)
    return { success: 'Template description updated!' }
  } catch (error) {
    return { error: 'Failed to update template description!' }
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
