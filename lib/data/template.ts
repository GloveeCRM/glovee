'use server'

import { TemplateType } from '@/lib/types/template'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'

export async function searchTemplates(
  orgName: string,
  query: string = '',
  limit: number = 0,
  offset: number = 0
): Promise<TemplateType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/template/admin/search?query=${query}&limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    const data = await response.json()
    return data.data.templates
  } catch (error) {
    return []
  }
}

/**
 * Fetch template info by id
 */
export async function fetchTemplateById(orgName: string, id: number): Promise<TemplateType | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/template/admin/information/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()

    if (data.error) {
      return null
    } else {
      return data.data.template
    }
  } catch {
    return null
  }
}

export async function fetchFullTemplateById(
  orgName: string,
  id: number
): Promise<TemplateType | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/template/admin/full-template/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return null
    } else {
      return data.data.template
    }
  } catch (error) {
    return null
  }
}
