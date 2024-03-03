import { prisma } from '@/prisma/prisma'
import { Template } from '@prisma/client'

export async function fetchTemplatesByUserId(userId: string) {
  try {
    const templates = await prisma.template.findMany({ where: { userId } })
    return templates
  } catch {
    return []
  }
}

export async function fetchTemplateById(id: string): Promise<Template | null> {
  try {
    const template = await prisma.template.findUnique({
      where: { id },
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

export async function fetchTemplateCategoriesByTemplateId(id: string) {
  const categories = await prisma.templateCategory.findMany({
    where: { templateId: id },
    include: {
      sections: true,
    },
  })

  return categories
}

export async function fetchTemplateQuestionSetsBySectionId(sectionId: string) {
  if (!sectionId) {
    return []
  }

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
    return []
  }
}
