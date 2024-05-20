'use client'

import { useEffect, useRef } from 'react'

import { TemplateQuestionType as TemplateQuestionTypes } from '@prisma/client'
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
  const { setSelectedQuestionSetID, selectedQuestionID, setSelectedQuestionID } =
    useTemplateEditContext()
  const { removeQuestionFromSection } = useQuestionActions()

  const questionEditRef = useRef<HTMLDivElement>(null)

  const isQuestionSelected = selectedQuestionID === question.id

  function handleClickDeleteQuestion() {
    removeQuestionFromSection(question.id)
  }

  function handleClickQuestion(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedQuestionSetID(0)
    setSelectedQuestionID(question.id)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (questionEditRef.current && !questionEditRef.current.contains(e.target as Node)) {
        setSelectedQuestionID(0)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setSelectedQuestionID])

  return (
    <div
      className={`group rounded bg-n-100 text-[14px] ${isQuestionSelected ? 'border-[1px] border-n-700 p-[5px]' : 'p-[6px]'}`}
      ref={questionEditRef}
      onClick={handleClickQuestion}
    >
      <div className="flex justify-between">
        <div className="mb-[4px]">{question.prompt}</div>
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
