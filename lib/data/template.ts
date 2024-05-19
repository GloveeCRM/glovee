'use server'

import { prisma } from '@/prisma/prisma'
import { Template } from '@prisma/client'
import {
  TemplateCategoryType,
  TemplateQuestionSetType,
  TemplateType,
  TemplateType2,
} from '@/lib/types/template'
import { GLOVEE_API_URL } from '../constants/api'
import { getSession } from '../auth/session'

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
): Promise<TemplateType2[]> {
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
export async function fetchTemplateById(id: string): Promise<Template | null> {
  try {
    const template = await prisma.template.findUnique({ where: { id: id } })
    return template
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Fetch all template categoriies including sections by template id
 */
export async function fetchTemplateCategoriesWithSectionsByTemplateId(
  templateId: string
): Promise<TemplateCategoryType[] | null> {
  try {
    const categories = await prisma.templateCategory.findMany({
      where: { templateId: templateId },
      include: {
        sections: true,
      },
    })
    return categories
  } catch {
    return null
  }
}

/**
 * Fetch all template question sets by section id
 */
export async function fetchTemplateQuestionSetsWithQuestionsBySectionId(
  sectionId: string
): Promise<TemplateQuestionSetType[] | null> {
  try {
    const questionSets = await prisma.templateQuestionSet.findMany({
      where: {
        sectionId: sectionId,
      },
      include: {
        questions: true,
      },
    })
    return questionSets
  } catch {
    return null
  }
}

/**
 * Fetch a template by id with all of its categories, sections, question sets, and questions
 */
export async function fetchFullTemplateById(id: string): Promise<TemplateType | null> {
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
