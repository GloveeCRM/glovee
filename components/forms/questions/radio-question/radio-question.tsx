import { RadioQuestionType } from '@/lib/types/qusetion'

interface RadioQuestionProps {
  question: RadioQuestionType
  readOnly?: boolean
}

export default function RadioQuestion({ question, readOnly }: RadioQuestionProps) {
  const inline = question.settings.display === 'inline'
  const options = question.settings.options

  return (
    <div className={`flex ${inline ? 'gap-[24px]' : 'flex-col gap-[4px]'}`}>
      {options.map((option) => (
        <div key={option.position} className="flex items-center gap-[4px]">
          <input
            type="radio"
            id={option.value}
            name={question.id}
            value={option.value}
            disabled={readOnly}
            className="h-[14px] w-[14px]"
          />
          <label htmlFor={option.value} className="text-[12px] text-n-500">
            {option.value}
          </label>
        </div>
      ))}
    </div>
  )
}