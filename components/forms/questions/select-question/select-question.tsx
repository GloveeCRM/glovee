'use client'

import { useState } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'

import { AnswerTypes, SelectQuestionType } from '@/lib/types/qusetion'
import { saveAnswer } from '@/lib/actions/application'
import { useOrgContext } from '@/contexts/org-context'

interface SelectQuestionProps {
  question: SelectQuestionType
  readOnly?: boolean
}

export default function SelectQuestion({ question, readOnly }: SelectQuestionProps) {
  const { orgName } = useOrgContext()
  const [message, setMessage] = useState<string>('')

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOptionID = Number(e.target.value) || 0
    setMessage('Saving')
    saveAnswer(orgName, question.id, { optionIDs: [selectedOptionID] }, AnswerTypes.OPTION).then(
      (data) => {
        setMessage(data.success ? 'Saved!' : 'Failed to save changes!')
        setTimeout(() => {
          setMessage('')
        }, 1000)
      }
    )
  }

  const showPlaceholder =
    !question.settings.defaultOptionID || question.settings.defaultOptionID === 0

  return (
    <div className="relative">
      <select
        className="h-[34px] w-full rounded-sm border-[1px] border-n-400 bg-transparent p-[4px] px-[6px] text-[12px] focus:outline-none"
        defaultValue={question.answer?.answer.optionIDs?.[0] || question.settings.defaultOptionID}
        disabled={readOnly}
        onChange={handleChange}
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
