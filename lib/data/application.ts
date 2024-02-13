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
  body: any
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
