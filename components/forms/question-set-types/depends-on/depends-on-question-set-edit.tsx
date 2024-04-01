'use client'

import SectionQuestionSetDropzone from '@/components/admin/template/edit/section-question-set-dropzone'
import { TemplateQuestionSetType } from '@/lib/types/template'
import DependsOnQuestionSetEditMenuButton from './depends-on-question-set-edit-menu-button'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import { useEffect, useRef } from 'react'

interface DependsOnQuestionSetEditProps {
  questionSet: TemplateQuestionSetType
}

export default function DependsOnQuestionSetEdit({ questionSet }: DependsOnQuestionSetEditProps) {
  const { selectedQuestionSetId, setSelectedQuestionSetId } = useTemplateEditContext()
  const { removeQuestionSetFromSection } = useQuestionSetActions()

  const isQuestionSetSelected = selectedQuestionSetId === questionSet.id

  const dependsOnQuestionSetRef = useRef<HTMLDivElement>(null)

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
      if (
        dependsOnQuestionSetRef.current &&
        !dependsOnQuestionSetRef.current.contains(e.target as Node)
      ) {
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
        className={`group/questionSet rounded bg-b-500 ${isQuestionSetSelected ? 'border-[3px] border-b-700 p-[5px] pt-[13px]' : 'p-[8px] pt-[16px]'}`}
        onClick={handleClickQuestionSet}
        ref={dependsOnQuestionSetRef}
      >
        <DependsOnQuestionSetEditMenuButton onClickDelete={handleClickDeleteQuestionSet} />
        {questions && questions.length > 0 ? (
          <div>{questions[0].position}</div>
        ) : (
          <div>Empty dependsOn question set</div>
        )}
      </div>
      <SectionQuestionSetDropzone position={questionSet.position + 1} />
    </div>
  )
}
