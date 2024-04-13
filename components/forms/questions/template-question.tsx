'use client'

import { useEffect, useRef, useState } from 'react'
import { TbEdit } from 'react-icons/tb'

import { TemplateQuestionType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionActions from '@/hooks/template/use-question-actions'
import TemplateQuestionMenuButton from './template-question-menu-button'
import TextInputQuestion from './text-input-question/text-input-question'
import TextareaQuestion from './textarea-question/textarea-question'
import SelectQuestion from './select-question/select-question'
import DateInputQuestion from './date-input-question/date-input-question'
import RadioQuestion from './radio-question/radio-question'
import CheckboxQuestion from './checkbox-question/checkbox-question'
import {
  isCheckboxQuestionType,
  isDateInputQuestionType,
  isDocumentQuestionType,
  isRadioQuestionType,
  isSelectQuestionType,
  isTextInputQuestionType,
  isTextareaQuestionType,
} from '@/lib/types/qusetion'
import DocumentQuestion from './document-question/document-question'

interface TemplateQuestionProps {
  question: TemplateQuestionType
}

export default function TemplateQuestion({ question }: TemplateQuestionProps) {
  const { setSelectedQuestionSetId, selectedQuestionId, setSelectedQuestionId } =
    useTemplateEditContext()
  const { removeQuestionFromSection } = useQuestionActions()

  const questionEditRef = useRef<HTMLDivElement>(null)

  const isQuestionSelected = selectedQuestionId === question.id

  function handleClickDeleteQuestion() {
    removeQuestionFromSection(question.id)
  }

  function handleClickQuestion(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedQuestionSetId('')
    setSelectedQuestionId(question.id)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (questionEditRef.current && !questionEditRef.current.contains(e.target as Node)) {
        setSelectedQuestionId('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setSelectedQuestionId])

  return (
    <div
      className={`group rounded bg-n-100 text-[14px] ${isQuestionSelected ? 'border-[1px] border-n-700 p-[5px]' : 'p-[6px]'}`}
      ref={questionEditRef}
      onClick={handleClickQuestion}
    >
      <div className="flex justify-between">
        <TemplateQuestionPrompt question={question} />
        <TemplateQuestionMenuButton onClickDelete={handleClickDeleteQuestion} />
      </div>
      {isTextInputQuestionType(question) ? (
        <TextInputQuestion question={question} readOnly={true} />
      ) : isTextareaQuestionType(question) ? (
        <TextareaQuestion question={question} readOnly={true} />
      ) : isSelectQuestionType(question) ? (
        <SelectQuestion question={question} readOnly={true} />
      ) : isDateInputQuestionType(question) ? (
        <DateInputQuestion question={question} readOnly={true} />
      ) : isRadioQuestionType(question) ? (
        <RadioQuestion question={question} readOnly={true} />
      ) : isCheckboxQuestionType(question) ? (
        <CheckboxQuestion question={question} readOnly={true} />
      ) : isDocumentQuestionType(question) ? (
        <DocumentQuestion question={question} readOnly={true} />
      ) : null}
    </div>
  )
}

interface TemplateQuestionPromptProps {
  question: TemplateQuestionType
}

function TemplateQuestionPrompt({ question }: TemplateQuestionPromptProps) {
  const [isEditing, setIsEditing] = useState(false)

  function handleClickEditPrompt(e: React.MouseEvent<SVGElement>) {
    e.stopPropagation()
    setIsEditing(true)
    console.log('Edit prompt')
  }

  function handleClickEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsEditing(false)
    }
  }

  return isEditing ? (
    <div>
      <input
        type="text"
        className="w-full cursor-default rounded-sm border-[1px] border-n-400 bg-n-100 p-[4px] px-[6px] text-[12px] focus:outline-none"
        defaultValue={question.prompt}
        onKeyDown={handleClickEnter}
      />
    </div>
  ) : (
    <div className="group/title relative ">
      <div className="group/title-hover:opacity-100 mb-[4px] cursor-default pr-[24px]">
        {question.prompt}
      </div>
      <div className="absolute right-0 top-0 cursor-pointer opacity-0 transition-opacity duration-100 group-hover/title:opacity-100">
        <TbEdit className="h-[22px] w-[22px]" onClick={handleClickEditPrompt} />
      </div>
    </div>
  )
}
