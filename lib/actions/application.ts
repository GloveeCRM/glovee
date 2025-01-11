'use server'

import { apiRequest } from '../utils/http'
import { ApplicationType } from '../types/application'
import { revalidatePath } from 'next/cache'

interface CreateApplicationProps {
  userID: number
  applicationName: string
}

interface CreateApplicationResponse {
  error?: string
  application?: ApplicationType
}

export async function createApplication({
  userID,
  applicationName,
}: CreateApplicationProps): Promise<CreateApplicationResponse> {
  const { data, error } = await apiRequest<{ application: ApplicationType }>({
    path: 'rpc/create_application',
    method: 'POST',
    data: { userID, applicationName },
    authRequired: true,
  })

  revalidatePath('/admin/applications')
  return { application: data?.application, error }
}

interface CreateApplicationFileProps {
  applicationID: number
  objectKey: string
  fileName: string
  mimeType: string
  size: number
  metadata?: Record<string, string>
}

interface CreateApplicationFileResponse {
  error?: string
}

export async function createApplicationFile({
  applicationID,
  objectKey,
  fileName,
  mimeType,
  size,
  metadata,
}: CreateApplicationFileProps): Promise<CreateApplicationFileResponse> {
  // TODO: Update this to return the application file object
  const { error } = await apiRequest<{ applicationFile: any }>({
    path: 'rpc/create_application_file',
    method: 'POST',
    data: { applicationID, objectKey, fileName, mimeType, size, metadata },
    authRequired: true,
  })

  revalidatePath(`/admin/application/${applicationID}`)
  return { error }
}
