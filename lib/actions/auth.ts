'use server'

import { UserRoleTypes } from '@/lib/types/user'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import {
  DEFAULT_ORG_ADMIN_LOGIN_REDIRECT,
  DEFAULT_ORG_CLIENT_LOGIN_REDIRECT,
  DEFAULT_ORG_MANAGEMENT_LOGIN_REDIRECT,
} from '@/lib/constants/routes'

import { getSession, getSessionPayload, removeSession, setSession } from '@/lib/auth/session'
import { keysCamelCaseToSnakeCase, keysSnakeCaseToCamelCase } from '../utils/json'
import { getCurrentOrgName } from '../utils/server'

interface LoginInputDTO {
  email: string
  password: string
}

interface LoginOutputDTO {
  success?: string
  data?: Record<string, any>
  error?: string
}

export async function login({ email, password }: LoginInputDTO): Promise<LoginOutputDTO> {
  const orgName = await getCurrentOrgName()

  const body = {
    email,
    password,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodySnakeCase),
    })

    const data = await response.json()
    const camelCaseData = keysSnakeCaseToCamelCase(data)

    if (camelCaseData.status === 'error') {
      return { error: camelCaseData.error }
    } else {
      await setSession(camelCaseData.data.accessToken)
      const tokenPayload = await getSessionPayload()
      const redirectLink =
        tokenPayload?.user.role === UserRoleTypes.ORG_ADMIN ||
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

interface RefreshTokenOutputDTO {
  success?: string
  error?: string
}

export async function refreshToken(): Promise<RefreshTokenOutputDTO> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Token not found!' }
  }

  const orgName = await getCurrentOrgName()

  const body = {
    accessToken,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodySnakeCase),
    })

    const data = await response.json()
    const camelCaseData = keysSnakeCaseToCamelCase(data)

    if (camelCaseData.status === 'error') {
      return { error: camelCaseData.error }
    } else {
      await setSession(camelCaseData.data.accessToken)
      return { success: 'Token refreshed!' }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

interface SignupInputDTO {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface SignupOutputDTO {
  success?: string
  data?: Record<string, any>
  error?: string
}

export async function signup({
  email,
  password,
  firstName,
  lastName,
}: SignupInputDTO): Promise<SignupOutputDTO> {
  const orgName = await getCurrentOrgName()

  const body = {
    user: {
      email,
      firstName,
      lastName,
    },
    password,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodySnakeCase),
    })

    const data = await response.json()
    const camelCaseData = keysSnakeCaseToCamelCase(data)

    if (camelCaseData.status === 'error') {
      return { error: camelCaseData.error }
    } else {
      await setSession(camelCaseData.data.accessToken)
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

interface ForgotPasswordInputDTO {
  email: string
}

interface ForgotPasswordOutputDTO {
  success?: string
  error?: string
}

export async function forgotPassword({
  email,
}: ForgotPasswordInputDTO): Promise<ForgotPasswordOutputDTO> {
  const orgName = await getCurrentOrgName()

  const body = {
    email,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodySnakeCase),
    })

    const data = await response.json()
    const camelCaseData = keysSnakeCaseToCamelCase(data)

    if (camelCaseData.status === 'error') {
      return { error: camelCaseData.error }
    } else {
      return { success: camelCaseData.data.message }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

interface ResetPasswordInputDTO {
  resetPasswordToken: string
  password: string
}

interface ResetPasswordOutputDTO {
  success?: string
  error?: string
  data?: Record<string, any>
}

export async function resetPassword({
  resetPasswordToken,
  password,
}: ResetPasswordInputDTO): Promise<ResetPasswordOutputDTO> {
  const orgName = await getCurrentOrgName()

  const body = {
    resetPasswordToken,
    newPassword: password,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodySnakeCase),
    })

    const data = await response.json()
    const camelCaseData = keysSnakeCaseToCamelCase(data)

    if (camelCaseData.status === 'error') {
      return { error: camelCaseData.error }
    } else {
      return { success: camelCaseData.data.message, data: { redirectLink: '/login' } }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}
