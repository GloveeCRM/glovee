'use server'

import { prisma } from '@/prisma/prisma'
import { CreateClientSchema, UpdateClientSchema } from '../zod/schemas'
import { revalidatePath } from 'next/cache'
import { validateFormDataAgainstSchema } from '../utils/validation'
import { fetchUserByEmailAndOrgName } from '../data/user'
import { UserRole } from '@prisma/client'

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
