import { TemplateQuestionType } from '@/lib/types/template'
import TextInputQuestionEdit from '../../question-input-types/text-input-question/text-input-question-edit'

interface DependsOnQuestionSetEditQuestionWrapperProps {
  questions: TemplateQuestionType[]
}

export default function DependsOnQuestionSetEditQuestionWrapper({
  questions,
}: DependsOnQuestionSetEditQuestionWrapperProps) {
  return (
    <div className="flex flex-col gap-[6px] rounded bg-b-300/80 px-[6px] py-[8px]">
      {questions.map((question) =>
        question.type === 'TEXT_INPUT' ? (
          <TextInputQuestionEdit key={question.id} question={question} />
        ) : (
          <div key={question.id}>{question.type}</div>
        )
      )}
    </div>
  )
}
