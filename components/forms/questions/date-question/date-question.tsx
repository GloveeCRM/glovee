'use client'

import { useState } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'

import { FormAnswerType, FormQuestionType } from '@/lib/types/form'
import { MONTHS } from '@/lib/constants/date'
import { compareDates, daysInMonth } from '@/lib/functions/date'
import useAnswer from '@/hooks/form/use-answer'

interface DateQuestionProps {
  formQuestion: FormQuestionType
  readOnly?: boolean
}

export default function DateQuestion({ formQuestion, readOnly }: DateQuestionProps) {
  const { answer, message, updateAnswer } = useAnswer(
    formQuestion.formQuestionID,
    formQuestion.answer ||
      ({
        formQuestionID: formQuestion.formQuestionID,
        answerDate: '',
      } as FormAnswerType)
  )

  const initialDate = answer.answerDate ? new Date(answer.answerDate) : null
  const minimumDate = new Date(formQuestion.formQuestionSettings?.minimumDate || '1900-01-01')
  const maximumDate = new Date(formQuestion.formQuestionSettings?.maximumDate || '2100-12-31')

  const [selectedDate, setSelectedDate] = useState({
    year: initialDate ? initialDate.getUTCFullYear() : 0,
    month: initialDate ? initialDate.getUTCMonth() + 1 : 0,
    day: initialDate ? initialDate.getUTCDate() : 0,
  })

  function handleYearChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newDate = { ...selectedDate, year: Number(e.target.value) }
    if (!isDateValid(newDate)) {
      newDate.month = 0
      newDate.day = 0
    }
    setSelectedDate(newDate)

    if (isDateValid(newDate)) {
      saveDate(newDate)
    }
  }

  function handleMonthChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newDate = { ...selectedDate, month: Number(e.target.value) }
    if (!isDateValid(newDate)) {
      newDate.day = 0
    }
    setSelectedDate(newDate)

    if (isDateValid(newDate)) {
      saveDate(newDate)
    }
  }

  function handleDayChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newDate = { ...selectedDate, day: Number(e.target.value) }
    setSelectedDate(newDate)
    if (isDateValid(newDate)) {
      saveDate(newDate)
    }
  }

  function isDateValid(date: { year: number; month: number; day: number } = selectedDate) {
    const checkDate = new Date(Date.UTC(date.year, date.month - 1, date.day))
    return (
      date.year !== 0 &&
      date.month !== 0 &&
      date.day !== 0 &&
      checkDate >= minimumDate &&
      checkDate <= maximumDate
    )
  }

  function saveDate(date: { year: number; month: number; day: number }) {
    const newDate = new Date(Date.UTC(date.year, date.month - 1, date.day)).toISOString()
    updateAnswer({ ...answer, answerDate: newDate })
  }

  const numDaysInMonth = daysInMonth(
    Number(selectedDate.year) || 0,
    Number(selectedDate.month) - 1 || 0
  )

  return (
    <div className="relative flex gap-[2%]">
      <div className="flex w-full flex-col">
        <label htmlFor="day" className="text-[12px] text-n-500">
          Day
        </label>
        <select
          id="day"
          className="w-full rounded-[3px] border border-n-400 bg-transparent px-[6px] py-[8px] text-[14px] focus-visible:outline-none"
          placeholder={formQuestion.formQuestionType}
          disabled={readOnly}
          value={selectedDate.day}
          onChange={handleDayChange}
        >
          <option value="">DD</option>
          {Array.from({ length: numDaysInMonth }, (_, index) => {
            const day = index + 1
            if (
              (selectedDate.year &&
                selectedDate.month &&
                compareDates(
                  new Date(Number(selectedDate.year), Number(selectedDate.month) - 1, day),
                  minimumDate
                ) === -1) ||
              compareDates(
                new Date(Number(selectedDate.year), Number(selectedDate.month) - 1, day),
                maximumDate
              ) === 1
            ) {
              return null
            }
            return (
              <option key={day} value={day}>
                {day}
              </option>
            )
          })}
        </select>
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="month" className="text-[12px] text-n-500">
          Month
        </label>
        <select
          id="month"
          className="w-full rounded-[3px] border border-n-400 bg-transparent px-[6px] py-[8px] text-[14px] focus-visible:outline-none"
          disabled={readOnly}
          value={selectedDate.month}
          onChange={handleMonthChange}
        >
          <option value="">MM</option>
          {MONTHS.map((month) => {
            if (
              (selectedDate.year === minimumDate.getFullYear() &&
                month.number < minimumDate.getMonth() + 1) ||
              (selectedDate.year === maximumDate.getFullYear() &&
                month.number > maximumDate.getMonth() + 1)
            ) {
              return null
            }
            return (
              <option key={month.number} value={month.number}>
                {month.number} - {month.name}
              </option>
            )
          })}
        </select>
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="year" className="text-[12px] text-n-500">
          Year
        </label>
        <select
          id="year"
          className="w-full rounded-[3px] border border-n-400 bg-transparent px-[6px] py-[8px] text-[14px] focus-visible:outline-none"
          placeholder={formQuestion.formQuestionType}
          disabled={readOnly}
          value={selectedDate.year}
          onChange={handleYearChange}
        >
          <option value="">YYYY</option>
          {Array.from(
            { length: maximumDate.getFullYear() - minimumDate.getFullYear() + 1 },
            (_, index) => {
              const year = minimumDate.getFullYear() + index
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            }
          )}
        </select>
      </div>
      {message.length !== 0 && (
        <div
          className={`absolute right-[1px] top-[1px] flex h-[32px] items-center gap-[2px] rounded bg-white px-[4px] ${message === 'Failed to save changes!' ? 'text-red-600' : 'text-g-700'}`}
        >
          {message === 'Saving' ? (
            <ImSpinner2 className="h-[14px] w-[14px] animate-spin" />
          ) : message === 'Saved!' ? (
            <IoMdCheckmarkCircle className="h-[18px] w-[18px]" />
          ) : (
            <IoIosCloseCircle className="h-[18px] w-[18px]" />
          )}
          <span className="text-[12px]">{message}</span>
        </div>
      )}
    </div>
  )
}
