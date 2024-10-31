import { GLOVEE_API_URL } from '@/lib/constants/api'
import { keysCamelCaseToSnakeCase, keysSnakeCaseToCamelCase } from './json'
import { errorMessages } from '../constants/errors'
import { getSession } from '../auth/session'

interface ApiRequestProps {
  path: string
  method: string
  data: Record<string, any>
  authRequired?: boolean
}

interface ApiRequestResponse<T = any> {
  data?: T
  error?: string
}

export async function apiRequest<T = any>({
  path,
  method = 'GET',
  data = {},
  authRequired = false,
}: ApiRequestProps): Promise<ApiRequestResponse<T>> {
  const url = new URL(`${GLOVEE_API_URL}/${path}`)
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (authRequired) {
    const accessToken = await getSession()
    if (accessToken) {
      options.headers = {
        Authorization: `Bearer ${accessToken}`,
      }
    } else {
      return { error: errorMessages('token_not_found') }
    }
  }

  if (method === 'GET') {
    Object.entries(data).forEach(([k, v]) => url.searchParams.append(k, v))
  } else {
    options.body = JSON.stringify(keysCamelCaseToSnakeCase(data))
  }

  try {
    const response = await fetch(url, options)
    const responseData = await response.json()

    if (!response.ok) {
      throw responseData
    }

    return { data: keysSnakeCaseToCamelCase(responseData) }
  } catch (error: any) {
    return { error: errorMessages(error?.hint || 'something_went_wrong') }
  }
}
