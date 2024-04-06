'use client'

import { useEffect, useRef } from 'react'

import { TemplateQuestionSetType as TemplateQuestionSetTypes } from '@prisma/client'
import { TemplateQuestionSetType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import NonEmptySectionDropzone from '@/components/admin/template/edit/non-empty-section-dropzone'
import TemplateQuestionSetMenuButton from './template-question-set-menu-button'
import FlatQuestionSetEdit from './flat/flat-question-set-edit'
import LoopQuestionSetEdit from './loop/loop-question-set-edit'
import DependsOnQuestionSetEdit from './depends-on/depends-on-question-set-edit'

interface TemplateQuestionSetProps {
  questionSet: TemplateQuestionSetType
}

export default function TemplateQuestionSet({ questionSet }: TemplateQuestionSetProps) {
  const { selectedQuestionSetId, setSelectedQuestionSetId } = useTemplateEditContext()
  const { removeQuestionSetFromSection } = useQuestionSetActions()

  const isQuestionSetSelected = selectedQuestionSetId === questionSet.id

  const templateQuestionSetRef = useRef<HTMLDivElement>(null)

  const questions = questionSet.questions || []

  const isFlat = questionSet.type === TemplateQuestionSetTypes.FLAT
  const isLoop = questionSet.type === TemplateQuestionSetTypes.LOOP
  const isDependsOn = questionSet.type === TemplateQuestionSetTypes.DEPENDS_ON

  function handleClickQuestionSet(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedQuestionSetId(questionSet.id)
  }

  function handleClickDeleteQuestionSet() {
    removeQuestionSetFromSection(questionSet.id)
    setSelectedQuestionSetId('')
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        templateQuestionSetRef.current &&
        !templateQuestionSetRef.current.contains(e.target as Node)
      ) {
        setSelectedQuestionSetId('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showDropzoneBefore = questionSet.position === 0

  return (
    <div className="py-[2px]">
      {showDropzoneBefore && (
        <NonEmptySectionDropzone position={questionSet.position} questionSet={questionSet} />
      )}
      <div
        className="group/questionSet relative rounded"
        onClick={handleClickQuestionSet}
        ref={templateQuestionSetRef}
      >
        <TemplateQuestionSetMenuButton onClickDelete={handleClickDeleteQuestionSet} />
        {isFlat ? (
          <FlatQuestionSetEdit questionSet={questionSet} selected={isQuestionSetSelected} />
        ) : isLoop ? (
          <LoopQuestionSetEdit questionSet={questionSet} selected={isQuestionSetSelected} />
        ) : isDependsOn ? (
          <DependsOnQuestionSetEdit questionSet={questionSet} selected={isQuestionSetSelected} />
        ) : null}
      </div>
      <NonEmptySectionDropzone position={questionSet.position + 1} questionSet={questionSet} />
    </div>
  )
}
