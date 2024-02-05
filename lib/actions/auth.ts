'use server'

import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'

import { prisma } from '@/prisma/prisma'
import { LoginSchema, NewPasswordSchema, RegisterSchema, ResetSchema } from '@/lib/zod/schemas'
import { signIn, signOut } from '@/auth'
import { getUserByEmail } from '@/lib/data/user'
import { DEFAULT_ADMIN_LOGIN_REDIRECT } from '@/lib/constants/routes'
import { generatePasswordResetToken, generateVerificationToken } from '../token/tokens'
import { sendPasswordResetEmail, sendVerificationEmail } from '../mail/mail'
import { getVerificationTokenByToken } from '../data/verification-token'
import { getPasswordResetTokenByToken } from '../data/password-reset-token'
import { currentRole } from '../auth/user'
import { UserRole } from '@prisma/client'

export async function login(prevState: any, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email as any)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: 'Confirmation email sent!' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_ADMIN_LOGIN_REDIRECT,
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

export async function register(prevState: any, formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const { email, password, name } = validatedFields.data

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: 'Confirmation email sent!' }
}

export async function logout() {
  return await signOut()
}

export async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Token does not exist!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

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

export async function reset(prevState: any, formData: FormData) {
  const validatedFields = ResetSchema.safeParse({
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  const passwordResetToken = await generatePasswordResetToken(email)

  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

  return { success: 'Reset email sent!' }
}

export async function newPassword(token: any, prevState: any, formData: FormData) {
  const validatedFields = NewPasswordSchema.safeParse({
    password: formData.get('password'),
  })
  if (!token) {
    return { error: 'Missing token!' }
  }

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid Token!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

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

  if (role === UserRole.ADMIN) {
    return { success: 'Allowed!' }
  }

  return { error: 'Forbidden!' }
}
