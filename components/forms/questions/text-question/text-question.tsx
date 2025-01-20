'use client'

import { useDebouncedCallback } from 'use-debounce'
import { ImSpinner2 } from 'react-icons/im'
import { IoMdCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io'

import { FormAnswerType, FormQuestionType } from '@/lib/types/form'
import useAnswer from '@/hooks/form/use-answer'

interface TextQuestionProps {
  formQuestion: FormQuestionType
  mode: 'edit' | 'view'
  readOnly?: boolean
}

export default function TextQuestion({ formQuestion, mode, readOnly = false }: TextQuestionProps) {
  const { message, updateAnswer } = useAnswer(formQuestion.formQuestionID)
  const handleChange = useDebouncedCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAnswer({ ...formQuestion.answer, answerText: e.target.value })
  }, 500)

  return mode === 'edit' ? (
    <div className="relative">
      <input
        type="text"
        placeholder={formQuestion.formQuestionSettings.placeholderText || ''}
        disabled={readOnly}
        defaultValue={formQuestion.answer?.answerText || ''}
        onChange={handleChange}
        className={`w-full rounded-[3px] border border-n-400 bg-sand-400 px-[8px] py-[7px] text-[14px] placeholder:font-light placeholder:text-n-450 focus-visible:border-n-600 focus-visible:outline-none disabled:bg-transparent`}
      />
      {message.length !== 0 && (
        <div
          className={`absolute right-[1px] top-[1px] flex h-[calc(100%-2px)] items-center gap-[2px] rounded-[3px] bg-sand-400 px-[4px] ${message === 'Failed to save changes!' ? 'text-red-600' : 'text-g-700'}`}
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
  ) : (
    <div className="text-[14px] text-zinc-500">
      {formQuestion.answer?.answerText || 'No answer provided'}
    </div>
  )
}
