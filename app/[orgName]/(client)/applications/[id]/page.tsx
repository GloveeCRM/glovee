import FlatQuestionSet from '@/components/forms/question-set-type/flat/flat-question-set'
import LoopQuestionSet from '@/components/forms/question-set-type/loop/loop-question-set'
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
  const questionSets = (await fetchQuestionSetsBySectionId(sectionId)) as QuestionSet[]

  return (
    <div>
      {questionSets.map((questionSet) => {
        if (questionSet.type === 'loop') {
          return <LoopQuestionSet key={questionSet.id} questionSet={questionSet} />
        } else if (questionSet.type === 'flat') {
          return <FlatQuestionSet key={questionSet.id} questionSet={questionSet} />
        }
        return null
      })}
    </div>
  )
}
