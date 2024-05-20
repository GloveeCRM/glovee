import TextInputQuestion from '../../questionType/text-input-question'
import { TemplateQuestionSetType } from '@/lib/types/template'

export default function FlatQuestionSet({ questionSet }: { questionSet: TemplateQuestionSetType }) {
  return (
    <div className="bg-green-500 p-[8px]">
      {questionSet?.questions?.map((question) => (
        <TextInputQuestion key={question.id} question={question} />
      ))}
    </div>
  )
}
