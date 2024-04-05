'use server'

import { prisma } from '@/prisma/prisma'
import { CreateClientSchema, UpdateClientSchema } from '../zod/schemas'
import { fetchCurrentOrgId } from '../utils/server'
import { revalidatePath } from 'next/cache'

export async function createClient(prevState: any, formData: FormData) {
  const validatedFields = CreateClientSchema.safeParse({
    clientFirstName: formData.get('clientFirstName'),
    clientLastName: formData.get('clientLastName'),
    clientEmail: formData.get('clientEmail'),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const { clientFirstName, clientLastName, clientEmail } = validatedFields.data
  const currentOrgId = await fetchCurrentOrgId()

  if (!currentOrgId) {
    return { error: 'Organization not found!' }
  }

  await prisma.user.create({
    data: {
      organizationId: currentOrgId,
      name: clientFirstName + ' ' + clientLastName,
      email: clientEmail,
    },
  })

  revalidatePath('/admin/clients')
  return { success: 'Client created!' }
}

export async function updateClientById(clientId: string, prevState: any, formData: FormData) {
  const validatedFields = UpdateClientSchema.safeParse({
    clientFirstName: formData.get('clientFirstName'),
    clientLastName: formData.get('clientLastName'),
    clientEmail: formData.get('clientEmail'),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const { clientFirstName, clientLastName, clientEmail } = validatedFields.data

  await prisma.user.update({
    where: {
      id: clientId,
    },
    data: {
      name: clientFirstName + ' ' + clientLastName,
      email: clientEmail,
    },
  })

  revalidatePath(`/admin/clients/${clientId}`)
  return { success: 'Client updated!' }
}
