import { ApplicationQuestionSetType } from '@/lib/types/application'
import ApplicationQuestion from '../../questions/application-question'

interface FlatQuestionSetViewProps {
  questionSet: ApplicationQuestionSetType
  viewOnly?: boolean
}

export default function FlatQuestionSetView({
  questionSet,
  viewOnly = false,
}: FlatQuestionSetViewProps) {
  return (
    <div>
      {questionSet.questions &&
        questionSet.questions.length > 0 &&
        questionSet.questions.map((q) => (
          <ApplicationQuestion key={q.id} question={q} viewOnly={viewOnly} />
        ))}
    </div>
  )
}
