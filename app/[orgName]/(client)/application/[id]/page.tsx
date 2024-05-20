import TextInputQuestion from '@/components/forms/questionType/text-input-question'
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

const questions = [
  { id: '01', prompt: 'What is your first name?', helperText: '', position: 1, type: 'text' },
  { id: '02', prompt: 'What is your last name?', helperText: '', position: 2, type: 'text' },
  { id: '03', prompt: 'What is your birth date?', helperText: '', position: 3, type: 'text' },
  { id: '04', prompt: 'What is your job?', helperText: '', position: 4, type: 'text' },
]

export default async function ClientApplicationPage({
  searchParams,
}: {
  searchParams: { section?: string }
}) {
  const sectionId = searchParams.section || ''
  const questionSets = (await fetchQuestionSetsBySectionId(sectionId)) as QuestionSet[]

  return (
    <div>
      {/* {questionSets.map((questionSet) => {
        if (questionSet.type === 'loop') {
          return <LoopQuestionSet key={questionSet.id} questionSet={questionSet} />
        } else if (questionSet.type === 'flat') {
          return <FlatQuestionSet key={questionSet.id} questionSet={questionSet} />
        }
        return null
      })} */}
    </div>
  )
}
