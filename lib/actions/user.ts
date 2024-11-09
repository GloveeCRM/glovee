'use server'

import { revalidatePath } from 'next/cache'

import { UserStatusTypes, UserType } from '@/lib/types/user'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'
import { getCurrentOrgName } from '@/lib/utils/server'
import { keysCamelCaseToSnakeCase } from '@/lib/utils/json'
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

type CreateUserInputDTO = {
  newUser: Partial<UserType>
}

type CreateUserOutputDTO = {
  success?: string
  error?: string
  errors?: any
}

export async function createUser({ newUser }: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = await getCurrentOrgName()

  const body = {
    user: newUser,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bodySnakeCase),
    })

    const data = await response.json()
    const dataCamelCase = keysCamelCaseToSnakeCase(data)

    if (dataCamelCase.status === 'error') {
      return { error: dataCamelCase.error }
    } else {
      revalidatePath('/admin/clients')
      return { success: 'User created successfully!' }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}
