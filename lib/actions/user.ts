'use server'

import { prisma } from '@/prisma/prisma'
import { CreateClientSchema } from '../zod/schemas'
import { getCurrentOrgName } from '../utils/server'
import { revalidatePath } from 'next/cache'

export async function createClient(formData: FormData) {
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

export async function fetchCurrentOrgId() {
  const orgName = getCurrentOrgName()
  const org = await prisma.organization.findUnique({
    where: {
      orgName: orgName!,
    },
  })

  return org?.id
}
