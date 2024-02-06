'use server'

import { prisma } from '@/prisma/prisma'
import { TemplateSchema } from '../zod/schemas'
import { currentUser } from '../auth/user'

export async function createTemplate(prevState: any, formDara: FormData) {
  const validatedFields = TemplateSchema.safeParse({
    title: formDara.get('title'),
    description: formDara.get('description'),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const { title, description } = validatedFields.data

  const user = await currentUser()

  if (!user) {
    return { error: 'User not found! logout and login again.' }
  }

  const template = await prisma.template.create({
    data: {
      userId: user.id!,
      title,
      description,
    },
  })

  return { success: 'Template created!', data: template }
}
