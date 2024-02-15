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
      categories: {
        create: [
          {
            title: 'Category 1',
            position: 1,
            sections: {
              create: [
                {
                  title: 'Section 1',
                  position: 1,
                  questionSets: {
                    create: [
                      {
                        type: 'flat',
                        position: 1,
                        questions: {
                          create: [
                            {
                              prompt: 'Question 1',
                              position: 1,
                              type: 'text',
                            },
                            {
                              prompt: 'Question 2',
                              position: 2,
                              type: 'text',
                            },
                          ],
                        },
                      },
                      {
                        type: 'flat',
                        position: 2,
                        questions: {
                          create: [
                            {
                              prompt: 'Question 1',
                              position: 1,
                              type: 'text',
                            },
                            {
                              prompt: 'Question 2',
                              position: 2,
                              type: 'text',
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
            title: 'Category 2',
            position: 2,
            sections: {
              create: [
                {
                  title: 'Section 1',
                  position: 1,
                  questionSets: {
                    create: [
                      {
                        type: 'flat',
                        position: 1,
                        questions: {
                          create: [
                            {
                              prompt: 'Question 1',
                              position: 1,
                              type: 'text',
                            },
                            {
                              prompt: 'Question 2',
                              position: 2,
                              type: 'text',
                            },
                          ],
                        },
                      },
                      {
                        type: 'flat',
                        position: 2,
                        questions: {
                          create: [
                            {
                              prompt: 'Question 1',
                              position: 1,
                              type: 'text',
                            },
                            {
                              prompt: 'Question 2',
                              position: 2,
                              type: 'text',
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
