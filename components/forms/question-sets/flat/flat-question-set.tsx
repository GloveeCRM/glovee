import { FormQuestionSetType } from '@/lib/types/form'
import FormQuestion from '../../questions/form-question'

interface FlatQuestionSetViewProps {
  questionSet: FormQuestionSetType
  viewOnly?: boolean
}

export default function FlatQuestionSetView({
  questionSet,
  viewOnly = false,
}: FlatQuestionSetViewProps) {
  return (
    <div className="flex flex-col gap-[12px]">
      {questionSet.questions &&
        questionSet.questions.length > 0 &&
        questionSet.questions.map((q) => (
          <FormQuestion key={q.id} question={q} viewOnly={viewOnly} />
        ))}
    </div>
  )
}
