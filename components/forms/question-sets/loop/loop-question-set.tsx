import { TemplateQuestionSetType } from '@/lib/types/template'
import TextInputQuestion from '../../questionType/text-input-question'
import { ApplicationQuestionSetType } from '@/lib/types/application'

export default function LoopQuestionSet({
  questionSet,
}: {
  questionSet: ApplicationQuestionSetType | TemplateQuestionSetType
}) {
  return (
    <div className="bg-red-500 p-[8px]">
      {questionSet?.questions?.map((question) => (
        <TextInputQuestion key={question.id} question={question} />
      ))}
    </div>
  )
}
