'use server'

import { prisma } from '@/prisma/prisma'
import { currentUser } from '../utils/user'
import { fetchUserByEmail } from '../data/user'
import { ApplicationSchema } from '../zod/schemas'
import { revalidatePath } from 'next/cache'
import { fetchTemplateById } from '../data/template'

export async function createApplication(formData: FormData) {
  const validatedFields = ApplicationSchema.safeParse({
    clientEmail: formData.get('clientEmail'),
    templateId: formData.get('templateId'),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const user = await currentUser()

  if (user?.role !== 'ADMIN') {
    return { error: 'You are not authorized to create application!' }
  }

  const { clientEmail, templateId } = validatedFields.data

  const client = await fetchUserByEmail(clientEmail)

  if (!client) {
    return { error: 'Client not found!' }
  }

  if (client.role !== 'USER') {
    return { error: 'Client is not a user!' }
  }

  const template = await fetchTemplateById(templateId)

  if (!template) {
    return { error: 'Template not found!' }
  }

  await prisma.application.create({
    data: {
      clientId: client.id!, // ! to check if it's null or not
      userId: user.id!, // ! to check if it's null or not
      status: 'CREATED',
      body: template.body!,
    },
  })

  revalidatePath('/admin/applications')
  return { success: 'Template created!' }
}
