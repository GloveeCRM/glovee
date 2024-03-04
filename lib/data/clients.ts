import { prisma } from '@/prisma/prisma'
import { UserRole } from '@prisma/client'

export async function fetchClientsByOrgName(orgName: string) {
  try {
    const clients = await prisma.user.findMany({
      where: {
        role: UserRole.ORG_CLIENT,
        organization: {
          orgName: orgName,
        },
      },
    })

    return clients
  } catch {
    return []
  }
}
