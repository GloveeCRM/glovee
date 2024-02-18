import { prisma } from '@/prisma/prisma'

export async function fetchTemplatesByUserId(userId: string) {
  try {
    const templates = await prisma.template.findMany({ where: { userId } })
    return templates
  } catch {
    return []
  }
}

export async function fetchTemplateById(id: string) {
  try {
    const template = await prisma.template.findUnique({
      where: { id },
      include: {
        templateCategories: {
          include: {
            templateSections: {
              include: {
                templateQuestionSets: {
                  include: {
                    templateQuestions: true,
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
      templateSections: true,
    },
  })

  return categories
}
