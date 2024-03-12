'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/prisma/prisma'
import { UserRole } from '@prisma/client'
import { getAuthenticatedUser } from '@/auth'
import { fetchUserByEmailAndOrgName } from '../data/user'
import { ApplicationSchema } from '../zod/schemas'
import { fetchFullTemplateById } from '../data/template'
import { fetchCurrentOrgId, getCurrentOrgName } from '../utils/server'
import { validateFormDataAgainstSchema } from '../utils/validation'

export async function createApplication(
  formData: FormData
): Promise<{ success?: string; error?: string; errors?: any }> {
  const { data, errors } = await validateFormDataAgainstSchema(ApplicationSchema, formData)

  if (errors) {
    return { errors }
  }

  const user = await getAuthenticatedUser()

  if (!user || (user.role !== UserRole.ORG_ADMIN && user.role !== UserRole.ORG_OWNER)) {
    return { error: 'You are not authorized to create application!' }
  }

  const orgName = getCurrentOrgName()
  const orgId = await fetchCurrentOrgId()

  if (!orgName || !orgId) {
    return { error: 'Organization not found!' }
  }

  const { clientEmail, templateId } = data

  const client = await fetchUserByEmailAndOrgName(clientEmail, orgName)

  if (!client) {
    return { error: 'Client not found!' }
  }

  if (client.role !== UserRole.ORG_CLIENT) {
    return { error: 'Client is not a user!' }
  }

  const template = await fetchFullTemplateById(templateId)

  if (!template) {
    return { error: 'Template not found!' }
  }

  const application = await prisma.application.create({
    data: {
      clientId: client.id,
      orgId: orgId,
      templateName: template.title,
      status: 'CREATED',
      categories: {
        create: template.categories?.map((category) => ({
          title: category.title,
          position: category.position,
          sections: {
            create: category.sections?.map((section) => ({
              title: section.title,
              position: section.position,
              questionSets: {
                create: section.questionSets?.map((questionSet) => ({
                  type: questionSet.type,
                  position: questionSet.position,
                  questions: {
                    create: questionSet.questions?.map((question) => ({
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

/**
 * Set application status to submitted
 */
export async function submitApplicationById(
  applicationId: string
): Promise<{ success?: string; error?: string }> {
  try {
    await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        status: 'SUBMITTED',
      },
    })

    revalidatePath('/applications')
    return { success: 'Application submitted!' }
  } catch (error) {
    return { error: 'Failed to submit application!' }
  }
}
