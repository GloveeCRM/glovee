'use server'

import { ApplicationType, ApplicationUpdateType } from '@/lib/types/application'
import { FileType } from '@/lib/types/file'
import { httpRequest, extractTotalCountFromHeaders } from '@/lib/utils/http'
import { fetchPresignedURL } from './s3'

interface SearchApplicationsFilters {
  applicationID?: number
  userID?: number
}

interface SearchApplicationsProps {
  filters?: SearchApplicationsFilters
  searchQuery?: string
  limit?: number
  offset?: number
}

interface SearchApplicationsResponse {
  error?: string
  applications?: ApplicationType[] | null
  totalCount: number
}

export async function searchApplications({
  filters,
  searchQuery,
  limit,
  offset,
}: SearchApplicationsProps): Promise<SearchApplicationsResponse> {
  const queryParams = new URLSearchParams()
  if (filters?.applicationID) {
    queryParams.append('application_id', `eq.${filters?.applicationID}`)
  }
  if (filters?.userID) {
    queryParams.append('user_id', `eq.${filters?.userID}`)
  }

  if (searchQuery) {
    const term = searchQuery.trim()
    const numericTerm = term.replace(/\D/g, '')

    const searchConditions = []

    // Search in owner->email and owner->full_name
    searchConditions.push(`owner->>email.ilike.*${term}*`)
    searchConditions.push(`owner->>full_name.ilike.*${term}*`)

    // Add application_id search if numeric
    if (numericTerm && !filters?.applicationID) {
      searchConditions.push(`application_id.eq.${numericTerm}`)
    }

    // Add user_id search if numeric
    if (numericTerm && !filters?.userID) {
      searchConditions.push(`user_id.eq.${numericTerm}`)
    }

    queryParams.append('or', `(${searchConditions.join(',')})`)
  }

  if (limit) {
    queryParams.append('limit', limit?.toString() || '')
  }
  if (offset) {
    queryParams.append('offset', offset?.toString() || '')
  }

  const { data, error, headers } = await httpRequest<ApplicationType[]>({
    path: `applications?${queryParams.toString()}`,
    method: 'GET',
    headers: {
      Prefer: 'count=exact',
    },
    authRequired: true,
  })

  const { totalCount } = extractTotalCountFromHeaders({ headers })

  if (error) {
    return { error, totalCount: totalCount || 0 }
  }

  const applications = data

  if (applications) {
    for (const application of applications) {
      if (application.owner.profilePictureFile?.fileID) {
        const { url } = await fetchPresignedURL({
          fileID: application.owner.profilePictureFile.fileID,
          operation: 'GET',
          expiresIn: 60 * 60 * 2, // 2 hours
        })
        application.owner.profilePictureFile.url = url
      }
    }
  }

  return { applications, totalCount: totalCount || 0 }
}

interface FetchApplicationFileUploadURLProps {
  applicationID: number
  fileName: string
  mimeType: string
}

interface FetchApplicationFileUploadURLResponse {
  url?: string
  objectKey?: string
  error?: string
}

export async function fetchApplicationFileUploadURL({
  applicationID,
  fileName,
  mimeType,
}: FetchApplicationFileUploadURLProps): Promise<FetchApplicationFileUploadURLResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('application_id', applicationID.toString())
  queryParams.append('file_name', fileName)
  queryParams.append('mime_type', mimeType)

  const { data, error } = await httpRequest<{ url: string; objectKey: string }>({
    path: `rpc/application_file_upload_url?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return { url: data?.url, objectKey: data?.objectKey, error }
}

interface FetchApplicationFilesByClientProps {
  applicationID: number
}

interface FetchApplicationFilesByClientResponse {
  files?: FileType[]
  error?: string
}

export async function fetchApplicationFilesByClient({
  applicationID,
}: FetchApplicationFilesByClientProps): Promise<FetchApplicationFilesByClientResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('application_id', applicationID.toString())

  const { data, error } = await httpRequest<{ applicationFiles: FileType[] }>({
    path: `rpc/application_files_by_client?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  const files = data?.applicationFiles

  if (files) {
    for (const file of files) {
      const { url } = await fetchPresignedURL({
        fileID: file.fileID,
        operation: 'GET',
        expiresIn: 60 * 60 * 2, // 2 hours
      })
      file.url = url
    }
  }

  return { files, error }
}

interface FetchApplicationFilesByAdminProps {
  applicationID: number
}

interface FetchApplicationFilesByAdminResponse {
  files?: FileType[]
  error?: string
}

export async function fetchApplicationFilesByAdmin({
  applicationID,
}: FetchApplicationFilesByAdminProps): Promise<FetchApplicationFilesByAdminResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('application_id', applicationID.toString())

  const { data, error } = await httpRequest<{ applicationFiles: FileType[] }>({
    path: `rpc/application_files_by_admin?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return { files: data?.applicationFiles, error }
}

interface FetchApplicationUpdatesProps {
  applicationID: number
}

interface FetchApplicationUpdatesResponse {
  updates?: ApplicationUpdateType[]
  error?: string
}

export async function fetchApplicationUpdates({
  applicationID,
}: FetchApplicationUpdatesProps): Promise<FetchApplicationUpdatesResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('application_id', applicationID.toString())

  const { data, error } = await httpRequest<{ applicationUpdates: ApplicationUpdateType[] }>({
    path: `rpc/application_updates?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  const applicationUpdates = data?.applicationUpdates

  if (applicationUpdates) {
    for (const update of applicationUpdates) {
      if (update.createdBy.profilePictureFile?.fileID) {
        const { url } = await fetchPresignedURL({
          fileID: update.createdBy.profilePictureFile.fileID,
          operation: 'GET',
          expiresIn: 60 * 60 * 2, // 2 hours
        })
        update.createdBy.profilePictureFile.url = url
      }

      if (update.files) {
        for (const file of update.files) {
          if (file.fileID) {
            const { url } = await fetchPresignedURL({
              fileID: file.fileID,
              operation: 'GET',
              expiresIn: 60 * 60 * 2, // 2 hours
            })
            file.url = url
          }
        }
      }
    }
  }

  return { updates: applicationUpdates, error }
}
