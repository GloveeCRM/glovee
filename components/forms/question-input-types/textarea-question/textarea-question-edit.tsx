'use client'

import { useEffect, useRef } from 'react'

import { TemplateQuestionType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionActions from '@/hooks/template/use-question-actions'
import TextareaQuestionEditMenuButton from './textarea-question-edit-menu-button'

interface TextareaQuestionEditProps {
  question: TemplateQuestionType
}

export default function TextareaQuestionEdit({ question }: TextareaQuestionEditProps) {
  const { setSelectedQuestionSetId, selectedQuestionId, setSelectedQuestionId } =
    useTemplateEditContext()

  const { removeQuestionFromSection } = useQuestionActions()

  const textareaQuestionEditRef = useRef<HTMLDivElement>(null)

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
      if (
        textareaQuestionEditRef.current &&
        !textareaQuestionEditRef.current.contains(e.target as Node)
      ) {
        setSelectedQuestionId('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className={`group rounded bg-n-100 text-[14px] ${isQuestionSelected ? 'border-[1px] border-n-700 p-[5px]' : 'p-[6px]'}`}
      ref={textareaQuestionEditRef}
      onClick={handleClickQuestion}
    >
      <div className="flex justify-between">
        <div className="mb-[4px]">{question.prompt}</div>
        <TextareaQuestionEditMenuButton
          onClickDelete={handleClickDeleteQuestion}
          display={isQuestionSelected}
        />
      </div>
      <textarea
        className="w-full rounded border-[1px] border-n-400 bg-n-100 p-[4px] px-[6px] text-[12px] focus:outline-none"
        placeholder="Type your answer here..."
        readOnly
        rows={3}
      />
    </div>
  )
}
