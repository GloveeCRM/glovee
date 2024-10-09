'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { UserStatusTypes, UserType } from '@/lib/types/user'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { CreateClientSchema } from '@/lib/zod/schemas'
import { getSession } from '@/lib/auth/session'
import { getCurrentOrgName } from '../utils/server'
import { keysCamelCaseToSnakeCase } from '../utils/json'

export async function updateUser(
  userID: number,
  updateFields: Partial<UserType>
): Promise<{ success?: string; error?: string; errors?: any }> {
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

export async function updateClientProfilePicture(
  orgName: string,
  clientID: number,
  avatarURL: string
): Promise<{ success?: string; error?: string }> {
  const accessToken = await getSession()

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/user/admin/client/${clientID}/profile-picture`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          url: avatarURL,
        }),
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      revalidatePath(`/admin/clients/${clientID}`)
      return { success: 'Profile picture updated!' }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

export async function updateClientStatus(
  orgName: string,
  id: number,
  status: UserStatusTypes
): Promise<{ success?: string; error?: string }> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/admin/client/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status }),
    })

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      revalidatePath(`/admin/clients/${id}`)
      return { success: data.data.message }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

export async function createNewClient(
  orgName: string,
  values: z.infer<typeof CreateClientSchema>
): Promise<{ success?: string; error?: string }> {
  const { firstName, lastName, email } = values

  const accessToken = await getSession()

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/admin/client/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    })

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      revalidatePath('/admin/clients')
      return { success: 'Client created!' }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}
