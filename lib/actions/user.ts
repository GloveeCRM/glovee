'use server'

import { revalidatePath } from 'next/cache'

import { UserStatusTypes } from '@/lib/types/user'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { validateFormDataAgainstSchema } from '@/lib/utils/validation'
import { CreateClientSchema, UpdateClientSchema } from '@/lib/zod/schemas'
import { getSession } from '@/lib/auth/session'

export async function updateClientProfile(
  orgName: string,
  clientId: number,
  formData: FormData
): Promise<{ success?: string; error?: string; errors?: any }> {
  const { data, errors } = await validateFormDataAgainstSchema(UpdateClientSchema, formData)

  if (errors) {
    return { errors }
  }

  if (!clientId || clientId === 0) {
    return { errors: { clientId: 'Client is required' } }
  }

  const { clientFirstName, clientLastName, clientEmail } = data

  const accessToken = await getSession()

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/user/admin/client/${clientId}/profile`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          firstName: clientFirstName,
          lastName: clientLastName,
          email: clientEmail,
        }),
      }
    )

    const data = await response.json()

    if (data.status === 'error') {
      return { error: data.message }
    } else {
      revalidatePath(`/admin/clients/${clientId}`)
      return { success: 'Client updated!' }
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
      return { error: data.message }
    } else {
      revalidatePath(`/admin/clients/${id}`)
      return { success: 'Client status updated!' }
    }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

export async function createNewClient(
  formData: FormData,
  orgName: string
): Promise<{ success?: string; error?: string; errors?: any }> {
  const { data, errors } = await validateFormDataAgainstSchema(CreateClientSchema, formData)
  if (errors) {
    return { errors }
  }

  const { clientFirstName, clientLastName, clientEmail } = data

  const accessToken = await getSession()

  try {
    const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/user/admin/client/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        firstName: clientFirstName,
        lastName: clientLastName,
        email: clientEmail,
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
