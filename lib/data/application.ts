import { prisma } from '@/prisma/prisma'

export async function fetchApplicationByOrgNameandSearchQuery(orgName: string, query: string) {
  try {
    const applications = await prisma.application.findMany({
      where: {
        organization: {
          orgName: orgName,
        },
        OR: [
          {
            id: {
              contains: query,
            },
          },
          {
            clientId: {
              contains: query,
            },
          },
          {
            client: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            applicantFirstName: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            applicantLastName: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        client: {
          select: {
            name: true,
          },
        },
      },
    })
    return applications
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function fetchApplications() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        client: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    })

    return applications
  } catch {
    return []
  }
}

export async function fetchApplicationsByUserId(id: string) {
  try {
    const application = await prisma.application.findMany({
      where: {
        clientId: id,
      },
    })

    return application
  } catch {
    return null
  }
}

interface Application {
  clientId: string
}

export async function fetchApplicationById(id: string) {
  try {
    const application = (await prisma.application.findFirst({
      where: {
        id,
      },
    })) as Application

    return application
  } catch {
    return null
  }
}

export async function fetchCategorieByApplicationId(id: string) {
  try {
    const category = await prisma.category.findMany({
      where: {
        applicationId: id,
      },
      include: {
        sections: true,
      },
    })

    return category
  } catch {
    return null
  }
}

export async function fetchSectionsById(id: string) {
  try {
    const sections = await prisma.section.findMany({
      where: {
        id: id,
      },
      include: {
        questionSets: true,
      },
    })

    return sections
  } catch {
    return null
  }
}

export async function fetchQuestionSetsBySectionId(id: string) {
  if (!id) {
    return []
  }

  try {
    const questionSets = await prisma.questionSet.findMany({
      where: {
        sectionId: id,
      },
      include: {
        questions: {
          include: {
            answer: true,
          },
        },
      },
    })

    return questionSets
  } catch {
    return null
  }
}
