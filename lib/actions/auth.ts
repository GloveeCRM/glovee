'use server'

import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'

import { prisma } from '@/prisma/prisma'
import { UserRole } from '@prisma/client'
import { signIn, signOut } from '@/auth'
import {
  LoginSchema,
  NewPasswordSchema,
  SignUpSchema,
  ResetSchema,
  SettingsSchema,
} from '@/lib/zod/schemas'
import { fetchUserByEmailAndOrgName, fetchUserById } from '@/lib/data/user'
import {
  DEFAULT_ORG_ADMIN_LOGIN_REDIRECT,
  DEFAULT_ORG_CLIENT_LOGIN_REDIRECT,
  DEFAULT_ORG_MANAGEMENT_LOGIN_REDIRECT,
} from '@/lib/constants/routes'
import { generatePasswordResetToken, generateVerificationToken } from '../token/tokens'
import { sendPasswordResetEmail, sendVerificationEmail } from '../mail/mail'
import { getVerificationTokenByToken } from '../data/verification-token'
import { getPasswordResetTokenByToken } from '../data/password-reset-token'
import { currentRole, currentUser } from '../utils/user'
import { validateFormDataAgainstSchema } from '../utils/validation'
import { headers } from 'next/headers'
import { extractSubdomainFromHostname } from '../utils/url'

export async function login(prevState: any, formData: FormData) {
  const { data, errors } = await validateFormDataAgainstSchema(LoginSchema, formData)

  if (errors) {
    return { errors }
  }

  const { email, password } = data

  const headersList = headers()
  const hostname = headersList.get('host')
  const subdomain = extractSubdomainFromHostname(hostname!) || ''

  const existingUser = await fetchUserByEmailAndOrgName(email, subdomain)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  const organization = await prisma.organization.findFirst({
    where: {
      orgName: subdomain,
      users: {
        some: {
          id: existingUser.id,
        },
      },
    },
  })

  if (!organization) {
    return { error: 'Not authorized to access this organization!' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email as any)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: 'Confirmation email sent!' }
  }

  try {
    const redirectLink =
      organization.orgName === 'org'
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
  const validatedFields = await validateFormDataAgainstSchema(SignUpSchema, formData)

  const { email, password, name } = validatedFields.data

  const headersList = headers()
  const hostname = headersList.get('host')
  const subdomain = extractSubdomainFromHostname(hostname!) || ''

  const existingUser = await fetchUserByEmailAndOrgName(email, subdomain)

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const organization = await prisma.organization.findFirst({
    where: {
      name: subdomain,
    },
  })

  if (!organization) {
    throw new Error('Organization not found!')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: UserRole.ORG_CLIENT,
      organizationId: organization.id,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: 'Confirmation email sent!' }
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

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const headersList = headers()
  const hostname = headersList.get('host')
  const subdomain = extractSubdomainFromHostname(hostname!) || ''

  const existingUser = await prisma.user.findFirst({
    where: {
      email: existingToken.email,
      organization: {
        name: subdomain,
      },
    },
  })

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

export async function sendResetPasswordEmail(prevState: any, formData: FormData) {
  const validatedFields = await validateFormDataAgainstSchema(ResetSchema, formData)

  const { email } = validatedFields.data

  const headersList = headers()
  const hostname = headersList.get('host')
  const subdomain = extractSubdomainFromHostname(hostname!) || ''

  const existingUser = await fetchUserByEmailAndOrgName(email, subdomain)

  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  const passwordResetToken = await generatePasswordResetToken(email)

  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

  return { success: 'Reset email sent!' }
}

export async function resetPassword(token: any, prevState: any, formData: FormData) {
  if (!token) {
    return { error: 'Missing token!' }
  }

  const validatedFields = await validateFormDataAgainstSchema(NewPasswordSchema, formData)

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid Token!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const headersList = headers()
  const hostname = headersList.get('host')
  const subdomain = extractSubdomainFromHostname(hostname!) || ''

  const existingUser = await fetchUserByEmailAndOrgName(existingToken.email, subdomain)

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

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Password Updated!' }
}

export async function admin() {
  const role = await currentRole()

  if (role === UserRole.ORG_ADMIN) {
    return { success: 'Allowed!' }
  }

  return { error: 'Forbidden!' }
}

export async function settings(prevState: any, formData: FormData) {
  const validatedFields = await validateFormDataAgainstSchema(SettingsSchema, formData)

  const user = await currentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const dbUser = await fetchUserById(user.id!) // ! to check if it's null or not

  if (!dbUser) {
    return { error: 'Unauthorized' }
  }

  let { name, email, password, newPassword, role } = validatedFields.data

  if (email && email !== user.email) {
    const headersList = headers()
    const hostname = headersList.get('host')
    const subdomain = extractSubdomainFromHostname(hostname!) || ''

    const existingUser = await fetchUserByEmailAndOrgName(email, subdomain)

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' }
    }

    const verificationToken = await generateVerificationToken(email)
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
