'use server'

import { revalidatePath } from 'next/cache'

import { UserStatusTypes, UserType } from '@/lib/types/user'
import { getCurrentOrgName } from '@/lib/utils/server'
import { apiRequest } from '../utils/http'
import { errorMessages } from '../constants/errors'

interface CreateClientProps {
  firstName: string
  lastName: string
  email: string
}

interface CreateClientResponse {
  data?: {
    user: UserType
  }
  error?: string
}

export async function createClient({
  firstName,
  lastName,
  email,
}: CreateClientProps): Promise<CreateClientResponse> {
  const orgName = await getCurrentOrgName()

  const { data, error } = await apiRequest<{ user: UserType }>({
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

  if (error) {
    revalidatePath('/admin/clients')
    return { error: errorMessages(error) }
  } else {
    revalidatePath('/admin/clients')
    return { data }
  }
}

interface UpdateUserStatusProps {
  userID: number
  status: UserStatusTypes
}

interface UpdateUserStatusResponse {
  data?: {
    status: UserStatusTypes
  }
  error?: string
}

export async function updateUserStatus({
  userID,
  status,
}: UpdateUserStatusProps): Promise<UpdateUserStatusResponse> {
  const { data, error } = await apiRequest<{ status: UserStatusTypes }>({
    path: 'rpc/update_user_status',
    method: 'POST',
    data: { userID, status },
    authRequired: true,
  })

  if (error) {
    revalidatePath(`/admin/clients/${userID}`)
    return { error: errorMessages(error) }
  } else {
    revalidatePath(`/admin/clients/${userID}`)
    return { data }
  }
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
  const { data, error } = await apiRequest<{ user: UserType }>({
    path: 'rpc/update_user',
    method: 'POST',
    data: { userID, firstName, lastName, email, profilePictureFileID },
    authRequired: true,
  })

  revalidatePath(`/admin/clients/${userID}`)
  if (data?.user) {
    return { user: data.user }
  } else if (error) {
    return { error: errorMessages(error) }
  } else {
    return { error: errorMessages('something_went_wrong') }
  }
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
  data?: {
    url: string
  }
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
  const { data, error } = await apiRequest<{ url: string }>({
    path: 'rpc/create_user_profile_picture',
    method: 'POST',
    data: { userID, objectKey, fileName, mimeType, size, metadata },
    authRequired: true,
  })

  revalidatePath(`/admin/clients/${userID}`)
  return { data, error }
}
