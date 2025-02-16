'use server'

import { revalidatePath } from 'next/cache'

import { UserStatusTypes, UserType } from '@/lib/types/user'
import { getCurrentOrgName } from '@/lib/utils/server'
import { httpRequest } from '@/lib/utils/http'

interface CreateClientProps {
  firstName: string
  lastName: string
  email: string
}

interface CreateClientResponse {
  user?: UserType
  error?: string
}

export async function createClient({
  firstName,
  lastName,
  email,
}: CreateClientProps): Promise<CreateClientResponse> {
  const orgName = getCurrentOrgName()

  const { data, error } = await httpRequest<{ user: UserType }>({
    path: 'rpc/create_client',
    method: 'POST',
    data: {
      email,
      firstName,
      lastName,
      orgName,
    },
    authRequired: true,
  })

  revalidatePath('/admin/clients')
  return { user: data?.user, error }
}

interface UpdateUserStatusProps {
  userID: number
  status: UserStatusTypes
}

interface UpdateUserStatusResponse {
  status?: UserStatusTypes
  error?: string
}

export async function updateUserStatus({
  userID,
  status,
}: UpdateUserStatusProps): Promise<UpdateUserStatusResponse> {
  const { data, error } = await httpRequest<{ status: UserStatusTypes }>({
    path: 'rpc/update_user_status',
    method: 'POST',
    data: { userID, status },
    authRequired: true,
  })

  revalidatePath(`/admin/clients/${userID}`)
  return { status: data?.status, error }
}

interface UpdateUserProfileProps {
  userID: number
  firstName?: string
  lastName?: string
  email?: string
  profilePictureFileID?: number
}

interface UpdateUserProfileResponse {
  user?: UserType
  error?: string
}

export async function updateUserProfile({
  userID,
  firstName,
  lastName,
  email,
  profilePictureFileID,
}: UpdateUserProfileProps): Promise<UpdateUserProfileResponse> {
  const { data, error } = await httpRequest<{ user: UserType }>({
    path: 'rpc/update_user',
    method: 'POST',
    data: { userID, firstName, lastName, email, profilePictureFileID },
    authRequired: true,
  })

  revalidatePath(`/admin/clients/${userID}`)
  return { user: data?.user, error }
}

interface UpdateUserProfilePictureProps {
  userID: number
  objectKey: string
  fileName: string
  mimeType: string
  size: number
  metadata?: Record<string, string>
}

interface UpdateUserProfilePictureResponse {
  url?: string
  error?: string
}

export async function updateUserProfilePicture({
  userID,
  objectKey,
  fileName,
  mimeType,
  size,
  metadata,
}: UpdateUserProfilePictureProps): Promise<UpdateUserProfilePictureResponse> {
  const { data, error } = await httpRequest<{ url: string }>({
    path: 'rpc/create_user_profile_picture',
    method: 'POST',
    data: { userID, objectKey, fileName, mimeType, size, metadata },
    authRequired: true,
  })

  revalidatePath(`/admin/clients/${userID}`)
  return { url: data?.url, error }
}
