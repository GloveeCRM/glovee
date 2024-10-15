'use server'

import { revalidatePath } from 'next/cache'

import { UserType } from '@/lib/types/user'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'
import { getCurrentOrgName } from '@/lib/utils/server'
import { keysCamelCaseToSnakeCase } from '@/lib/utils/json'

type UpdateUserInputDTO = {
  userID: number
  updateFields: Partial<UserType>
}

type UpdateUserOutputDTO = {
  success?: string
  error?: string
  errors?: any
}

export async function updateUser({
  userID,
  updateFields,
}: UpdateUserInputDTO): Promise<UpdateUserOutputDTO> {
  if (userID === 0) {
    return { errors: { userID: 'UserID is required' } }
  }

  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID.toString())

  const body = {
    userID,
    updateFields,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/user/update?${queryParams.toString()}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodySnakeCase),
      }
    )

    const data = await response.json()
    const dataCamelCase = keysCamelCaseToSnakeCase(data)

    if (dataCamelCase.status === 'error') {
      return { error: dataCamelCase.error }
    } else {
      revalidatePath(`/admin/clients/${userID}`)
      return { success: 'Client updated!' }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
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
