'use server'

import { prisma } from '@/prisma/prisma'
import { Template } from '@prisma/client'
import { TemplateType } from '@/lib/types/template'
import { GLOVEE_API_URL } from '../constants/api'
import { getSession } from '../auth/session'
import { getCurrentOrgName } from '../utils/server'

// TODO: Change this to ORG ID.
/**
 * Fetch all templates by org id
 */
export async function fetchTemplatesByOrgId(orgId: string): Promise<Template[] | null> {
  try {
    const templates = await prisma.template.findMany({ where: { orgId: orgId } })
    return templates
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function searchTemplates(
  orgName: string,
  query?: string,
  limit?: number,
  offset?: number
): Promise<TemplateType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/template/admin/search?q=${query}&limit=${limit}&offset=${offset}`,
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
export async function fetchTemplateById(id: number): Promise<TemplateType | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }

  const orgName = await getCurrentOrgName()

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

/**
 * Fetch a template by id with all of its categories, sections, question sets, and questions
 */
export async function fetchFullTemplateById(id: string) {
  try {
    const template = await prisma.template.findUnique({
      where: { id: id },
      include: {
        categories: {
          include: {
            sections: {
              include: {
                questionSets: {
                  include: {
                    questions: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return template
  } catch {
    return null
  }
}

export async function fetchFullTemplateById2(id: number): Promise<TemplateType | null> {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }

  const orgName = await getCurrentOrgName()

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
