'use client'

import { useEffect, useRef, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'

import { FormQuestionSetType, FormQuestionType } from '@/lib/types/form'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionActions from '@/hooks/form-template/use-question-actions'
import NonEmptyQuestionSetDropzone from '../non-empty-question-set-dropzone'
import EmptyQuestionSetDropzone from '../empty-question-set-dropzone'
import TemplateQuestionSet from '../template-question-set'

interface DependsOnQuestionSetEditProps {
  formQuestionSet: FormQuestionSetType
}

export default function DependsOnQuestionSetEdit({
  formQuestionSet,
}: DependsOnQuestionSetEditProps) {
  const { formQuestionSetQuestions, formQuestionSetChildFormQuestionSets } =
    useFormTemplateEditContext()
  const formQuestionSetQuestion = formQuestionSetQuestions(formQuestionSet.formQuestionSetID)?.[0]
  const isInline = formQuestionSetQuestion?.formQuestionSettings.displayType === 'inline'
  const defaultOption =
    formQuestionSetQuestion?.formQuestionDefaultOptions?.[0] ||
    formQuestionSetQuestion?.formQuestionOptions?.[0]

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [selectedOptionID, setSelectedOptionID] = useState<number>(
    defaultOption?.formQuestionOptionID || 0
  )
  const { updateFormQuestion } = useQuestionActions()

  const questionPromptInputRef = useRef<HTMLTextAreaElement>(null)

  const childQuestionSets = formQuestionSetChildFormQuestionSets(formQuestionSet.formQuestionSetID)
  const questionSetsToDisplay = childQuestionSets?.filter(
    (qs) => qs.dependsOnOptionID === selectedOptionID
  )

  function handleSelectOption(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedOptionID(Number(e.target.value))
  }

  function handleClickEditPrompt() {
    setIsEditing(true)
  }

  function adjustTextareaHeight() {
    const textarea = questionPromptInputRef.current
    if (textarea) {
      textarea.style.height = '29px'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  function handlePromptChange() {
    adjustTextareaHeight()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && formQuestionSetQuestion) {
      e.preventDefault()
      const updatedFormQuestion: FormQuestionType = {
        ...formQuestionSetQuestion,
        formQuestionPrompt: e.currentTarget.value || '',
      }
      setIsEditing(false)
      updateFormQuestion({ updatedFormQuestion })
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsEditing(false)
    }
  }

  useEffect(() => {
    function handleClickOutsideQuestionPrompt(e: MouseEvent) {
      if (
        questionPromptInputRef.current &&
        !questionPromptInputRef.current.contains(e.target as Node) &&
        formQuestionSetQuestion
      ) {
        setIsEditing(false)
        const updatedFormQuestion: FormQuestionType = {
          ...formQuestionSetQuestion,
          formQuestionPrompt: questionPromptInputRef.current.value || '',
        }
        updateFormQuestion({ updatedFormQuestion })
      }
    }

    if (isEditing) {
      adjustTextareaHeight()

      const textarea = questionPromptInputRef.current
      if (textarea) {
        textarea.focus()

        // move cursor to the end of the text
        const length = textarea.value.length
        textarea.setSelectionRange(length, length)
      }
    }

    document.addEventListener('mousedown', handleClickOutsideQuestionPrompt)
    return () => document.removeEventListener('mousedown', handleClickOutsideQuestionPrompt)
  }, [formQuestionSetQuestion, isEditing, updateFormQuestion])

  return (
    <div className="group/questionSet rounded bg-b-500 p-[8px] pt-[16px] text-[14px]">
      <div className="rounded bg-n-200 p-[8px]">
        {isEditing ? (
          <textarea
            ref={questionPromptInputRef}
            className="mb-[8px] ml-[-3px] mr-[8px] block w-full resize-none overflow-hidden rounded-sm border-[2px] border-dashed border-b-300 bg-n-100 px-[2px] pb-[2px] pt-[1px] focus:border-[1px] focus:border-b-500 focus:outline-none"
            defaultValue={formQuestionSetQuestion?.formQuestionPrompt || ''}
            onChange={handlePromptChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className="group/prompt mb-[10px] mr-[8px] mt-[2px] flex w-full gap-[8px]">
            <div>{formQuestionSetQuestion?.formQuestionPrompt}</div>
            <div
              onClick={handleClickEditPrompt}
              className="cursor-pointer opacity-0 transition duration-75 group-hover/prompt:opacity-100"
            >
              <FiEdit2 className="mt-[1px] h-[16px] w-[16px]" />
            </div>
          </div>
        )}
        <div className={`flex ${isInline ? 'gap-[18px]' : 'flex-col gap-[4px]'}`}>
          {formQuestionSetQuestion?.formQuestionOptions?.map((option) => (
            <div
              key={option.formQuestionOptionID}
              className="flex items-start gap-[4px]"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setSelectedOptionID(option.formQuestionOptionID)
              }}
            >
              <input
                type="radio"
                name={String(formQuestionSetQuestion?.formQuestionID)}
                value={option.formQuestionOptionID}
                checked={selectedOptionID === option.formQuestionOptionID}
                className="mt-[2px] h-[14px] w-[14px]"
                onChange={handleSelectOption}
              />
              <label className="text-[12px] text-n-500">{option.optionText}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[4px] flex gap-[4px]">
        {formQuestionSetQuestion?.formQuestionOptions?.map((option) => (
          <div
            key={option.formQuestionOptionID}
            className={`flex h-[30px] w-full items-center justify-center rounded ${
              selectedOptionID === option.formQuestionOptionID ? 'bg-n-700 text-n-100' : 'bg-b-300'
            }`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setSelectedOptionID(option.formQuestionOptionID)
            }}
          >
            {option.optionText}
          </div>
        ))}
      </div>

      <div className="mt-[4px]">
        {questionSetsToDisplay && questionSetsToDisplay.length > 0 ? (
          <div className="rounded bg-b-300 px-[4px]">
            {questionSetsToDisplay.map((qs) => (
              <div key={qs.formQuestionSetID}>
                {qs.formQuestionSetPosition === 1 && (
                  <NonEmptyQuestionSetDropzone
                    questionSet={formQuestionSet}
                    position={1}
                    dependsOnOptionID={selectedOptionID}
                    isFirstDropzone={true}
                  />
                )}
                <TemplateQuestionSet formQuestionSet={qs} />
                <NonEmptyQuestionSetDropzone
                  questionSet={formQuestionSet}
                  position={qs.formQuestionSetPosition + 1}
                  dependsOnOptionID={selectedOptionID}
                  isLastDropzone={questionSetsToDisplay.length === qs.formQuestionSetPosition}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyQuestionSetDropzone
            questionSet={formQuestionSet}
            dependsOnOptionID={selectedOptionID}
          />
        )}
      </div>
    </div>
  )
}
