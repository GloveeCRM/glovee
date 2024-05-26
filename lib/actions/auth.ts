'use server'

import { UserRoleTypes } from '../types/user'
import {
  LoginSchema,
  SignUpSchema,
  ResetPasswordSchema,
  ForgotPasswordSchema,
} from '@/lib/zod/schemas'
import {
  DEFAULT_ORG_ADMIN_LOGIN_REDIRECT,
  DEFAULT_ORG_CLIENT_LOGIN_REDIRECT,
  DEFAULT_ORG_MANAGEMENT_LOGIN_REDIRECT,
} from '@/lib/constants/routes'
import { validateFormDataAgainstSchema } from '@/lib/utils/validation'
import { getCurrentOrgName } from '@/lib/utils/server'
import { getSession, getSessionPayload, removeSession, setSession } from '../auth/session'
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

export async function refreshToken() {
  const accessToken = await getSession()

  if (!accessToken) {
    return { error: 'Token not found!' }
  }

  const orgName = getCurrentOrgName()

  if (!orgName) {
    return { error: 'Organization not found!' }
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
          : tokenPayload?.user.role === UserRoleTypes.ORG_ADMIN ||
              tokenPayload?.user.role === UserRoleTypes.ORG_OWNER
            ? DEFAULT_ORG_ADMIN_LOGIN_REDIRECT
            : tokenPayload?.user.role === UserRoleTypes.ORG_CLIENT
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

export async function forgotPassword(formData: FormData) {
  const { data, errors } = await validateFormDataAgainstSchema(ForgotPasswordSchema, formData)

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

export async function resetPassword(
  resetPasswordToken: string,
  formData: FormData
): Promise<{
  success?: string
  error?: string
  errors?: any
  data?: Record<string, any>
}> {
  const { data, errors } = await validateFormDataAgainstSchema(ResetPasswordSchema, formData)

  if (errors) {
    return { errors }
  }

  const { password } = data

  const orgName = getCurrentOrgName()

  if (!orgName) {
    return { error: 'Organization not found!' }
  }

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
