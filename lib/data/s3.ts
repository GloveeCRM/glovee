'use server'

import { getSessionUserID } from '../auth/session'
import { S3_PRESIGNER_SERVICE_URL } from '../constants/api'
import { httpRequest } from '../utils/http'

interface FetchPresignedURLRequest {
  fileID: number
  operation: 'GET' | 'PUT' | 'DELETE'
  expiresIn: number
}

interface FetchPresignedURLResponse {
  url?: string
  error?: string
}

/**
 * Fetch a presigned URL for S3 operations
 * @description Calls the S3 presigner service to get a presigned URL for the given file ID and operation
 */
export async function fetchPresignedURL({
  fileID,
  operation,
  expiresIn,
}: FetchPresignedURLRequest): Promise<FetchPresignedURLResponse> {
  const currentUserID = await getSessionUserID()

  const res = await httpRequest<FetchPresignedURLResponse>({
    path: 'presign',
    baseURL: S3_PRESIGNER_SERVICE_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      fileID,
      userID: currentUserID,
      operation,
      expiresIn,
    },
  })

  if (res.error) {
    return {
      error: res.error,
    }
  }

  return {
    url: res.data?.url,
  }
}
