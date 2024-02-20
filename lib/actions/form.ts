'use server'
import { prisma } from '@/prisma/prisma'
export async function saveInput({ input, questionId }: { input: string; questionId: string }) {
  console.log(input)

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
  return { success: true, data: answer }
}
