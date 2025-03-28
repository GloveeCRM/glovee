'use client'

import { ImSpinner2 } from 'react-icons/im'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'

import { FormQuestionModes, FormQuestionType } from '@/lib/types/form'
import useAnswer from '@/hooks/form/use-answer'

interface SelectQuestionProps {
  formQuestion: FormQuestionType
  mode: FormQuestionModes
}

export default function SelectQuestion({ formQuestion, mode }: SelectQuestionProps) {
  const { message, updateAnswer } = useAnswer(formQuestion.formQuestionID)

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOptionID = Number(e.target.value) || 0
    updateAnswer({
      ...formQuestion.answer,
      answerOptions: [{ formQuestionOptionID: selectedOptionID }],
    })
  }
  const showPlaceholder = formQuestion.formQuestionDefaultOptions?.length === 0
  const options = formQuestion.formQuestionOptions
  const selectedOptions = options?.filter((option) =>
    formQuestion.answer?.answerOptions?.some(
      (answerOption) => answerOption.formQuestionOptionID === option.formQuestionOptionID
    )
  )

  const isAnswerOnly = mode === FormQuestionModes.ANSWER_ONLY
  const isInteractive = mode === FormQuestionModes.INTERACTIVE

  return isAnswerOnly ? (
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
  ) : (
    <div className="relative">
      <select
        className="w-full rounded-[3px] border border-n-400 bg-transparent px-[6px] py-[8px] text-[14px] focus-visible:outline-none"
        value={
          formQuestion.answer?.answerOptions?.[0]?.formQuestionOptionID ||
          formQuestion.formQuestionDefaultOptions?.[0]?.formQuestionOptionID ||
          0
        }
        disabled={!isInteractive}
        onChange={handleChange}
      >
        {showPlaceholder && (
          <option value={0} disabled>
            --Select an option--
          </option>
        )}
        {options?.map((option) => (
          <option key={option.formQuestionOptionID} value={option.formQuestionOptionID}>
            {option.optionText}
          </option>
        ))}
      </select>
      {message.length !== 0 && (
        <div
          className={`absolute right-[1px] top-[1px] flex h-[32px] items-center gap-[2px] rounded bg-sand-400 px-[4px] ${message === 'Failed to save changes!' ? 'text-red-600' : 'text-g-700'}`}
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
