import { prisma } from '@/prisma/prisma'

export async function fetchOrgByUserIdAndOrgName(userId: string, orgName: string) {
  const organization = await prisma.organization.findFirst({
    where: {
      orgName: orgName,
      users: {
        some: {
          id: userId,
        },
      },
    },
  })

  return organization
}
