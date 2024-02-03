import { prisma } from '@/prisma/prisma'

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verifcationToken = await prisma.verificationToken.findUnique({
      where: { token },
    })

    return verifcationToken
  } catch (error) {
    return null
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verifcationToken = await prisma.verificationToken.findFirst({
      where: { email },
    })

    return verifcationToken
  } catch (error) {
    return null
  }
}
