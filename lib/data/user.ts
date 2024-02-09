import { prisma } from '@/prisma/prisma'

export async function fetchUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email: email } })
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
