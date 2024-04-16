'use server'

import { prisma } from '@/prisma/prisma'
import { Template } from '@prisma/client'
import { TemplateCategoryType, TemplateQuestionSetType, TemplateType } from '@/lib/types/template'

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
