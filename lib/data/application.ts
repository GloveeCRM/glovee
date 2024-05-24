import { prisma } from '@/prisma/prisma'
import {
  ApplicationCategoryType,
  ApplicationQuestionSetType,
  ApplicationSummaryType,
  ApplicationType,
} from '../types/application'
import { getSession } from '../auth/session'
import { GLOVEE_API_URL } from '../constants/api'

export async function fetchAdminClientApplications(
  orgName: string,
  clientID: number
): Promise<ApplicationType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/admin/client-applications/${clientID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.applications
  } catch (error) {
    return []
  }
}

export async function fetchClientApplications(
  orgName: string,
  clientID: number
): Promise<ApplicationType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/client/${clientID}/applications`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.applications
  } catch (error) {
    return []
  }
}

export async function searchApplications(
  orgName: string,
  query: string = '',
  limit: number = 0,
  offset: number = 0
): Promise<ApplicationType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/admin/search?query=${query}&limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.applications
  } catch (error) {
    return []
  }
}

export async function fetchApplicantInformation(
  orgName: string,
  clientID: number,
  applicationID: number
) {
  const accessToken = await getSession()
  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/client/${clientID}/application/${applicationID}/applicant`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.applicant
  } catch (error) {
    return null
  }
}

export async function fetchClientApplicationCategoriesIncludingSections(
  orgName: string,
  clientID: number,
  applicationID: number
): Promise<ApplicationCategoryType[]> {
  const accessToken = await getSession()
  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/application/client/${clientID}/application/${applicationID}/categories`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    return data.data.categories
  } catch (error) {
    return []
  }
}

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

export async function fetchApplicationsByUserId(id: string) {
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

export async function fetchCategorieByApplicationId(
  id: string
): Promise<ApplicationCategoryType[] | null> {
  try {
    const categories = await prisma.category.findMany({
      where: {
        applicationId: id,
      },
      include: {
        sections: true,
      },
    })

    return null
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

export async function fetchQuestionSetsBySectionId(
  id: string
): Promise<ApplicationQuestionSetType[] | null> {
  if (!id) {
    return []
  }

  try {
    const questionSets = await prisma.questionSet.findMany({
      where: {
        sectionId: String(id),
      },
      include: {
        questions: {
          include: {
            answer: true,
          },
        },
      },
    })

    return null
  } catch {
    return null
  }
}
