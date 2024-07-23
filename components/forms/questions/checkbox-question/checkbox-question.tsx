'use client'
import { useState } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'

import { AnswerTypes, CheckboxQuestionType } from '@/lib/types/qusetion'
import { saveAnswer } from '@/lib/actions/application'
import { useOrgContext } from '@/contexts/org-context'

interface CheckboxQuestionProps {
  question: CheckboxQuestionType
  readOnly?: boolean
}

export default function CheckboxQuestion({ question, readOnly }: CheckboxQuestionProps) {
  const { orgName } = useOrgContext()
  const [message, setMessage] = useState<string>('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedOptionID = Number(e.target.value)
    const currentlySelected = question.answer?.answer.optionIDs ?? []
    const newSelection = e.target.checked
      ? [...currentlySelected, selectedOptionID]
      : currentlySelected.filter((id) => id !== selectedOptionID)

    setMessage('Saving')
    saveAnswer(orgName, question.id, { optionIDs: newSelection }, AnswerTypes.OPTION).then(
      (data) => {
        setMessage(data.success ? 'Saved!' : 'Failed to save changes!')
        setTimeout(() => {
          setMessage('')
        }, 1000)
      }
    )
  }
  const inline = question.settings.display === 'inline'
  const options = question.settings.options

  return (
    <div className="relative">
      <div className={`flex ${inline ? 'gap-[18px]' : 'flex-col gap-[4px]'}`}>
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-[4px]">
            <input
              type="checkbox"
              id={String(option.id)}
              name={String(question.id)}
              value={option.id}
              onChange={handleChange}
              checked={question.answer?.answer.optionIDs?.includes(option.id) ?? false}
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
          ) : (
            <IoIosCloseCircle className="h-[18px] w-[18px]" />
          )}
          <span className="text-[12px]">{message}</span>
        </div>
      )}
    </div>
  )
}
