import { prisma } from '@/prisma/prisma'

export async function fetchUserByEmailAndOrgName(email: string, orgName: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        organization: {
          name: orgName,
        },
      },
    })

    return user
  } catch {
    return null
  }
}

export async function fetchUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } })
    return user
  } catch {
    return null
  }
}
