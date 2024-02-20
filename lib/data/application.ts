import { prisma } from '@/prisma/prisma'

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

export async function fetchApplicationByUserId(id: string) {
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
