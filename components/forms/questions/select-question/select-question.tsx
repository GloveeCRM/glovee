import { QuestionType, SelectQuestionType } from '@/lib/types/qusetion'

interface SelectQuestionProps {
  question: SelectQuestionType
  readOnly?: boolean
}

export default function SelectQuestion({ question, readOnly }: SelectQuestionProps) {
  return (
    <select
      className="w-full rounded-sm border-[1px] border-n-400 bg-n-100 p-[4px] px-[6px] text-[12px] focus:outline-none"
      defaultValue={question.settings.defaultOptionID}
      disabled={readOnly}
    >
      <option value={question.settings.defaultOptionID}>
        {question.settings.defaultOptionID === 0
          ? '--Select an option--'
          : question.settings.options.find(
              (option) => option.id === question.settings.defaultOptionID
            )?.value}
      </option>
    </select>
  )
}
