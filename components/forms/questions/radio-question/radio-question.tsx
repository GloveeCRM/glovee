'use client'

import { ImSpinner2 } from 'react-icons/im'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'

import { FormQuestionDisplayTypes, FormQuestionType } from '@/lib/types/form'
import useAnswer from '@/hooks/form/use-answer'

interface RadioQuestionProps {
  formQuestion: FormQuestionType
  mode: 'edit' | 'view'
  readOnly?: boolean
}

export default function RadioQuestion({ formQuestion, mode, readOnly }: RadioQuestionProps) {
  const { message, updateAnswer } = useAnswer(formQuestion.formQuestionID)
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedOptionID = Number(e.target.value) || 0
    updateAnswer({
      ...formQuestion.answer,
      answerOptions: [{ formQuestionOptionID: selectedOptionID }],
    })
  }

  const inline = formQuestion.formQuestionSettings.displayType === FormQuestionDisplayTypes.INLINE
  const options = formQuestion.formQuestionOptions
  const selectedOptions = options?.filter((option) =>
    formQuestion.answer?.answerOptions?.some(
      (answerOption) => answerOption.formQuestionOptionID === option.formQuestionOptionID
    )
  )

  return mode === 'edit' ? (
    <div className="relative">
      <div className={`flex ${inline ? 'gap-[18px]' : 'flex-col gap-[4px]'}`}>
        {options?.map((option) => (
          <div key={option.formQuestionOptionID} className="flex items-center gap-[4px]">
            <input
              type="radio"
              id={String(option.formQuestionOptionID)}
              name={String(formQuestion.formQuestionID)}
              value={option.formQuestionOptionID}
              onChange={handleChange}
              checked={
                formQuestion.answer?.answerOptions?.[0]?.formQuestionOptionID ===
                  option.formQuestionOptionID ||
                formQuestion.formQuestionDefaultOptions?.[0]?.formQuestionOptionID ===
                  option.formQuestionOptionID
              }
              disabled={readOnly}
              className="h-[16px] w-[16px] accent-n-700"
            />
            <label htmlFor={String(option.formQuestionOptionID)} className="text-[14px]">
              {option.optionText}
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
  ) : (
    <div className="text-[14px] text-zinc-500">
      {selectedOptions?.length ? (
        <ul className="list-inside list-disc">
          {selectedOptions.map((option) => (
            <li key={option.formQuestionOptionID}>{option.optionText}</li>
          ))}
        </ul>
      ) : (
        'No answer provided'
      )}
    </div>
  )
}
