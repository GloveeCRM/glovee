'use server'

import { prisma } from '@/prisma/prisma'
import { revalidatePath } from 'next/cache'

export async function saveTextInputAnswer({
  input,
  questionId,
}: {
  input: string
  questionId: string
}) {
  const question = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
  })

  if (!question) {
    return { success: false, message: 'Question not found' }
  }

  const answer = await prisma.answer.upsert({
    where: {
      questionId: questionId,
    },
    update: {
      text: input,
    },
    create: {
      questionId: questionId,
      text: input,
    },
  })

  revalidatePath(`/applications`)
  return { success: true, data: answer }
}
