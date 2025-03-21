'use server'

import { ApplicationType, ApplicationUpdateType } from '@/lib/types/application'
import { FileType } from '@/lib/types/file'
import { httpRequest, extractTotalCountFromHeaders } from '@/lib/utils/http'
import { fetchPresignedGetURL } from './s3'

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
    await Promise.all(
      applications.map(async (application) => {
        if (application.owner.profilePictureFile?.fileID) {
          const { url } = await fetchPresignedGetURL({
            fileID: application.owner.profilePictureFile.fileID,
            expiresIn: 60 * 60 * 2, // 2 hours
          })
          const profilePictureFile = application.owner.profilePictureFile as { url?: string }
          profilePictureFile.url = url
        }
      })
    )
  }

  return { applications, totalCount: totalCount || 0 }
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
      const { url } = await fetchPresignedGetURL({
        fileID: file.fileID,
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

  const files = data?.applicationFiles

  if (files) {
    for (const file of files) {
      const { url } = await fetchPresignedGetURL({
        fileID: file.fileID,
        expiresIn: 60 * 60 * 2, // 2 hours
      })
      file.url = url
    }
  }

  return { files, error }
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
    // Flatten all promises into a single array
    const allFilePromises: Promise<void>[] = []

    // Process all updates in one loop
    for (const update of applicationUpdates) {
      // Handle profile picture
      if (update.createdBy.profilePictureFile?.fileID) {
        allFilePromises.push(
          fetchPresignedGetURL({
            fileID: update.createdBy.profilePictureFile.fileID,
            expiresIn: 60 * 60 * 2, // 2 hours
          }).then(({ url }) => {
            const profilePictureFile = update.createdBy.profilePictureFile as { url?: string }
            profilePictureFile.url = url
          })
        )
      }

      // Handle update files
      if (update.files?.length) {
        update.files.forEach((file) => {
          if (file.fileID) {
            allFilePromises.push(
              fetchPresignedGetURL({
                fileID: file.fileID,
                expiresIn: 60 * 60 * 2, // 2 hours
              }).then(({ url }) => {
                file.url = url
              })
            )
          }
        })
      }
    }

    // Wait for all promises to complete
    if (allFilePromises.length > 0) {
      await Promise.all(allFilePromises)
    }
  }

  return { updates: applicationUpdates, error }
}
