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
    <div className="flex flex-col gap-[8px] rounded-lg border border-n-400 px-[8px] py-[12px]">
      {questionSet.questions &&
        questionSet.questions.length > 0 &&
        questionSet.questions.map((q) => (
          <ApplicationQuestion key={q.id} question={q} viewOnly={viewOnly} />
        ))}
    </div>
  )
}
