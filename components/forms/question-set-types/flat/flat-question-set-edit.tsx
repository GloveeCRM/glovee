'use client'

import { useEffect, useRef } from 'react'

import { TemplateQuestionSetType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import FlatQuestionSetEditQuestionWrapper from './flat-question-set-edit-question-wrapper'
import EmptyFlatQuestionSetQuestionDropzone from './empty-flat-question-set-question-dropzone'
import FlatQuestionSetEditMenuButton from './flat-question-set-edit-menu-button'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'

interface FlatQuestionSetEditProps {
  questionSet: TemplateQuestionSetType
}

export default function FlatQuestionSetEdit({ questionSet }: FlatQuestionSetEditProps) {
  const { selectedQuestionSetId, setSelectedQuestionSetId } = useTemplateEditContext()
  const { removeQuestionSetFromSection } = useQuestionSetActions()

  const isQuestionSetSelected = selectedQuestionSetId === questionSet.id

  const flatQuestionSetRef = useRef<HTMLDivElement>(null)

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
      if (flatQuestionSetRef.current && !flatQuestionSetRef.current.contains(e.target as Node)) {
        setSelectedQuestionSetId('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className={`group/questionSet rounded bg-g-500 ${isQuestionSetSelected ? 'border-[3px] border-g-700 p-[5px] pt-[13px]' : 'p-[8px] pt-[16px]'}`}
      onClick={handleClickQuestionSet}
      ref={flatQuestionSetRef}
    >
      <FlatQuestionSetEditMenuButton onClickDelete={handleClickDeleteQuestionSet} />
      {questions ? (
        <FlatQuestionSetEditQuestionWrapper questions={questions} />
      ) : (
        <EmptyFlatQuestionSetQuestionDropzone />
      )}
    </div>
  )
}
