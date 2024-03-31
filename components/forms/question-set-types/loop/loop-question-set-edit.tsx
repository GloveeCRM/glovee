'use client'

import { FiPlus } from 'react-icons/fi'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import { TemplateQuestionSetType } from '@/lib/types/template'
import { useEffect, useRef } from 'react'
import LoopQuestionSetEditQuestionWrapper from './loop-question-set-edit-question-wrapper'
import LoopQuestionSetEditMenuButton from './loop-question-set-edit-menu-button'

interface LoopQuestionSetEditProps {
  questionSet: TemplateQuestionSetType
}

export default function LoopQuestionSetEdit({ questionSet }: LoopQuestionSetEditProps) {
  const { selectedQuestionSetId, setSelectedQuestionSetId } = useTemplateEditContext()
  const { removeQuestionSetFromSection } = useQuestionSetActions()

  const isQuestionSetSelected = selectedQuestionSetId === questionSet.id

  const loopQuestionSetRef = useRef<HTMLDivElement>(null)

  const questions = questionSet.questions

  function handleClickQuestionSet() {
    setSelectedQuestionSetId(questionSet.id)
  }

  function handleClickDeleteQuestionSet() {
    removeQuestionSetFromSection(questionSet.id)
    setSelectedQuestionSetId('')
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (loopQuestionSetRef.current && !loopQuestionSetRef.current.contains(e.target as Node)) {
        setSelectedQuestionSetId('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className={`group/questionSet rounded bg-r-500 ${isQuestionSetSelected ? 'border-[3px] border-r-700 p-[5px] pt-[13px]' : 'p-[8px] pt-[16px]'}`}
      onClick={handleClickQuestionSet}
      ref={loopQuestionSetRef}
    >
      <LoopQuestionSetEditMenuButton onClickDelete={handleClickDeleteQuestionSet} />
      {questions ? (
        <LoopQuestionSetEditQuestionWrapper questions={questions} />
      ) : (
        <div>EmptyLoopQuestionSetQuestionDropzone</div>
      )}
      <LoopQuestionSetEditFooter />
    </div>
  )
}

function LoopQuestionSetEditFooter() {
  return (
    <div className="mx-auto mt-[6px] flex w-fit items-center text-[14px] font-medium">
      <FiPlus className="h-[18px] w-[18px]" />
      <span>Add another one</span>
    </div>
  )
}
