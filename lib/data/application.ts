'use server'

import { ApplicationType, ApplicationUpdateType } from '../types/application'
import { FileType } from '../types/file'
import { apiRequest, extractTotalCountFromHeaders } from '../utils/http'

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

  const { data, error, headers } = await apiRequest<ApplicationType[]>({
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

  return { applications: data, totalCount: totalCount || 0 }
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

  const { data, error } = await apiRequest<{ url: string; objectKey: string }>({
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

  const { data, error } = await apiRequest<{ applicationFiles: FileType[] }>({
    path: `rpc/application_files_by_client?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return { files: data?.applicationFiles, error }
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

  const { data, error } = await apiRequest<{ applicationFiles: FileType[] }>({
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

  const { data, error } = await apiRequest<{ applicationUpdates: ApplicationUpdateType[] }>({
    path: `rpc/application_updates?${queryParams.toString()}`,
    method: 'GET',
    authRequired: true,
  })

  return { updates: data?.applicationUpdates, error }
}
