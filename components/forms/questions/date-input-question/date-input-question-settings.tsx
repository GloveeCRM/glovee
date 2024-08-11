'use client'

import { useDebouncedCallback } from 'use-debounce'

import { DateInputQuestionType } from '@/lib/types/qusetion'
import { MONTHS } from '@/lib/constants/date'
import { daysInMonth } from '@/lib/functions/date'
import useQuestionActions from '@/hooks/template/use-question-actions'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

interface DateInputQuestionSettingsProps {
  question: DateInputQuestionType
}

export default function DateInputQuestionSettings({ question }: DateInputQuestionSettingsProps) {
  const { updateQuestion } = useQuestionActions()

  function handleChangeIsRequired(isChecked: boolean) {
    updateQuestion({
      ...question,
      isRequired: isChecked,
    })
  }

  function handleChangeMinimumDate(date: Date | null) {
    updateQuestion({
      ...question,
      settings: { ...question.settings, minimumDate: date?.toISOString() },
    })
  }

  function handleChangeMaximumDate(date: Date | null) {
    updateQuestion({
      ...question,
      settings: { ...question.settings, maximumDate: date?.toISOString() },
    })
  }

  function handleChangeIsMinDateRequired(isChecked: boolean) {
    updateQuestion({
      ...question,
      settings: {
        ...question.settings,
        minimumDate: isChecked ? new Date().toISOString() : null,
      },
    })
  }

  function handleChangeIsMaxDateRequired(isChecked: boolean) {
    updateQuestion({
      ...question,
      settings: {
        ...question.settings,
        maximumDate: isChecked ? new Date().toISOString() : null,
      },
    })
  }

  const handleChangeGuide = useDebouncedCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    updateQuestion({
      ...question,
      helperText: value,
    })
  }, 500)

  const selectedMinDate = question.settings.minimumDate
    ? new Date(question.settings.minimumDate)
    : null
  const selectedMaxDate = question.settings.maximumDate
    ? new Date(question.settings.maximumDate)
    : null

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex items-center gap-[6px]">
        <Switch checked={question.isRequired} onCheckedChange={handleChangeIsRequired} />
        <div>isRequired</div>
      </div>
      <Separator className="bg-n-600" />
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[6px]">
          <div className="flex items-center gap-[6px]">
            <Switch
              checked={selectedMinDate !== null}
              onCheckedChange={handleChangeIsMinDateRequired}
            />
            <div>Minimum Date</div>
          </div>
          {selectedMinDate && (
            <DateSelect
              date={selectedMinDate}
              idPrefix="min"
              onUpdateDate={handleChangeMinimumDate}
            />
          )}
        </div>
        <div className="flex flex-col gap-[6px]">
          <div className="flex items-center gap-[6px]">
            <Switch
              checked={selectedMaxDate !== null}
              onCheckedChange={handleChangeIsMaxDateRequired}
            />
            <div>Maximum Date</div>
          </div>
          {selectedMaxDate && (
            <DateSelect
              date={selectedMaxDate}
              idPrefix="max"
              onUpdateDate={handleChangeMaximumDate}
            />
          )}
        </div>
      </div>
      <Separator className="bg-n-600" />
      <div className="flex flex-col gap-[6px]">
        <div>Guide</div>
        <Textarea
          defaultValue={question.helperText}
          className="rounded-sm border-0 bg-n-600/80 text-[12px] focus-visible:ring-1 focus-visible:ring-n-500"
          onChange={handleChangeGuide}
        />
      </div>
    </div>
  )
}

interface DateSelectProps {
  date: Date
  idPrefix: string
  onUpdateDate: (date: Date) => void
}

function DateSelect({ date, idPrefix, onUpdateDate }: DateSelectProps) {
  const days = daysInMonth(date.getFullYear(), date.getMonth() + 1)

  return (
    <div className="flex gap-[2%]">
      <div className="flex w-full flex-col">
        <label htmlFor={`${idPrefix}-day`} className="text-[12px] text-n-400">
          Day
        </label>
        <select
          id={`${idPrefix}-day`}
          className="rounded-sm border-[1px] border-n-500 bg-n-700 py-[4px] text-[12px] focus:outline-none"
          defaultValue={date.getDate()}
          onChange={(e) => {
            const day = Number(e.target.value)
            const newDate = new Date(date)
            newDate.setDate(day)
            onUpdateDate(newDate)
          }}
        >
          {Array.from({ length: days }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor={`${idPrefix}-month`} className="text-[12px] text-n-400">
          Month
        </label>
        <select
          id={`${idPrefix}-month`}
          className="rounded-sm border-[1px] border-n-500 bg-n-700 py-[4px] text-[12px] focus:outline-none"
          defaultValue={date.getMonth() + 1}
          onChange={(e) => {
            const month = Number(e.target.value)
            const newDate = new Date(date)
            newDate.setMonth(month - 1)
            onUpdateDate(newDate)
          }}
        >
          {MONTHS.map((month) => (
            <option key={month.number} value={month.number}>
              {month.number} - {month.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor={`${idPrefix}-year`} className="text-[12px] text-n-400">
          Year
        </label>
        <select
          id={`${idPrefix}-year`}
          className="rounded-sm border-[1px] border-n-500 bg-n-700 py-[4px] text-[12px] focus:outline-none"
          defaultValue={date.getFullYear()}
          onChange={(e) => {
            const year = Number(e.target.value)
            const newDate = new Date(date)
            newDate.setFullYear(year)
            onUpdateDate(newDate)
          }}
        >
          {Array.from({ length: 201 }, (_, index) => {
            const year = date.getFullYear() - 100 + index
            return (
              <option key={year} value={year}>
                {year}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}
