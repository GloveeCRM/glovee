'use server'

import { prisma } from '@/prisma/prisma'
import { CreateClientSchema, UpdateClientSchema } from '../zod/schemas'
import { revalidatePath } from 'next/cache'
import { validateFormDataAgainstSchema } from '../utils/validation'
import { fetchUserByEmailAndOrgName } from '../data/user'
import { UserRole } from '@prisma/client'
import { GLOVEE_API_URL } from '../constants/api'
import { getCurrentOrgName } from '../utils/server'
import { getSession } from '../auth/session'
import { UserStatusEnum } from '../types/user'

export async function createClientInOrg(
  formData: FormData,
  orgName: string
): Promise<{ success?: string; error?: string; errors?: any }> {
  const { data, errors } = await validateFormDataAgainstSchema(CreateClientSchema, formData)
  if (errors) {
    return { errors }
  }

  const { clientFirstName, clientLastName, clientEmail } = data

  const client = await fetchUserByEmailAndOrgName(clientEmail, orgName)

  if (client) {
    return { error: 'Client already exists!' }
  }

  await prisma.user.create({
    data: {
      email: clientEmail,
      name: clientFirstName + ' ' + clientLastName,
      role: UserRole.ORG_CLIENT,
      organization: {
        connect: {
          orgName: orgName,
        },
      },
    },
  })

  revalidatePath('/admin/clients')
  return { success: 'Client created!' }
}

// export async function updateClientById(
//   clientId: number,
//   formData: FormData
// ): Promise<{ success?: string; error?: string; errors?: any }> {
//   const { data, errors } = await validateFormDataAgainstSchema(UpdateClientSchema, formData)

//   if (errors) {
//     return { errors }
//   }

//   if (!clientId || clientId === 0) {
//     return { errors: { clientId: 'Client is required' } }
//   }

//   const { clientFirstName, clientLastName, clientEmail } = data

//   await prisma.user.update({
//     where: {
//       id: clientId,
//     },
//     data: {
//       name: clientFirstName + ' ' + clientLastName,
//       email: clientEmail,
//     },
//   })

//   revalidatePath(`/admin/clients/${clientId}`)
//   return { success: 'Client updated!' }
// }

export async function updateClientProfile(
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

  const orgName = await getCurrentOrgName()

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
  id: string,
  status: UserStatusEnum
): Promise<{ success?: string; error?: string }> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = await getCurrentOrgName()
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
