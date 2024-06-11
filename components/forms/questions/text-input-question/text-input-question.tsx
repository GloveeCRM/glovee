'use client'

import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { ImSpinner2 } from 'react-icons/im'
import { IoMdCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io'

import { TextInputQuestionType } from '@/lib/types/qusetion'
import { saveAnswer } from '@/lib/actions/application'
import { useOrgContext } from '@/contexts/org-context'
import { Input } from '@/components/ui/input'

interface TextInputQuestionProps {
  question: TextInputQuestionType
  readOnly?: boolean
}

export default function TextInputQuestion({ question, readOnly = false }: TextInputQuestionProps) {
  const { orgName } = useOrgContext()
  const [message, setMessage] = useState<string>('')

  const handleChange = useDebouncedCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('Saving')
    saveAnswer(orgName, question.id, { text: e.target.value }).then((data) => {
      setMessage(data.success ? 'Saved!' : 'Failed to save changes!')
      setTimeout(() => {
        setMessage('')
      }, 1000)
    })
  }, 500)

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={question.settings.placeholder}
        readOnly={readOnly}
        defaultValue={question.answer?.answer.text || ''}
        onChange={handleChange}
      />
      {message.length !== 0 && (
        <div
          className={`absolute right-[1px] top-[1px] flex h-[calc(100%-2px)] items-center gap-[2px] rounded bg-white px-[4px] ${message === 'Failed to save changes!' ? 'text-red-600' : 'text-g-700'}`}
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
