'use client'

import { ImSpinner2 } from 'react-icons/im'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'

import { SelectQuestionType } from '@/lib/types/qusetion'
import useAnswer from '@/hooks/form/use-answer'

interface SelectQuestionProps {
  question: SelectQuestionType
  readOnly?: boolean
}

export default function SelectQuestion({ question, readOnly }: SelectQuestionProps) {
  const { answer, message, updateAnswer } = useAnswer(
    question.id,
    question.answer || { optionIDs: [] }
  )

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOptionID = Number(e.target.value) || 0
    updateAnswer({ ...answer, optionIDs: [selectedOptionID] })
  }

  const showPlaceholder =
    !question.settings.defaultOptionID || question.settings.defaultOptionID === 0
  const options = question.options || question.settings.options

  return (
    <div className="relative">
      <select
        className="w-full rounded-[3px] border border-n-400 bg-transparent px-[6px] py-[8px] text-[14px] focus-visible:outline-none"
        defaultValue={answer.optionIDs?.[0] || question.settings.defaultOptionID}
        disabled={readOnly}
        onChange={handleChange}
      >
        {showPlaceholder && (
          <option value={0} disabled>
            --Select an option--
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>
      {message.length !== 0 && (
        <div
          className={`absolute right-[1px] top-[1px] flex h-[32px] items-center gap-[2px] rounded bg-white px-[4px] ${message === 'Failed to save changes!' ? 'text-red-600' : 'text-g-700'}`}
        >
          {message === 'Saving' ? (
            <ImSpinner2 className="h-[14px] w-[14px] animate-spin" />
          ) : message === 'Saved!' ? (
            <IoMdCheckmarkCircle className="h-[18px] w-[18px]" />
          ) : message === 'Failed to save changes!' ? (
            <IoIosCloseCircle className="h-[18px] w-[18px]" />
          ) : (
            ''
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}
