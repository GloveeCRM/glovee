import { TextareaQuestionType } from '@/lib/types/qusetion'

interface TextareaQuestionProps {
  question: TextareaQuestionType
  readOnly?: boolean
}

export default function TextareaQuestion({ question, readOnly }: TextareaQuestionProps) {
  return (
    <textarea
      className="w-full cursor-default rounded-sm border-[1px] border-n-400 bg-n-100 p-[4px] px-[6px] text-[12px] focus:outline-none"
      placeholder={question.type}
      readOnly={readOnly}
      rows={3}
    />
  )
}
