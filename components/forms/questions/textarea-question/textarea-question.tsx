import { TemplateQuestionType } from '@/lib/types/template'

interface TextareaQuestionProps {
  question: TemplateQuestionType
  readOnly?: boolean
}

export default function TextareaQuestion({ question, readOnly }: TextareaQuestionProps) {
  return (
    <textarea
      className="w-full rounded border-[1px] border-n-400 bg-n-100 p-[4px] px-[6px] text-[12px] focus:outline-none"
      placeholder={question.type}
      readOnly={readOnly}
      rows={3}
    />
  )
}
