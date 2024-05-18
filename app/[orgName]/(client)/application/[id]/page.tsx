import { fetchQuestionSetsBySectionId } from '@/lib/data/application'
import { ApplicationQuestionSetType } from '@/lib/types/application'

export interface QuestionSet {
  id: string
  type: string
  position: number
  questions: Question[]
}

export interface Question {
  id: string
  prompt: string
  helperText?: string
  position: number
  type: string
  answer?: Answer
}

export interface Answer {
  id: string
  text: string
  questionId: string
}

export default async function ClientApplicationPage({
  searchParams,
}: {
  searchParams: { section?: string }
}) {
  const sectionId = searchParams.section || ''
  const questionSets = (await fetchQuestionSetsBySectionId(
    sectionId
  )) as ApplicationQuestionSetType[]

  return <div>{JSON.stringify(questionSets)}</div>
}
