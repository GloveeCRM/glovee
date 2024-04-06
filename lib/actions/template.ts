'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/prisma/prisma'
import { getAuthenticatedUser } from '@/auth'
import { TemplateSchema } from '../zod/schemas'
import { TemplateType } from '../types/template'
import { fetchFullTemplateById } from '../data/template'
import { TemplateQuestionSetType, TemplateQuestionType } from '@prisma/client'

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
                        type: TemplateQuestionSetType.FLAT,
                        position: 0,
                        questions: {
                          create: [
                            {
                              prompt: 'What is your full name?',
                              position: 0,
                              type: TemplateQuestionType.TEXT_INPUT,
                            },
                            {
                              prompt: 'What is your date of birth?',
                              position: 1,
                              type: TemplateQuestionType.TEXT_INPUT,
                            },
                          ],
                        },
                      },
                      {
                        type: TemplateQuestionSetType.LOOP,
                        position: 1,
                        questions: {
                          create: [
                            {
                              prompt:
                                'what is your address? (add any address you have lived in the past 10 years)',
                              position: 0,
                              type: TemplateQuestionType.TEXT_INPUT,
                            },
                            {
                              prompt: 'job position',
                              position: 1,
                              type: TemplateQuestionType.TEXT_INPUT,
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
                        type: TemplateQuestionSetType.FLAT,
                        position: 0,
                        questions: {
                          create: [
                            {
                              prompt: 'What is your email address?',
                              position: 0,
                              type: TemplateQuestionType.TEXT_INPUT,
                            },
                            {
                              prompt: 'What is your phone number?',
                              position: 1,
                              type: TemplateQuestionType.TEXT_INPUT,
                            },
                          ],
                        },
                      },
                      {
                        type: TemplateQuestionSetType.FLAT,
                        position: 1,
                        questions: {
                          create: [
                            {
                              prompt: 'What is your emergency contact?',
                              position: 0,
                              type: TemplateQuestionType.TEXT_INPUT,
                            },
                            {
                              prompt: 'What is your emergency contact phone number?',
                              position: 1,
                              type: TemplateQuestionType.TEXT_INPUT,
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
                        type: TemplateQuestionSetType.LOOP,
                        position: 1,
                        questions: {
                          create: [
                            {
                              prompt: 'What is your family member name?',
                              position: 0,
                              type: TemplateQuestionType.TEXT_INPUT,
                            },
                            {
                              prompt: 'What is your family member date of birth?',
                              position: 1,
                              type: TemplateQuestionType.TEXT_INPUT,
                            },
                            {
                              prompt: 'What is your family member occupation?',
                              position: 2,
                              type: TemplateQuestionType.TEXT_INPUT,
                            },
                          ],
                        },
                      },
                      {
                        type: TemplateQuestionSetType.FLAT,
                        position: 2,
                        questions: {
                          create: [
                            {
                              prompt: 'father side family members name',
                              position: 1,
                              type: TemplateQuestionType.TEXT_INPUT,
                            },
                            {
                              prompt: 'mother side family members name',
                              position: 2,
                              type: TemplateQuestionType.TEXT_INPUT,
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
                        type: TemplateQuestionSetType.FLAT,
                        position: 1,
                        questions: {
                          create: [
                            {
                              prompt: 'What is your family member health history?',
                              position: 1,
                              type: TemplateQuestionType.TEXT_INPUT,
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

/**
 * Update full template by id
 */
export async function updateFullTemplateById(
  templateId: string,
  template: TemplateType
): Promise<{ success?: string; error?: string }> {
  try {
    const currentTemplateInDB = await fetchFullTemplateById(templateId)

    const categoriesInDB = currentTemplateInDB?.categories ?? []
    const templateCategories = template.categories ?? []

    const categoriesToDelete = categoriesInDB.filter(
      (dbCategory) => !templateCategories.some((category) => category.id === dbCategory.id)
    )

    const sectionsToDelete = categoriesInDB.flatMap((dbCategory) => {
      if (!categoriesToDelete.find((cat) => cat.id === dbCategory.id)) {
        const correspondingCategory = templateCategories.find((cat) => cat.id === dbCategory.id)
        const dbSections = dbCategory.sections ?? []
        const templateSections = correspondingCategory?.sections ?? []
        return dbSections.filter(
          (dbSection) => !templateSections.some((section) => section.id === dbSection.id)
        )
      } else {
        return []
      }
    })

    const questionSetsToDelete = categoriesInDB.flatMap((dbCategory) =>
      (dbCategory.sections ?? []).flatMap((dbSection) => {
        if (!sectionsToDelete.find((sec) => sec.id === dbSection.id)) {
          const correspondingSection = templateCategories
            .flatMap((cat) => cat.sections ?? [])
            .find((section) => section.id === dbSection.id)
          return (dbSection.questionSets ?? []).filter(
            (dbQuestionSet) =>
              !(correspondingSection?.questionSets ?? []).some(
                (qSet) => qSet.id === dbQuestionSet.id
              )
          )
        } else {
          return []
        }
      })
    )

    const questionsToDelete = categoriesInDB.flatMap((dbCategory) =>
      (dbCategory.sections ?? []).flatMap((dbSection) =>
        (dbSection.questionSets ?? []).flatMap((dbQuestionSet) => {
          if (!questionSetsToDelete.find((qSet) => qSet.id === dbQuestionSet.id)) {
            const correspondingQuestionSet = templateCategories
              .flatMap((cat) => cat.sections ?? [])
              .flatMap((sec) => sec.questionSets ?? [])
              .find((qSet) => qSet.id === dbQuestionSet.id)
            return (dbQuestionSet.questions ?? []).filter(
              (dbQuestion) =>
                !(correspondingQuestionSet?.questions ?? []).some(
                  (question) => question.id === dbQuestion.id
                )
            )
          } else {
            return []
          }
        })
      )
    )

    const categoryIdsToDelete = categoriesToDelete.map((cat) => cat.id)
    const sectionIdsToDelete = sectionsToDelete.map((sec) => sec.id)
    const questionSetIdsToDelete = questionSetsToDelete.map((qSet) => qSet.id)
    const questionIdsToDelete = questionsToDelete.map((q) => q.id)

    await prisma.templateCategory.deleteMany({
      where: {
        id: {
          in: categoryIdsToDelete,
        },
      },
    })

    await prisma.templateSection.deleteMany({
      where: {
        id: {
          in: sectionIdsToDelete,
        },
      },
    })

    await prisma.templateQuestionSet.deleteMany({
      where: {
        id: {
          in: questionSetIdsToDelete,
        },
      },
    })

    await prisma.templateQuestion.deleteMany({
      where: {
        id: {
          in: questionIdsToDelete,
        },
      },
    })

    await prisma.template.update({
      where: {
        id: templateId,
      },
      data: {
        title: template.title,
        description: template.description,
        categories: {
          upsert: template.categories?.map((category) => ({
            where: { id: category.id },
            update: {
              title: category.title,
              position: category.position,
              sections: {
                upsert: category.sections?.map((section) => ({
                  where: { id: section.id },
                  update: {
                    title: section.title,
                    position: section.position,
                    questionSets: {
                      upsert: section.questionSets?.map((questionSet) => ({
                        where: { id: questionSet.id },
                        update: {
                          type: questionSet.type,
                          position: questionSet.position,
                          questions: {
                            upsert: questionSet.questions?.map((question) => ({
                              where: { id: question.id },
                              update: {
                                type: question.type,
                                prompt: question.prompt,
                                position: question.position,
                                helperText: question.helperText,
                              },
                              create: {
                                id: question.id,
                                type: question.type,
                                prompt: question.prompt,
                                position: question.position,
                                helperText: question.helperText,
                              },
                            })),
                          },
                        },
                        create: {
                          id: questionSet.id,
                          type: questionSet.type,
                          position: questionSet.position,
                          questions: {
                            create: questionSet.questions?.map((question) => ({
                              id: question.id,
                              type: question.type,
                              prompt: question.prompt,
                              position: question.position,
                              helperText: question.helperText,
                            })),
                          },
                        },
                      })),
                    },
                  },
                  create: {
                    id: section.id,
                    title: section.title,
                    position: section.position,
                    questionSets: {
                      create: section.questionSets?.map((questionSet) => ({
                        id: questionSet.id,
                        type: questionSet.type,
                        position: questionSet.position,
                        questions: {
                          create: questionSet.questions?.map((question) => ({
                            id: question.id,
                            type: question.type,
                            prompt: question.prompt,
                            position: question.position,
                            helperText: question.helperText,
                          })),
                        },
                      })),
                    },
                  },
                })),
              },
            },
            create: {
              id: category.id,
              title: category.title,
              position: category.position,
              sections: {
                create: category.sections?.map((section) => ({
                  id: section.id,
                  title: section.title,
                  position: section.position,
                  questionSets: {
                    create: section.questionSets?.map((questionSet) => ({
                      id: questionSet.id,
                      type: questionSet.type,
                      position: questionSet.position,
                      questions: {
                        create: questionSet.questions?.map((question) => ({
                          id: question.id,
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
            },
          })),
        },
      },
    })

    revalidatePath(`/admin/template/${templateId}/edit`)
    return { success: 'Template updated!' }
  } catch (error) {
    return { error: 'Failed to update template!' }
  }
}
