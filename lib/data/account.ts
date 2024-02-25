import { prisma } from '@/prisma/prisma'
import { Account } from '@prisma/client'

export async function getAccountByUserId(userId: string): Promise<Account | null> {
  const account = await prisma.account.findFirst({
    where: { userId: userId },
  })

  return account
}
