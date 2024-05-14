'use server'

import bcrypt from 'bcryptjs'
import { v4 as uuid4 } from 'uuid'
import { AuthError } from 'next-auth'

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ResetPasswordToken, UserRole, VerificationToken } from '@prisma/client'
import { prisma } from '@/prisma/prisma'
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
import { getSessionPayload, removeSession, setSession } from '../auth/session'
import { GLOVEE_API_URL } from '../constants/api'

export async function login(
  formData: FormData
): Promise<{ success?: string; data?: Record<string, any>; error?: string; errors?: any }> {
  const { data, errors } = await validateFormDataAgainstSchema(LoginSchema, formData)

  if (errors) {
    return { errors }
  }

  const { email, password } = data

  const orgName = getCurrentOrgName()

  if (!orgName) {
    return { error: 'Organization not found!' }
  }

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      await setSession(data.data.accessToken)
      const tokenPayload = await getSessionPayload()
      const redirectLink =
        tokenPayload?.organization?.orgName === 'org'
          ? DEFAULT_ORG_MANAGEMENT_LOGIN_REDIRECT
          : tokenPayload?.user.role === UserRole.ORG_ADMIN ||
              tokenPayload?.user.role === UserRole.ORG_OWNER
            ? DEFAULT_ORG_ADMIN_LOGIN_REDIRECT
            : tokenPayload?.user.role === UserRole.ORG_CLIENT
              ? DEFAULT_ORG_CLIENT_LOGIN_REDIRECT
              : '/'
      return { success: 'Login Successful!', data: { redirectLink: redirectLink } }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

export async function signUp(
  formData: FormData
): Promise<{ success?: string; data?: Record<string, any>; error?: string; errors?: any }> {
  const { data, errors } = await validateFormDataAgainstSchema(SignUpSchema, formData)

  if (errors) {
    return { errors }
  }

  const { email, password, firstname, lastname } = data

  const orgName = getCurrentOrgName()
  if (!orgName) {
    return { error: 'Organization not found!' }
  }

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/client/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, firstName: firstname, lastName: lastname }),
    })

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      await setSession(data.data.accessToken)
      const tokenPayload = await getSessionPayload()
      const redirectLink =
        tokenPayload?.organization?.orgName === 'org'
          ? DEFAULT_ORG_MANAGEMENT_LOGIN_REDIRECT
          : tokenPayload?.user.role === UserRole.ORG_ADMIN ||
              tokenPayload?.user.role === UserRole.ORG_OWNER
            ? DEFAULT_ORG_ADMIN_LOGIN_REDIRECT
            : tokenPayload?.user.role === UserRole.ORG_CLIENT
              ? DEFAULT_ORG_CLIENT_LOGIN_REDIRECT
              : '/'
      return { success: 'Registration Successful!', data: { redirectLink: redirectLink } }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

/**
 * Logs out the user.
 */
export async function logout() {
  return await removeSession()
}

export async function resetPassword(formData: FormData) {
  const { data, errors } = await validateFormDataAgainstSchema(ResetPasswordSchema, formData)

  if (errors) {
    return { errors }
  }

  const { email } = data

  const orgName = getCurrentOrgName()

  if (!orgName) {
    return { error: 'Organization not found!' }
  }

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      return { success: 'Reset password email sent!', data: { redirectLink: '/login' } }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
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

  if (!orgName) {
    return { error: 'Organization not found!' }
  }

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
  const token = uuid4()
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
  const token = uuid4()
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

  if (!orgName) {
    return { error: 'Organization not found!' }
  }

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
// export async function resetPassword(token: string, prevState: any, formData: FormData) {
//   if (!token) {
//     return { error: 'Missing token!' }
//   }

//   const { data, errors } = await validateFormDataAgainstSchema(NewPasswordSchema, formData)

//   if (errors) {
//     return { errors }
//   }

//   const existingToken = await fetchResetPasswordTokenByToken(token)

//   if (!existingToken) {
//     return { error: 'Invalid Token!' }
//   }
//   const { password } = data

//   const tokenHasExpired = new Date(existingToken.expires) < new Date()

//   if (tokenHasExpired) {
//     return { error: 'Token has expired!' }
//   }

//   const orgName = getCurrentOrgName()

//   if (!orgName) {
//     return { error: 'Organization not found!' }
//   }

//   const existingUser = await fetchUserByEmailAndOrgName(existingToken.email, orgName)

//   if (!existingUser) {
//     return { error: 'Email does not exist!' }
//   }

//   const hashedPassword = await bcrypt.hash(password, 10)

//   try {
//     await prisma.user.update({
//       where: { id: existingUser.id },
//       data: {
//         password: hashedPassword,
//       },
//     })
//   } catch (error) {
//     return { error: 'Unable to set a new password!' }
//   }

//   await prisma.resetPasswordToken.delete({
//     where: { id: existingToken.id },
//   })

//   return { success: 'Password Updated!' }
// }

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

    if (!orgName) {
      return { error: 'Organization not found!' }
    }

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
