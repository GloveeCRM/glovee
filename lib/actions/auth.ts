'use server'

import { z } from 'zod'

import { UserRoleTypes } from '@/lib/types/user'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import {
  DEFAULT_ORG_ADMIN_LOGIN_REDIRECT,
  DEFAULT_ORG_CLIENT_LOGIN_REDIRECT,
  DEFAULT_ORG_MANAGEMENT_LOGIN_REDIRECT,
} from '@/lib/constants/routes'
import { validateValuesAgainstSchema } from '@/lib/utils/validation'
import {
  LoginSchema,
  SignupSchema,
  ResetPasswordSchema,
  ForgotPasswordSchema,
} from '@/lib/zod/schemas'

import { getSession, getSessionPayload, removeSession, setSession } from '@/lib/auth/session'

export async function login(
  orgName: string,
  values: z.infer<typeof LoginSchema>
): Promise<{ success?: string; data?: Record<string, any>; error?: string; errors?: any }> {
  const { email, password } = values

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
          : tokenPayload?.user.role === UserRoleTypes.ORG_ADMIN ||
              tokenPayload?.user.role === UserRoleTypes.ORG_OWNER
            ? DEFAULT_ORG_ADMIN_LOGIN_REDIRECT
            : tokenPayload?.user.role === UserRoleTypes.ORG_CLIENT
              ? DEFAULT_ORG_CLIENT_LOGIN_REDIRECT
              : '/'
      return { success: 'Login Successful!', data: { redirectLink: redirectLink } }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

export async function refreshToken(orgName: string) {
  const accessToken = await getSession()

  if (!accessToken) {
    return { error: 'Token not found!' }
  }

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken }),
    })

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      await setSession(data.data.accessToken)
      return { success: 'Token refreshed!' }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

export async function signup(
  orgName: string,
  values: z.infer<typeof SignupSchema>
): Promise<{ success?: string; data?: Record<string, any>; error?: string; errors?: any }> {
  const { email, password, firstName, lastName } = values

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/client/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
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
          : tokenPayload?.user.role === UserRoleTypes.ORG_ADMIN ||
              tokenPayload?.user.role === UserRoleTypes.ORG_OWNER
            ? DEFAULT_ORG_ADMIN_LOGIN_REDIRECT
            : tokenPayload?.user.role === UserRoleTypes.ORG_CLIENT
              ? DEFAULT_ORG_CLIENT_LOGIN_REDIRECT
              : '/'
      return { success: 'Successfully Signed Up!', data: { redirectLink: redirectLink } }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

export async function logout() {
  return await removeSession()
}

export async function forgotPassword(
  orgName: string,
  values: z.infer<typeof ForgotPasswordSchema>
) {
  const { email } = values

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
      return { success: data.data.message }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

export async function resetPassword(
  orgName: string,
  resetPasswordToken: string,
  formData: FormData
): Promise<{
  success?: string
  error?: string
  errors?: any
  data?: Record<string, any>
}> {
  const { data, errors } = await validateValuesAgainstSchema(ResetPasswordSchema, formData)

  if (errors) {
    return { errors }
  }

  const { password } = data

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resetPasswordToken, newPassword: password }),
    })

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      return { success: 'Password Reset Successful!', data: { redirectLink: '/login' } }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

export async function verifyUserEmail(verificationToken: string) {
  return { error: 'Not implemented!', success: null }
}
