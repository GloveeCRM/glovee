'use server'

import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { AuthError } from 'next-auth'

import { prisma } from '@/prisma/prisma'
import { ResetPasswordToken, UserRole, VerificationToken } from '@prisma/client'
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
import { sendResetPasswordEmail, sendVerificationEmail } from '@/lib/mail/mail'
import { getVerificationTokenByToken } from '@/lib/data/verification-token'
import { fetchResetPasswordTokenByToken } from '@/lib/data/reset-password-token'
import { validateFormDataAgainstSchema } from '@/lib/utils/validation'
import { getCurrentOrgName } from '@/lib/utils/server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

/**
 * Logs in a user with the provided form data.
 */
export async function login(
  prevState: any,
  formData: FormData
): Promise<{
  success?: string
  error?: string
  errors?: any
}> {
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

/**
 * Sign up a user with the provided form data.
 */
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

  try {
    await prisma.user.create({
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
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.meta?.cause ==
        "No 'Organization' record(s) (needed to inline the relation on 'User' record(s)) was found for a nested connect on one-to-many relation 'OrganizationToUser'."
    ) {
      return { error: 'Organization does not exist!' }
    } else {
      return { error: 'Something went wrong!' }
    }
  }
}

/**
 * Logs out the user.
 */
export async function logout() {
  return await signOut({
    redirectTo: '/login',
  })
}

/**
 * Verifies the user's email using the provided token.
 */
export async function verifyUserEmail(
  token: string
): Promise<{ success?: string; error?: string }> {
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

  try {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    })
  } catch (error) {
    return { error: 'Unable to verify email!' }
  }

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Email verified!' }
}

/**
 * Updates or creates a verification token for a given email.
 */
export async function upsertVerificationToken(
  email: string,
  token: string,
  expires: Date
): Promise<VerificationToken> {
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

/**
 * Generates and stores a verification token for the given email.
 */
export async function generateAndStoreVerificationToken(
  email: string,
  expiresInSeconds: number
): Promise<VerificationToken> {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + expiresInSeconds * 1000)
  const verificationToken = await upsertVerificationToken(email, token, expires)
  return verificationToken
}

/**
 * Updates or creates a reset password token for a given email.
 */
export async function upsertResetPasswordToken(
  email: string,
  token: string,
  expires: Date
): Promise<ResetPasswordToken> {
  const resetPasswordToken = await prisma.resetPasswordToken.upsert({
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

  return resetPasswordToken
}

/**
 * Generates and stores a reset password token for the given email.
 */
export async function generateAndStoreResetPasswordToken(
  email: string,
  expiresInSeconds: number
): Promise<VerificationToken> {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + expiresInSeconds * 1000)
  const resetPasswordToken = await upsertResetPasswordToken(email, token, expires)
  return resetPasswordToken
}

/**
 * Triggers a reset password email for the given email.
 */
export async function triggerResetPasswordEmail(
  prevState: any,
  formData: FormData
): Promise<{
  success?: string
  error?: string
  errors?: any
}> {
  const { data, errors } = await validateFormDataAgainstSchema(ResetPasswordSchema, formData)

  if (errors) {
    return { errors }
  }

  const { email } = data
  const orgName = getCurrentOrgName()

  const existingUser = await fetchUserByEmailAndOrgName(email, orgName)

  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  try {
    const resetPasswordToken = await generateAndStoreResetPasswordToken(email, 3600)
    await sendResetPasswordEmail(resetPasswordToken.email, resetPasswordToken.token)
    return { success: 'Reset password email sent!' }
  } catch (error) {
    return { error: 'Unable to send reset password email!' }
  }
}

/**
 * Resets the password for a user.
 */
export async function resetPassword(token: string, prevState: any, formData: FormData) {
  if (!token) {
    return { error: 'Missing token!' }
  }

  const { data, errors } = await validateFormDataAgainstSchema(NewPasswordSchema, formData)

  if (errors) {
    return { errors }
  }

  const existingToken = await fetchResetPasswordTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid Token!' }
  }
  const { password } = data

  const tokenHasExpired = new Date(existingToken.expires) < new Date()

  if (tokenHasExpired) {
    return { error: 'Token has expired!' }
  }

  const orgName = getCurrentOrgName()

  const existingUser = await fetchUserByEmailAndOrgName(existingToken.email, orgName)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        password: hashedPassword,
      },
    })
  } catch (error) {
    return { error: 'Unable to set a new password!' }
  }

  await prisma.resetPasswordToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Password Updated!' }
}

// TODO: Clean up the following code
export async function admin() {
  const role = await getAuthenticatedUserRole()

  if (role === UserRole.ORG_ADMIN) {
    return { success: 'Allowed!' }
  }

  return { error: 'Forbidden!' }
}

// TODO: Clean up the following code
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
