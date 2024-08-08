'use client'

import { useDebouncedCallback } from 'use-debounce'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'
import { ImSpinner2 } from 'react-icons/im'

import { TextareaQuestionType } from '@/lib/types/qusetion'
import useAnswer from '@/hooks/application/use-answer'
import { Textarea } from '@/components/ui/textarea'

interface TextareaQuestionProps {
  question: TextareaQuestionType
  readOnly?: boolean
}

export default function TextareaQuestion({ question, readOnly = false }: TextareaQuestionProps) {
  const { answer, message, updateAnswer } = useAnswer(question.id, question.answer || { text: '' })

  const handleChange = useDebouncedCallback(async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateAnswer({ ...answer, text: e.target.value })
  }, 500)

  return (
    <div>
      <div className="relative">
        <Textarea
          placeholder={question.settings.placeholder}
          readOnly={readOnly}
          rows={3}
          defaultValue={answer.text || ''}
          onChange={handleChange}
        />
        {message.length !== 0 && (
          <div
            className={`absolute right-[1px] top-[1px] flex h-[34px] items-center gap-[2px] rounded bg-white px-[4px] ${message === 'Failed to save changes!' ? 'text-red-600' : 'text-g-700'}`}
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
      <div className="text-right text-[12px] text-n-500">
        {answer.text?.length || 0}
        {(question.settings.minimumLength !== null || question.settings.maximumLength !== null) &&
          ' / '}
        {question.settings.minimumLength && question.settings.minimumLength}
        {question.settings.minimumLength !== null &&
          question.settings.maximumLength !== null &&
          '-'}
        {question.settings.maximumLength && question.settings.maximumLength}
      </div>
    </div>
  )
}
