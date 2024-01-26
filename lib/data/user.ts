import { prisma } from '@/lib/db/prisma'

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email: email } })

    return user
  } catch {
    return null
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } })

    return user
  } catch {
    return null
  }
}
