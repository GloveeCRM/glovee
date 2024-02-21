'use server'

import { prisma } from '@/prisma/prisma'
import { currentUser } from '../utils/user'
import { fetchUserByEmailAndOrgName } from '../data/user'
import { ApplicationSchema } from '../zod/schemas'
import { revalidatePath } from 'next/cache'
import { fetchTemplateById } from '../data/template'
import { UserRole } from '@prisma/client'
import { headers } from 'next/headers'
import { extractSubdomainFromHostname } from '../utils/url'

export async function createApplication(formData: FormData) {
  const validatedFields = ApplicationSchema.safeParse({
    clientEmail: formData.get('clientEmail'),
    templateId: formData.get('templateId'),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const user = await currentUser()

  if (user?.role !== UserRole.ORG_ADMIN) {
    return { error: 'You are not authorized to create application!' }
  }

  const { clientEmail, templateId } = validatedFields.data

  const headerList = headers()
  const hostname = headerList.get('host')
  const subdomain = extractSubdomainFromHostname(hostname!) || ''

  const client = await fetchUserByEmailAndOrgName(clientEmail, subdomain)

  if (!client) {
    return { error: 'Client not found!' }
  }

  if (client.role !== UserRole.ORG_CLIENT) {
    return { error: 'Client is not a user!' }
  }

  const template = await fetchTemplateById(templateId)

  if (!template) {
    return { error: 'Template not found!' }
  }

  const application = await prisma.application.create({
    data: {
      clientId: client.id,
      userId: user.id!,
      status: 'CREATED',
      categories: {
        create: template.categories.map((category) => ({
          title: category.title,
          position: category.position,
          sections: {
            create: category.sections.map((section) => ({
              title: section.title,
              position: section.position,
              questionSets: {
                create: section.questionSets.map((questionSet) => ({
                  type: questionSet.type,
                  position: questionSet.position,
                  questions: {
                    create: questionSet.questions.map((question) => ({
                      type: question.type,
                      prompt: question.prompt,
                      position: question.position,
                      helperText: question.helperText,
                    })),
                  },
                })),
              },
            })),
          },
        })),
      },
    },
  })

  revalidatePath('/admin/applications')
  return { success: 'Template created!' }
}

export async function submitApplicationById(id: string) {
  const application = await prisma.application.update({
    where: {
      id: id,
    },
    data: {
      status: 'SUBMITTED',
    },
  })

  revalidatePath('/applications')
  return { success: 'Application submitted!' }
}
