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
        <div className="mb-[4px]">{question.prompt}</div>
        <TemplateQuestionMenuButton onClickDelete={handleClickDeleteQuestion} />
      </div>
      {question.type === TemplateQuestionTypes.TEXT_INPUT ? (
        <TextInputQuestion question={question} readOnly={true} />
      ) : question.type === TemplateQuestionTypes.TEXTAREA ? (
        <TextareaQuestion question={question} readOnly={true} />
      ) : question.type === TemplateQuestionTypes.SELECT ? (
        <SelectQuestion question={question} readOnly={true} />
      ) : null}
    </div>
  )
}
