'use client'

import { useDebouncedCallback } from 'use-debounce'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'
import { ImSpinner2 } from 'react-icons/im'

import { FormQuestionType } from '@/lib/types/form'
import useAnswer from '@/hooks/form/use-answer'

interface TextareaQuestionProps {
  formQuestion: FormQuestionType
  readOnly?: boolean
}

export default function TextareaQuestion({
  formQuestion,
  readOnly = false,
}: TextareaQuestionProps) {
  const { message, updateAnswer } = useAnswer(formQuestion.formQuestionID)

  const handleChange = useDebouncedCallback(async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateAnswer({ ...formQuestion.answer, answerText: e.target.value })
  }, 500)

  return (
    <div>
      <div className="relative">
        <textarea
          placeholder={formQuestion.formQuestionSettings.placeholderText || ''}
          disabled={readOnly}
          rows={3}
          defaultValue={formQuestion.answer?.answerText || ''}
          onChange={handleChange}
          className="w-full rounded-[3px] border border-n-400 px-[8px] py-[4px] text-[14px] placeholder:font-light placeholder:text-n-450 focus-visible:border-n-600 focus-visible:outline-none disabled:bg-transparent"
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
      <div className="flex items-center justify-end gap-[4px] text-[12px] text-n-500">
        {formQuestion.answer?.answerText?.length || 0}
        {formQuestion.formQuestionSettings.minimumLength ||
        formQuestion.formQuestionSettings.maximumLength ? (
          <>
            <span>/</span>
            <div className="flex items-center gap-[4px]">
              <span>{formQuestion.formQuestionSettings.minimumLength || 0}</span>
              <span>-</span>
              <span>{formQuestion.formQuestionSettings.maximumLength || 'No limit'}</span>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
