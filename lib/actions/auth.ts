'use server'

import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'

import { prisma } from '@/prisma/prisma'
import { UserRole } from '@prisma/client'
import { getAuthenticatedUser, getAuthenticatedUserRole, signIn, signOut } from '@/auth'
import {
  LoginSchema,
  NewPasswordSchema,
  SignUpSchema,
  ResetPasswordSchema,
  SettingsSchema,
} from '@/lib/zod/schemas'
import { fetchUserByEmailAndOrgName, fetchUserById } from '@/lib/data/user'
import {
  DEFAULT_ORG_ADMIN_LOGIN_REDIRECT,
  DEFAULT_ORG_CLIENT_LOGIN_REDIRECT,
  DEFAULT_ORG_MANAGEMENT_LOGIN_REDIRECT,
} from '@/lib/constants/routes'
import {
  generateAndStoreResetPasswordToken,
  generateAndStoreVerificationToken,
} from '@/lib/token/tokens'
import { sendResetPasswordEmail, sendVerificationEmail } from '@/lib/mail/mail'
import { getVerificationTokenByToken } from '@/lib/data/verification-token'
import { fetchResetPasswordTokenByToken } from '@/lib/data/reset-password-token'
import { validateFormDataAgainstSchema } from '@/lib/utils/validation'
import { getCurrentOrgName } from '../utils/server'

export async function login(prevState: any, formData: FormData) {
  const { data, errors } = await validateFormDataAgainstSchema(LoginSchema, formData)

  if (errors) {
    return { errors }
  }

  const { email, password } = data

  const orgName = getCurrentOrgName()

  const existingUser = await fetchUserByEmailAndOrgName(email, orgName)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateAndStoreVerificationToken(email, 3600)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)
    return { success: 'Confirmation email sent! Check your email to login.' }
  }

  try {
    const redirectLink =
      existingUser.organization?.orgName === 'org'
        ? DEFAULT_ORG_MANAGEMENT_LOGIN_REDIRECT
        : existingUser.role === UserRole.ORG_ADMIN
          ? DEFAULT_ORG_ADMIN_LOGIN_REDIRECT
          : existingUser.role === UserRole.ORG_CLIENT
            ? DEFAULT_ORG_CLIENT_LOGIN_REDIRECT
            : '/'

    await signIn('credentials', {
      email,
      password,
      redirectTo: redirectLink,
    })

    return { success: 'Login Successful!' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials!' }
        default:
          return { error: 'somethig went wrong!' }
      }
    }

    throw error
  }
}

export async function signUp(prevState: any, formData: FormData) {
  const { data, errors } = await validateFormDataAgainstSchema(SignUpSchema, formData)

  if (errors) {
    return { errors }
  }

  const { email, password, name } = data

  const orgName = getCurrentOrgName()

  const existingUser = await fetchUserByEmailAndOrgName(email, orgName)

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: UserRole.ORG_CLIENT,
      organization: {
        connect: {
          orgName: orgName,
        },
      },
    },
  })

  const verificationToken = await generateAndStoreVerificationToken(email, 3600)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)
  return { success: 'Confirmation email sent! Check your email to login.' }
}

export async function logout() {
  return await signOut({
    redirectTo: '/login',
  })
}

export async function verifyUserEmail(token: string) {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Token does not exist!' }
  }

  const tokenHasExpired = new Date(existingToken.expires) < new Date()

  if (tokenHasExpired) {
    return { error: 'Token has expired!' }
  }

  const orgName = getCurrentOrgName()

  const existingUser = await fetchUserByEmailAndOrgName(existingToken.email, orgName)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  })

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Email verified!' }
}

export async function triggerResetPasswordEmail(prevState: any, formData: FormData) {
  const validatedFields = await validateFormDataAgainstSchema(ResetPasswordSchema, formData)

  const { email } = validatedFields.data

  const orgName = getCurrentOrgName()

  const existingUser = await fetchUserByEmailAndOrgName(email, orgName)

  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  const resetPasswordToken = await generateAndStoreResetPasswordToken(email, 3600)
  await sendResetPasswordEmail(resetPasswordToken.email, resetPasswordToken.token)
  return { success: 'Reset password email sent!' }
}

export async function resetPassword(token: any, prevState: any, formData: FormData) {
  if (!token) {
    return { error: 'Missing token!' }
  }

  const validatedFields = await validateFormDataAgainstSchema(NewPasswordSchema, formData)

  const { password } = validatedFields.data

  const existingToken = await fetchResetPasswordTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid Token!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const orgName = getCurrentOrgName()

  const existingUser = await fetchUserByEmailAndOrgName(existingToken.email, orgName)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  })

  await prisma.resetPasswordToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Password Updated!' }
}

export async function admin() {
  const role = await getAuthenticatedUserRole()

  if (role === UserRole.ORG_ADMIN) {
    return { success: 'Allowed!' }
  }

  return { error: 'Forbidden!' }
}

export async function settings(prevState: any, formData: FormData) {
  const validatedFields = await validateFormDataAgainstSchema(SettingsSchema, formData)

  const user = await getAuthenticatedUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const dbUser = await fetchUserById(user.id!)

  if (!dbUser) {
    return { error: 'Unauthorized' }
  }

  let { name, email, password, newPassword, role } = validatedFields.data

  if (email && email !== user.email) {
    const orgName = getCurrentOrgName()

    const existingUser = await fetchUserByEmailAndOrgName(email, orgName)

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' }
    }

    const verificationToken = await generateAndStoreVerificationToken(email, 3600)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: 'Confirmation email sent!' }
  }

  if (password && newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(password, dbUser.password)

    if (!passwordsMatch) {
      return { error: 'Icorrect Password!' }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    password = hashedPassword
    newPassword = undefined
  }
  await prisma.user.update({
    where: { id: user.id },
    data: {
      name,
      email,
      password,
      role,
    },
  })

  return { success: 'Settings Updated!' }
}
