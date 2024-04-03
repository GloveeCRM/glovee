import { TemplateQuestionType } from '@/lib/types/template'
import TextInputQuestionEdit from '../../question-input-types/text-input-question/text-input-question-edit'

interface FlatQuestionSetEditQuestionWrapperProps {
  questions: TemplateQuestionType[]
}

export default function FlatQuestionSetEditQuestionWrapper({
  questions,
}: FlatQuestionSetEditQuestionWrapperProps) {
  return (
    <div className="flex flex-col gap-[6px] rounded bg-g-200/80 px-[6px] py-[8px]">
      {questions.map((question) =>
        question.type === 'textInput' ? (
          <TextInputQuestionEdit key={question.id} question={question} />
        ) : (
          <div key={question.id}>{question.type}</div>
        )
      )}
    </div>
  )
}
