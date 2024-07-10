'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { UserStatusTypes } from '@/lib/types/user'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { CreateClientSchema, UpdateClientSchema } from '@/lib/zod/schemas'
import { getSession } from '@/lib/auth/session'

export async function updateClientProfile(
  orgName: string,
  clientID: number,
  values: z.infer<typeof UpdateClientSchema>
): Promise<{ success?: string; error?: string; errors?: any }> {
  if (clientID === 0) {
    return { errors: { clientId: 'Client is required' } }
  }

  const { firstName, lastName, email } = values

  const accessToken = await getSession()

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/user/admin/client/${clientID}/profile`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
        }),
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.error }
    } else {
      revalidatePath(`/admin/clients/${clientID}`)
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
