'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/prisma/prisma'
import { getAuthenticatedUser } from '@/auth'
import { TemplateSchema } from '../zod/schemas'
import {
  TemplateCategoryType,
  TemplateSectionType,
  TemplateType,
  TemplateQuestionSetType,
  TemplateQuestionType,
} from '../types/template'
import { fetchFullTemplateById } from '../data/template'

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
          { title: 'Untitled Category 1', position: 0 },
          { title: 'Untitled Category 2', position: 1 },
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
      where: { id: templateId },
      data: {
        title: template.title,
        description: template.description,
      },
    })

    for (const category of template.categories ?? []) {
      await upsertCategoryByTemplateId(templateId, category)
    }

    revalidatePath(`/admin/template/${templateId}/edit`)
    return { success: 'Template updated!' }
  } catch (error) {
    return { error: 'Failed to update template!' }
  }
}

async function upsertCategoryByTemplateId(
  templateId: string,
  category: TemplateCategoryType
): Promise<TemplateCategoryType> {
  await prisma.templateCategory.upsert({
    where: { id: category.id },
    update: {
      title: category.title,
      position: category.position,
    },
    create: {
      id: category.id,
      title: category.title,
      position: category.position,
      templateId,
    },
  })

  for (const section of category.sections ?? []) {
    await upsertSectionByCategoryId(section, category.id)
  }

  return category
}

async function upsertSectionByCategoryId(
  section: TemplateSectionType,
  categoryId: string
): Promise<TemplateSectionType> {
  await prisma.templateSection.upsert({
    where: { id: section.id },
    update: {
      title: section.title,
      position: section.position,
    },
    create: {
      id: section.id,
      title: section.title,
      position: section.position,
      categoryId,
    },
  })

  for (const questionSet of section.questionSets ?? []) {
    await upsertQuestionSetBySectionIdAndParentQuestionSetId(questionSet, section.id, null)
  }

  return section
}

async function upsertQuestionSetBySectionIdAndParentQuestionSetId(
  questionSet: TemplateQuestionSetType,
  sectionId: string,
  parentQuestionSetId: string | null
): Promise<TemplateQuestionSetType> {
  await prisma.templateQuestionSet.upsert({
    where: { id: questionSet.id },
    update: {
      type: questionSet.type,
      position: questionSet.position,
      questionSetId: parentQuestionSetId,
    },
    create: {
      id: questionSet.id,
      type: questionSet.type,
      position: questionSet.position,
      sectionId: sectionId,
      questionSetId: parentQuestionSetId,
    },
  })

  for (const question of questionSet.questions ?? []) {
    await upsertQuestionByQuestionSetId(question, questionSet.id)
  }

  for (const childQuestionSet of questionSet.questionSets ?? []) {
    await upsertQuestionSetBySectionIdAndParentQuestionSetId(
      childQuestionSet,
      sectionId,
      questionSet.id
    )
  }

  return questionSet
}

async function upsertQuestionByQuestionSetId(
  question: TemplateQuestionType,
  questionSetId: string
): Promise<TemplateQuestionType> {
  return await prisma.templateQuestion.upsert({
    where: { id: question.id },
    update: {
      type: question.type,
      prompt: question.prompt,
      position: question.position,
      helperText: question.helperText,
      settings: question.settings ?? {},
    },
    create: {
      id: question.id,
      type: question.type,
      prompt: question.prompt,
      position: question.position,
      helperText: question.helperText,
      settings: question.settings ?? {},
      questionSetId: questionSetId,
    },
  })
}
