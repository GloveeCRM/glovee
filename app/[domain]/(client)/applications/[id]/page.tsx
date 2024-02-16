import FlatQuestionSet from '@/components/form/flat-question-set'
import { fetchQuestionSetsBySectionId } from '@/lib/data/application'

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
}

export default async function ClientApplicationPage({
  searchParams,
}: {
  searchParams: { section?: string }
}) {
  const sectionId = searchParams.section || ''
  const questionSets = (await fetchQuestionSetsBySectionId(sectionId)) as QuestionSet[]

  return (
    <div>
      {questionSets.map((questionSet) => (
        <FlatQuestionSet key={questionSet.id} questionSet={questionSet} />
      ))}
    </div>
  )
}
