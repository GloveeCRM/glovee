'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/prisma/prisma'
import { getAuthenticatedUser } from '@/auth'
import { TemplateSchema } from '../zod/schemas'

export async function createTemplate(prevState: any, formDara: FormData) {
  const validatedFields = TemplateSchema.safeParse({
    title: formDara.get('title'),
    description: formDara.get('description'),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const { title, description } = validatedFields.data

  const user = await getAuthenticatedUser()

  if (!user) {
    return { error: 'User not found! logout and login again.' }
  }

  const template = await prisma.template.create({
    data: {
      userId: user.id!,
      title,
      description,
      categories: {
        create: [
          {
            title: 'Personal Information',
            position: 0,
            sections: {
              create: [
                {
                  title: 'Basic Information',
                  position: 0,
                  questionSets: {
                    create: [
                      {
                        type: 'flat',
                        position: 0,
                        questions: {
                          create: [
                            {
                              prompt: 'What is your full name?',
                              position: 0,
                              type: 'text-input',
                            },
                            {
                              prompt: 'What is your date of birth?',
                              position: 1,
                              type: 'text-input',
                            },
                          ],
                        },
                      },
                      {
                        type: 'loop',
                        position: 1,
                        questions: {
                          create: [
                            {
                              prompt:
                                'what is your address? (add any address you have lived in the past 10 years)',
                              position: 0,
                              type: 'text-input',
                            },
                            {
                              prompt: 'job position',
                              position: 1,
                              type: 'text-input',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Contact Information',
                  position: 1,
                  questionSets: {
                    create: [
                      {
                        type: 'flat',
                        position: 0,
                        questions: {
                          create: [
                            {
                              prompt: 'What is your email address?',
                              position: 0,
                              type: 'text-input',
                            },
                            {
                              prompt: 'What is your phone number?',
                              position: 1,
                              type: 'text-input',
                            },
                          ],
                        },
                      },
                      {
                        type: 'flat',
                        position: 1,
                        questions: {
                          create: [
                            {
                              prompt: 'What is your emergency contact?',
                              position: 0,
                              type: 'text-input',
                            },
                            {
                              prompt: 'What is your emergency contact phone number?',
                              position: 1,
                              type: 'text-input',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Family Information',
            position: 1,
            sections: {
              create: [
                {
                  title: 'Family Members',
                  position: 1,
                  questionSets: {
                    create: [
                      {
                        type: 'loop',
                        position: 1,
                        questions: {
                          create: [
                            {
                              prompt: 'What is your family member name?',
                              position: 0,
                              type: 'text-input',
                            },
                            {
                              prompt: 'What is your family member date of birth?',
                              position: 1,
                              type: 'text-input',
                            },
                            {
                              prompt: 'What is your family member occupation?',
                              position: 2,
                              type: 'text-input',
                            },
                          ],
                        },
                      },
                      {
                        type: 'loop',
                        position: 2,
                        questions: {
                          create: [
                            {
                              prompt: 'father side family members name',
                              position: 1,
                              type: 'text-input',
                            },
                            {
                              prompt: 'mother side family members name',
                              position: 2,
                              type: 'text-input',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Family Health History',
                  position: 2,
                  questionSets: {
                    create: [
                      {
                        type: 'flat',
                        position: 1,
                        questions: {
                          create: [
                            {
                              prompt: 'What is your family member health history?',
                              position: 1,
                              type: 'text-input',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  })

  revalidatePath('/admin/templates')
  return { success: 'Template created!', data: template }
}

/**
 * Delete template by id
 */
export async function deleteTemplateById(templateId: string) {
  try {
    await prisma.template.delete({
      where: {
        id: templateId,
      },
    })

    revalidatePath('/admin/templates')
  } catch (error) {
    return { error: 'Failed to delete template!' }
  }
  revalidatePath('/admin/templates')
}

/**
 * Update template title by id
 */
export async function updateTemplateTitleById(
  templateId: string,
  title: string
): Promise<{ success?: string; error?: string }> {
  try {
    await prisma.template.update({
      where: {
        id: templateId,
      },
      data: {
        title: title,
      },
    })

    revalidatePath(`/admin/template/${templateId}/edit`)
    return { success: 'Template title updated!' }
  } catch (error) {
    return { error: 'Failed to update template title!' }
  }
}

/**
 * Update template description by id
 */
export async function updateTemplateDescriptionById(
  templateId: string,
  description: string
): Promise<{ success?: string; error?: string }> {
  try {
    await prisma.template.update({
      where: {
        id: templateId,
      },
      data: {
        description: description,
      },
    })

    revalidatePath(`/admin/template/${templateId}/edit`)
    return { success: 'Template description updated!' }
  } catch (error) {
    return { error: 'Failed to update template description!' }
  }
}
