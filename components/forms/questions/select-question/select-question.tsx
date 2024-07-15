import { SelectQuestionType } from '@/lib/types/qusetion'

interface SelectQuestionProps {
  question: SelectQuestionType
  readOnly?: boolean
}

export default function SelectQuestion({ question, readOnly }: SelectQuestionProps) {
  const showPlaceholder =
    !question.settings.defaultOptionID || question.settings.defaultOptionID === 0

  return (
    <select
      className="h-[34px] w-full rounded-sm border-[1px] border-n-400 bg-transparent p-[4px] px-[6px] text-[12px] focus:outline-none"
      defaultValue={question.settings.defaultOptionID}
      disabled={readOnly}
    >
      {showPlaceholder && (
        <option value={0} disabled>
          --Select an option--
        </option>
      )}
      {question.settings.options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.value}
        </option>
      ))}
    </select>
  )
}
