import { TemplateQuestionType } from '@/lib/types/template'

interface TextInputEditProps {
  question: TemplateQuestionType
}

export default function TextInputEdit({ question }: TextInputEditProps) {
  return (
    <div className="rounded bg-n-100 p-[6px] text-[14px]">
      <div className="mb-[4px]">{question.prompt}</div>
      <input
        type="text"
        className="h-[32px] w-full cursor-default rounded border-[1px] border-n-400 bg-n-100 px-[6px] text-[12px] focus:outline-none"
        placeholder={question.type}
        readOnly
      />
    </div>
  )
}
