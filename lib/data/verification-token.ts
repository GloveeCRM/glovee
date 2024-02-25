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

export async function upsertVerificationToken(email: string, token: string, expires: Date) {
  const verificationToken = await prisma.verificationToken.upsert({
    create: {
      email: email,
      token: token,
      expires: expires,
    },
    update: {
      token: token,
      expires: expires,
    },
    where: {
      email: email,
    },
  })

  return verificationToken
}
