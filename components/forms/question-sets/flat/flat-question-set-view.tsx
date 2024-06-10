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
    <div className="rounded-m bg-g-700 p-[8px] pt-[16px]">
      {questionSet.questions && questionSet.questions.length > 0 ? (
        <div className="bg-g-200 px-[4px]">
          {questionSet.questions.map((q) => (
            <div key={q.id}>
              <ApplicationQuestion question={q} viewOnly={viewOnly} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-[14px] text-g-700">No questions</div>
      )}
    </div>
  )
}
