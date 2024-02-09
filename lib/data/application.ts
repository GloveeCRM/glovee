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
    const application = await prisma.application.findFirst({
      where: {
        clientId: id,
      },
    })

    return application
  } catch {
    return null
  }
}
