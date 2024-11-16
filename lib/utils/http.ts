import { GLOVEE_API_URL } from '@/lib/constants/api'
import { keysCamelCaseToSnakeCase, keysSnakeCaseToCamelCase } from './json'
import { errorMessages } from '../constants/errors'
import { getSession } from '../auth/session'

interface ApiRequestProps {
  path: string
  method?: string
  data?: Record<string, any>
  authRequired?: boolean
  headers?: Record<string, string>
}

interface ApiRequestResponse<T = any> {
  data?: T
  error?: string
  headers?: Headers
}

// TODO: Add error translation at this level
export async function apiRequest<T = any>({
  path,
  method = 'GET',
  data = {},
  authRequired = false,
  headers = {},
}: ApiRequestProps): Promise<ApiRequestResponse<T>> {
  const url = new URL(`${GLOVEE_API_URL}/${path}`)
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (authRequired) {
    const accessToken = await getSession()
    if (accessToken) {
      options.headers = {
        ...options.headers,
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

    return { data: keysSnakeCaseToCamelCase(responseData), headers: response.headers }
  } catch (error: any) {
    console.error(error)
    return { error: errorMessages(error.hint || error.message || 'something_went_wrong') }
  }
}

interface ExtractTotalCountFromHeadersProps {
  headers: Headers | undefined
}

interface ExtractTotalCountFromHeadersResponse {
  totalCount: number | undefined
}

export function extractTotalCountFromHeaders({
  headers,
}: ExtractTotalCountFromHeadersProps): ExtractTotalCountFromHeadersResponse {
  if (!headers) {
    return { totalCount: undefined }
  }

  const contentRange = headers.get('Content-Range')
  if (!contentRange) {
    return { totalCount: undefined }
  }

  const totalCount = contentRange.split('/')[1]
  return { totalCount: parseInt(totalCount) }
}
