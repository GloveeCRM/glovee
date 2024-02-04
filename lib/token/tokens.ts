import { v4 as uuidv4 } from 'uuid'

import { prisma } from '@/prisma/prisma'
import { getVerificationTokenByEmail } from '../data/verification-token'
import { getPasswordResetTokenByEmail } from '../data/password-reset-token'

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    const verificationToken = await prisma.verificationToken.update({
      where: {
        id: existingToken.id,
      },
      data: {
        token,
        expires,
      },
    })

    return verificationToken
  } else {
    const verificationToken = await prisma.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    })

    return verificationToken
  }
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    const passwordResetToken = await prisma.passwordResetToken.update({
      where: {
        id: existingToken.id,
      },
      data: {
        token,
        expires,
      },
    })

    return passwordResetToken
  } else {
    const passwordResetToken = await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    })

    return passwordResetToken
  }
}
