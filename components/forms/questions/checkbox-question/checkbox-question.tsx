'use client'

import { ImSpinner2 } from 'react-icons/im'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'

import { CheckboxQuestionType } from '@/lib/types/qusetion'
import useAnswer from '@/hooks/form/use-answer'

interface CheckboxQuestionProps {
  question: CheckboxQuestionType
  readOnly?: boolean
}

export default function CheckboxQuestion({ question, readOnly }: CheckboxQuestionProps) {
  const { answer, message, updateAnswer } = useAnswer(
    question.id,
    question.answer || { optionIDs: [] }
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedOptionID = Number(e.target.value)
    const currentlySelected = answer.optionIDs ?? []
    const newSelection = e.target.checked
      ? [...currentlySelected, selectedOptionID]
      : currentlySelected.filter((id) => id !== selectedOptionID)

    updateAnswer({ ...answer, optionIDs: newSelection })
  }

  const inline = question.settings.display === 'inline'
  const options = question.options || question.settings.options

  return (
    <div className="relative">
      <div className={`flex ${inline ? 'gap-[18px]' : 'flex-col gap-[6px]'}`}>
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-[6px]">
            <input
              type="checkbox"
              id={String(option.id)}
              name={String(question.id)}
              value={option.id}
              onChange={handleChange}
              checked={answer.optionIDs?.includes(option.id) ?? false}
              disabled={readOnly}
              className="h-[16px] w-[16px] accent-n-700"
            />
            <label htmlFor={String(option.id)} className="text-[14px] text-n-500">
              {option.value}
            </label>
          </div>
        ))}
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
