import { prisma } from '@/prisma/prisma'
import { Category } from '@prisma/client'
import { ApplicationSummaryType, ApplicationType } from '../types/application'

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

export async function fetchApplicationSummariesByUserId(
  id: string
): Promise<ApplicationSummaryType[] | null> {
  try {
    const applications = await prisma.application.findMany({
      where: {
        clientId: id,
      },
      include: {
        categories: true,
      },
    })

    if (!applications) {
      return null
    }

    const applicationSummaries = applications.map((application) => ({
      id: application.id,
      applicantFirstName: application.applicantFirstName,
      applicantLastName: application.applicantLastName,
      role: application.role,
      status: application.status,
      completionRate: 25,
      categories: application.categories.map((category) => ({
        id: category.id,
        name: category.title,
        completionRate: 12,
      })),
    }))

    return applicationSummaries
  } catch (error) {
    return null
  }
}

export async function fetchApplicationsByUserId(id: string): Promise<ApplicationType[] | null> {
  try {
    const application = await prisma.application.findMany({
      where: {
        clientId: id,
      },
      include: {
        categories: {
          include: {
            sections: {
              include: {
                questionSets: {
                  include: {
                    questions: {},
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!application) {
      return null
    }

    return application
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function fetchApplicationById(id: string) {
  try {
    const application = await prisma.application.findFirst({
      where: {
        id,
      },
      include: {
        categories: {
          include: {
            sections: {
              include: {
                questionSets: {
                  include: {
                    questions: {},
                  },
                },
              },
            },
          },
        },
      },
    })

    return application
  } catch {
    return null
  }
}

export async function fetchApplicantByApplicationId(id: string) {
  try {
    const applicant = await prisma.application.findFirst({
      where: {
        id,
      },
      select: {
        applicantFirstName: true,
        applicantLastName: true,
      },
    })

    return applicant
  } catch {
    return null
  }
}

export async function fetchCategorieByApplicationId(id: string): Promise<Category[] | null> {
  try {
    const categories = await prisma.category.findMany({
      where: {
        applicationId: id,
      },
      include: {
        sections: true,
      },
    })

    return categories
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
