'use server'

import { S3_PRESIGNER_SERVICE_URL } from '../constants/api'
import { httpRequest } from '../utils/http'
import { getCurrentOrgName } from '../utils/server'

interface FetchPresignedGetURLProps {
  fileID: number
  expiresIn: number
}

interface FetchPresignedGetURLResponse {
  url?: string
  error?: string
}

/**
 * Fetch a presigned Download URL for a file
 * @description Calls the S3 presigner service to get a presigned URL for the given file ID
 */
export async function fetchPresignedGetURL({
  fileID,
  expiresIn,
}: FetchPresignedGetURLProps): Promise<FetchPresignedGetURLResponse> {
  const res = await httpRequest<FetchPresignedGetURLResponse>({
    path: 'presign/get',
    baseURL: S3_PRESIGNER_SERVICE_URL,
    method: 'POST',
    data: {
      fileID,
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

interface FetchPresignedDeleteURLProps {
  fileID: number
  expiresIn: number
}

interface FetchPresignedDeleteURLResponse {
  url?: string
  error?: string
}

/**
 * Fetch a presigned Delete URL for a file
 * @description Calls the S3 presigner service to get a presigned URL for the given file ID
 */
export async function fetchPresignedDeleteURL({
  fileID,
  expiresIn,
}: FetchPresignedDeleteURLProps): Promise<FetchPresignedDeleteURLResponse> {
  const res = await httpRequest<FetchPresignedDeleteURLResponse>({
    path: 'presign/delete',
    baseURL: S3_PRESIGNER_SERVICE_URL,
    method: 'POST',
    data: {
      fileID,
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

type PresignedPutURLPurpose =
  | 'profile_picture'
  | 'organization_logo'
  | 'form_answer_file'
  | 'application_file'

interface FetchPresignedPutURLProps {
  expiresIn: number
  fileName: string
  mimeType: string
  purpose: PresignedPutURLPurpose
  parentEntityID?: number
}

interface FetchPresignedPutURLResponse {
  url?: string
  objectKey?: string
  error?: string
}

/**
 * Fetch a presigned Upload URL for a file
 * @description Calls the S3 presigner service to get an upload URL for the given file name, mime type, and purpose
 */
export async function fetchPresignedPutURL({
  expiresIn,
  fileName,
  mimeType,
  purpose,
  parentEntityID,
}: FetchPresignedPutURLProps): Promise<FetchPresignedPutURLResponse> {
  const orgName = getCurrentOrgName()

  const res = await httpRequest<FetchPresignedPutURLResponse>({
    path: 'presign/put',
    baseURL: S3_PRESIGNER_SERVICE_URL,
    method: 'POST',
    data: {
      orgName,
      fileName,
      mimeType,
      expiresIn,
      purpose,
      parentEntityID,
    },
  })

  if (res.error) {
    return {
      error: res.error,
    }
  }

  return {
    url: res.data?.url,
    objectKey: res.data?.objectKey,
  }
}
