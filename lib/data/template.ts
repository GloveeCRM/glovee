import { prisma } from '@/prisma/prisma'

export async function fetchTemplates() {
  try {
    const templates = await prisma.template.findMany()
    return templates
  } catch {
    return null
  }
}

export async function fetchTemplateById(id: string) {
  return prisma.template.findUnique({
    where: {
      id: id,
    },
  })
  // const templates = fetchTemplates()

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(templates.find((template) => template.id === id))
  //   }, 2000)
  // })
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
