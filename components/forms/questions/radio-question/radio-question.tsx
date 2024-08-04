'use client'

import { useState } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'

import { RadioQuestionType } from '@/lib/types/qusetion'
import { saveAnswer } from '@/lib/actions/application'
import { useOrgContext } from '@/contexts/org-context'

interface RadioQuestionProps {
  question: RadioQuestionType
  readOnly?: boolean
}

export default function RadioQuestion({ question, readOnly }: RadioQuestionProps) {
  const { orgName } = useOrgContext()
  const [message, setMessage] = useState<string>('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedOptionID = Number(e.target.value) || 0
    setMessage('Saving')
    saveAnswer({ orgName, questionID: question.id, optionIDs: [selectedOptionID] }).then((data) => {
      setMessage(data.success ? 'Saved!' : 'Failed to save changes!')
      setTimeout(() => {
        setMessage('')
      }, 1000)
    })
  }

  const inline = question.settings.display === 'inline'
  const options = question.options

  return (
    <div className="relative">
      <div className={`flex ${inline ? 'gap-[18px]' : 'flex-col gap-[4px]'}`}>
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-[4px]">
            <input
              type="radio"
              id={String(option.id)}
              name={String(question.id)}
              value={option.id}
              onChange={handleChange}
              checked={question.answer?.optionIDs?.[0] === option.id}
              disabled={readOnly}
              className="h-[14px] w-[14px]"
            />
            <label htmlFor={String(option.id)} className="text-[12px] text-n-500">
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
