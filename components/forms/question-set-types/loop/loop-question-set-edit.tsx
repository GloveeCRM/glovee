'use client'

import { useEffect, useRef } from 'react'
import { FiPlus } from 'react-icons/fi'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import { TemplateQuestionSetType } from '@/lib/types/template'
import LoopQuestionSetEditQuestionWrapper from './loop-question-set-edit-question-wrapper'
import LoopQuestionSetEditMenuButton from './loop-question-set-edit-menu-button'
import EmptyLoopQuestionSetQuestionDropzone from './empty-loop-question-set-question-dropzone'
import SectionQuestionSetDropzone from '@/components/admin/template/edit/section-question-set-dropzone'

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

  const showQuestionSetDropzoneBefore = questionSet.position === 0

  return (
    <div>
      {showQuestionSetDropzoneBefore && (
        <SectionQuestionSetDropzone position={questionSet.position} />
      )}
      <div
        className={`group/questionSet rounded bg-r-500 ${isQuestionSetSelected ? 'border-[3px] border-r-700 p-[5px] pt-[13px]' : 'p-[8px] pt-[16px]'}`}
        onClick={handleClickQuestionSet}
        ref={loopQuestionSetRef}
      >
        <LoopQuestionSetEditMenuButton onClickDelete={handleClickDeleteQuestionSet} />
        {questions && questions.length > 0 ? (
          <LoopQuestionSetEditQuestionWrapper questions={questions} />
        ) : (
          <EmptyLoopQuestionSetQuestionDropzone />
        )}
        <LoopQuestionSetEditFooter />
      </div>
      <SectionQuestionSetDropzone position={questionSet.position + 1} />
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
