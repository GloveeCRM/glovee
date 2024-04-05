import { TemplateQuestionType } from '@/lib/types/template'
import { TemplateQuestionType as TemplateQuestionTypes } from '@prisma/client'
import TextInputQuestionEdit from '../../question-input-types/text-input-question/text-input-question'

interface LoopQuestionSetEditQuestionWrapperProps {
  questions: TemplateQuestionType[]
}

export default function LoopQuestionSetEditQuestionWrapper({
  questions,
}: LoopQuestionSetEditQuestionWrapperProps) {
  return (
    <div className="flex flex-col gap-[6px] rounded bg-r-200/80 px-[6px] py-[8px]">
      {questions.map((question) =>
        question.type === TemplateQuestionTypes.TEXT_INPUT ? (
          <TextInputQuestionEdit key={question.id} question={question} />
        ) : (
          <div key={question.id}>{question.type}</div>
        )
      )}
    </div>
  )
}
