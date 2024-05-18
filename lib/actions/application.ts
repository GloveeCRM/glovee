'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/prisma/prisma'
import { Template, TemplateQuestion, UserRole } from '@prisma/client'
import { getAuthenticatedUser } from '@/auth'
import { fetchUserById } from '../data/user'
import { ApplicationSchema } from '../zod/schemas'
import { fetchFullTemplateById } from '../data/template'
import { validateFormDataAgainstSchema } from '../utils/validation'
import { fetchOrganizationByOrgName } from '../data/organization'

// export async function createApplicationInOrganization(
//   orgName: string,
//   clientId: string,
//   formData: FormData
// ): Promise<{ success?: string; error?: string; errors?: any }> {
//   const { data, errors } = await validateFormDataAgainstSchema(ApplicationSchema, formData)
//   if (errors || clientId.length === 0) {
//     if (clientId.length === 0) {
//       const combinedErrors = { ...errors, clientId: 'Client is required' }
//       return { errors: combinedErrors }
//     }
//     return { errors }
//   }

//   const user = await getAuthenticatedUser()

//   if (!user || (user.role !== UserRole.ORG_ADMIN && user.role !== UserRole.ORG_OWNER)) {
//     return { error: 'You are not authorized to create application!' }
//   }

//   const org = await fetchOrganizationByOrgName(orgName)

//   if (!org) {
//     return { error: 'Organization not found!' }
//   }

//   const { role, applicantFirstName, applicantLastName, templateId } = data

//   const client = await fetchUserById(clientId)

//   if (!client) {
//     return { error: 'Client not found!' }
//   }

//   if (client.role !== UserRole.ORG_CLIENT) {
//     return { error: 'Client is not a user!' }
//   }

//   const template = await fetchFullTemplateById(templateId)

//   if (!template) {
//     return { error: 'Template not found!' }
//   }

//   await prisma.application.create({
//     data: {
//       clientId: client.id,
//       orgId: org.id,
//       templateName: template.title,
//       applicantFirstName: applicantFirstName,
//       applicantLastName: applicantLastName,
//       role: role,
//       status: 'CREATED',
//       categories: {
//         create: template.categories?.map((category) => ({
//           title: category.title,
//           position: category.position,
//           sections: {
//             create: category.sections?.map((section) => ({
//               title: section.title,
//               position: section.position,
//               questionSets: {
//                 create: section.questionSets?.map((questionSet) => ({
//                   type: questionSet.type,
//                   position: questionSet.position,
//                   questions: {
//                     create: questionSet.questions?.map((question) => ({
//                       type: question.type,
//                       prompt: question.prompt,
//                       position: question.position,
//                       helperText: question.helperText,
//                     })),
//                   },
//                 })),
//               },
//             })),
//           },
//         })),
//       },
//     },
//   })

//   revalidatePath('/admin/applications')
//   return { success: 'Application created!' }
// }

export async function createApplicationInOrganization(
  orgName: string,
  clientId: string,
  formData: FormData
): Promise<{ success?: string; error?: string; errors?: any }> {
  const { data, errors } = await validateFormDataAgainstSchema(ApplicationSchema, formData)
  if (errors || clientId.length === 0) {
    if (clientId.length === 0) {
      const combinedErrors = { ...errors, clientId: 'Client is required' }
      return { errors: combinedErrors }
    }
    return { errors }
  }

  const user = await getAuthenticatedUser()

  if (!user || (user.role !== UserRole.ORG_ADMIN && user.role !== UserRole.ORG_OWNER)) {
    return { error: 'You are not authorized to create application!' }
  }

  const org = await fetchOrganizationByOrgName(orgName)

  if (!org) {
    return { error: 'Organization not found!' }
  }

  const { role, applicantFirstName, applicantLastName, templateId } = data

  const client = await fetchUserById(clientId)

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
      orgId: org.id,
      templateName: template.title,
      applicantFirstName: applicantFirstName,
      applicantLastName: applicantLastName,
      role: role,
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
                create: createQuestionSetsRecursively(section.questionSets || []),
              },
            })),
          },
        })),
      },
    },
  })

  revalidatePath('/admin/applications')
  return { success: 'Application created!' }
}

function createQuestionSetsRecursively(templateQuestionSets: any[]): any[] {
  return templateQuestionSets?.map((templateQuestionSet) => ({
    type: templateQuestionSet.type,
    position: templateQuestionSet.position,
    questions: {
      create: templateQuestionSet.questions.map((question: any) => ({
        type: question.type,
        prompt: question.prompt,
        position: question.position,
        helperText: question.helperText,
      })),
    },
    questionSets: {
      create: createQuestionSetsRecursively(templateQuestionSet.questionSets),
    },
  }))
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
