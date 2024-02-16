'use server'

import { prisma } from '@/prisma/prisma'
import { TemplateSchema } from '../zod/schemas'
import { currentUser } from '../utils/user'
import { revalidatePath } from 'next/cache'

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
      templateCategories: {
        create: [
          {
            title: 'Human Resources',
            position: 1,
            templateSections: {
              create: [
                {
                  title: 'Employee Onboarding',
                  position: 1,
                  templateQuestionSets: {
                    create: [
                      {
                        type: 'grouped',
                        position: 1,
                        templateQuestions: {
                          create: [
                            {
                              prompt: 'Describe your previous job experience.',
                              position: 1,
                              type: 'long-text',
                            },
                            {
                              prompt: 'What are your key strengths?',
                              position: 2,
                              type: 'text',
                            },
                          ],
                        },
                      },
                      {
                        type: 'flat',
                        position: 2,
                        templateQuestions: {
                          create: [
                            {
                              prompt: 'Have you worked in a team environment before?',
                              position: 1,
                              type: 'boolean',
                            },
                            {
                              prompt: 'Do you have any certifications relevant to your position?',
                              position: 2,
                              type: 'text',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Performance Reviews',
                  position: 2,
                  templateQuestionSets: {
                    create: [
                      {
                        type: 'grouped',
                        position: 1,
                        templateQuestions: {
                          create: [
                            {
                              prompt: 'Rate your overall performance this quarter.',
                              position: 1,
                              type: 'scale',
                            },
                            {
                              prompt: 'What challenges did you face?',
                              position: 2,
                              type: 'long-text',
                            },
                          ],
                        },
                      },
                      {
                        type: 'flat',
                        position: 2,
                        templateQuestions: {
                          create: [
                            {
                              prompt: 'List any achievements during this period.',
                              position: 1,
                              type: 'text',
                            },
                            {
                              prompt: 'How do you plan to address any challenges?',
                              position: 2,
                              type: 'long-text',
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
            title: 'Customer Feedback',
            position: 2,
            templateSections: {
              create: [
                {
                  title: 'Product Satisfaction',
                  position: 1,
                  templateQuestionSets: {
                    create: [
                      {
                        type: 'flat',
                        position: 1,
                        templateQuestions: {
                          create: [
                            {
                              prompt: 'How satisfied are you with our product?',
                              position: 1,
                              type: 'scale',
                            },
                            {
                              prompt: 'What features do you use the most?',
                              position: 2,
                              type: 'text',
                            },
                          ],
                        },
                      },
                      {
                        type: 'grouped',
                        position: 2,
                        templateQuestions: {
                          create: [
                            {
                              prompt: 'What improvements would you suggest?',
                              position: 1,
                              type: 'long-text',
                            },
                            {
                              prompt: 'Would you recommend our product to others?',
                              position: 2,
                              type: 'boolean',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Support Experience',
                  position: 2,
                  templateQuestionSets: {
                    create: [
                      {
                        type: 'flat',
                        position: 1,
                        templateQuestions: {
                          create: [
                            {
                              prompt: 'How would you rate our customer support?',
                              position: 1,
                              type: 'scale',
                            },
                            {
                              prompt: 'How can we improve our support services?',
                              position: 2,
                              type: 'long-text',
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

export async function deleteTemplateById(id: string) {
  const user = await currentUser()

  if (!user) {
    return { error: 'User not found! logout and login again.' }
  }

  const template = await prisma.template.findUnique({
    where: {
      id,
    },
  })

  if (template?.userId !== user.id) {
    return { error: 'You are not authorized to delete this template!' }
  }

  await prisma.template.delete({
    where: {
      id,
    },
  })

  revalidatePath('/admin/templates')
}
