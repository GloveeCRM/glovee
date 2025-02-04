'use server'

import { UserRoleTypes, UserType } from '@/lib/types/user'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import {
  DEFAULT_ORG_ADMIN_LOGIN_REDIRECT,
  DEFAULT_ORG_CLIENT_LOGIN_REDIRECT,
  DEFAULT_ORG_MANAGEMENT_LOGIN_REDIRECT,
} from '@/lib/constants/routes'

import {
  getRefreshToken,
  getSessionPayload,
  removeRefreshToken,
  removeSession,
  setRefreshToken,
  setSession,
} from '@/lib/auth/session'
import { keysCamelCaseToSnakeCase, keysSnakeCaseToCamelCase } from '../utils/json'
import { getCurrentOrgName } from '../utils/server'
import { apiRequest } from '../utils/http'
import { errorMessages } from '../constants/errors'

interface LoginProps {
  email: string
  password: string
}

interface LoginResponse {
  accessToken?: string
  refreshToken?: string
  redirectLink?: string
  error?: string
}

export async function login({ email, password }: LoginProps): Promise<LoginResponse> {
  const orgName = getCurrentOrgName()

  const { data, error } = await apiRequest<{ accessToken: string; refreshToken: string }>({
    path: 'rpc/login',
    method: 'POST',
    data: {
      email,
      password,
      orgName,
    },
    authRequired: false,
  })

  if (error) {
    return { error }
  }

  if (data?.accessToken && data?.refreshToken) {
    await setSession(data.accessToken)
    await setRefreshToken(data.refreshToken)
    const tokenPayload = await getSessionPayload()

    if (!tokenPayload) {
      return { error: errorMessages('something_went_wrong') }
    }

    const redirectLink =
      tokenPayload?.user.role === UserRoleTypes.ORG_ADMIN ||
      tokenPayload?.user.role === UserRoleTypes.ORG_OWNER
        ? DEFAULT_ORG_ADMIN_LOGIN_REDIRECT
        : tokenPayload?.user.role === UserRoleTypes.ORG_CLIENT
          ? DEFAULT_ORG_CLIENT_LOGIN_REDIRECT
          : '/'
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      redirectLink,
    }
  }

  return { error: errorMessages('something_went_wrong') }
}

interface RegisterProps {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface RegisterResponse {
  user?: UserType
  redirectURL?: string
  error?: string
}

export async function register({
  email,
  password,
  firstName,
  lastName,
}: RegisterProps): Promise<RegisterResponse> {
  const orgName = getCurrentOrgName()

  const { data, error } = await apiRequest<{ user: UserType }>({
    path: 'rpc/register_client',
    method: 'POST',
    data: {
      email,
      password,
      firstName,
      lastName,
      orgName,
    },
    authRequired: false,
  })

  if (error) {
    return { error }
  }

  if (data?.user) {
    const redirectURL =
      (data.user.role as UserRoleTypes) === UserRoleTypes.ORG_CLIENT
        ? DEFAULT_ORG_CLIENT_LOGIN_REDIRECT
        : (data.user.role as UserRoleTypes) === UserRoleTypes.ORG_ADMIN
          ? DEFAULT_ORG_ADMIN_LOGIN_REDIRECT
          : '/'

    return { user: data.user, redirectURL }
  }

  return { error: errorMessages('something_went_wrong') }
}

interface RefreshTokensResponse {
  error?: string
}

export async function refreshTokens(): Promise<RefreshTokensResponse> {
  const refreshToken = await getRefreshToken()
  if (!refreshToken) {
    return { error: errorMessages('token_not_found') }
  }

  const { data, error } = await apiRequest<{ accessToken: string; refreshToken: string }>({
    path: 'rpc/refresh_tokens',
    method: 'POST',
    data: {
      refreshToken,
    },
    authRequired: false,
  })

  if (error) {
    await removeSession()
    await removeRefreshToken()
    return { error }
  }

  if (data?.accessToken && data?.refreshToken) {
    await setSession(data.accessToken)
    await setRefreshToken(data.refreshToken)
    return {}
  }

  return { error: errorMessages('something_went_wrong') }
}

export async function logout() {
  return await removeSession()
}

interface ForgotPasswordProps {
  email: string
}

interface ForgotPasswordResponse {
  error?: string
}

export async function forgotPassword({
  email,
}: ForgotPasswordProps): Promise<ForgotPasswordResponse> {
  const orgName = getCurrentOrgName()

  const { error } = await apiRequest<{}>({
    path: 'rpc/forgot_password',
    method: 'POST',
    data: {
      email,
      orgName,
    },
  })

  return { error }
}

interface ResetPasswordProps {
  resetPasswordToken: string
  newPassword: string
}

interface ResetPasswordResponse {
  error?: string
}

export async function resetPassword({
  resetPasswordToken,
  newPassword,
}: ResetPasswordProps): Promise<ResetPasswordResponse> {
  const orgName = getCurrentOrgName()

  const { error } = await apiRequest<{}>({
    path: 'rpc/set_new_password',
    method: 'POST',
    data: {
      orgName,
      resetPasswordToken,
      newPassword,
    },
  })

  return { error }
}

// TODO: Update reset password logic
// interface ResetPasswordInputDTO {
//   resetPasswordToken: string
//   password: string
// }

// interface ResetPasswordOutputDTO {
//   success?: string
//   error?: string
//   data?: Record<string, any>
// }

// export async function resetPassword({
//   resetPasswordToken,
//   password,
// }: ResetPasswordInputDTO): Promise<ResetPasswordOutputDTO> {
//   const orgName = await getCurrentOrgName()

//   const body = {
//     resetPasswordToken,
//     newPassword: password,
//   }
//   const bodySnakeCase = keysCamelCaseToSnakeCase(body)

//   try {
//     const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/reset-password`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(bodySnakeCase),
//     })

//     const data = await response.json()
//     const camelCaseData = keysSnakeCaseToCamelCase(data)

//     if (camelCaseData.status === 'error') {
//       return { error: camelCaseData.error }
//     } else {
//       return { success: camelCaseData.data.message, data: { redirectLink: '/login' } }
//     }
//   } catch (error) {
//     return { error: 'Something went wrong!' }
//   }
// }
