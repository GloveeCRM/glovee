'use server'

import { apiRequest } from '../utils/http'
import { ApplicationType } from '../types/application'
import { revalidatePath } from 'next/cache'

interface CreateApplicationProps {
  userID: number
}

interface CreateApplicationResponse {
  error?: string
  application?: ApplicationType
}

export async function createApplication({
  userID,
}: CreateApplicationProps): Promise<CreateApplicationResponse> {
  const { data, error } = await apiRequest<{ application: ApplicationType }>({
    path: 'rpc/create_application',
    method: 'POST',
    data: { userID },
    authRequired: true,
  })

  revalidatePath('/admin/applications')
  return { application: data?.application, error }
}
