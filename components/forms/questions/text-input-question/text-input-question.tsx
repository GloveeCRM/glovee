import { TextInputQuestionType } from '@/lib/types/qusetion'

interface TextInputQuestionProps {
  question: TextInputQuestionType
  readOnly?: boolean
}

export default function TextInputQuestion({ question, readOnly = false }: TextInputQuestionProps) {
  return (
    <input
      type="text"
      className="h-[32px] w-full cursor-default rounded-sm border-[1px] border-n-400 bg-n-100 px-[6px] text-[12px] focus:outline-none"
      placeholder={question.type}
      readOnly={readOnly}
    />
  )
}
