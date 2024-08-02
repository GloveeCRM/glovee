import { DateInputQuestionType } from '@/lib/types/qusetion'

interface DateInputQuestionProps {
  question: DateInputQuestionType
  readOnly?: boolean
}

export default function DateInputQuestion({ question, readOnly }: DateInputQuestionProps) {
  return (
    <div className="flex gap-[2%]">
      <div className="flex w-full flex-col">
        <label htmlFor="day" className="text-[12px] text-n-500">
          Day
        </label>
        <select
          id="day"
          className="h-[32px] w-full rounded-sm border-[1px] border-n-400 bg-transparent p-[4px] px-[6px] text-[12px] focus:outline-none"
          placeholder={question.type}
          disabled={readOnly}
        >
          <option value="">DD</option>
        </select>
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="month" className="text-[12px] text-n-500">
          Month
        </label>
        <select
          id="month"
          className="h-[32px] w-full rounded-sm border-[1px] border-n-400 bg-transparent p-[4px] px-[6px] text-[12px] focus:outline-none"
          disabled={readOnly}
        >
          <option value="">MM</option>
        </select>
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="year" className="text-[12px] text-n-500">
          Year
        </label>
        <select
          id="year"
          className="h-[32px] w-full rounded-sm border-[1px] border-n-400 bg-transparent p-[4px] px-[6px] text-[12px] focus:outline-none"
          placeholder={question.type}
          disabled={readOnly}
        >
          <option value="">YYYY</option>
        </select>
      </div>
    </div>
  )
}
