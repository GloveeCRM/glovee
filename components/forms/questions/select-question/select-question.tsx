import { QuestionType } from '@/lib/types/qusetion'

interface SelectQuestionProps {
  question: QuestionType
  readOnly?: boolean
}

export default function SelectQuestion({ question, readOnly }: SelectQuestionProps) {
  return (
    <select
      className="w-full rounded-sm border-[1px] border-n-400 bg-n-100 p-[4px] px-[6px] text-[12px] focus:outline-none"
      placeholder={question.type}
      disabled={readOnly}
    >
      <option value="">{question.type}</option>
    </select>
  )
}
