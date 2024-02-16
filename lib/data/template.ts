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

export async function fetchCategoriesByTemplateId(id: string | number) {
  const categories = [
    {
      id: 1,
      name: 'Category 1',
      subCategories: [
        {
          id: 1,
          name: 'Sub Category 1',
        },
        {
          id: 2,
          name: 'Sub Category 2',
        },
        {
          id: 3,
          name: 'Sub Category 3',
        },
      ],
    },
    {
      id: 2,
      name: 'Category 2',
      subCategories: [
        {
          id: 1,
          name: 'Sub Category 1',
        },
        {
          id: 2,
          name: 'Sub Category 2',
        },
        {
          id: 3,
          name: 'Sub Category 3',
        },
      ],
    },
    {
      id: 3,
      name: 'Category 3',
      subCategories: [
        {
          id: 1,
          name: 'Sub Category 1',
        },
        {
          id: 2,
          name: 'Sub Category 2',
        },
        {
          id: 3,
          name: 'Sub Category 3',
        },
      ],
    },
  ]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories)
    }, 2000)
  })
}
