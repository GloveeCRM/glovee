'use client'

import { useEffect, useRef } from 'react'

import { TemplateQuestionSetType as TemplateQuestionSetTypes } from '@prisma/client'
import { TemplateQuestionSetType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import NonEmptySectionDropzone from '@/components/admin/template/edit/non-empty-section-dropzone'
import TemplateQuestionSetMenuButton from './template-question-set-menu-button'
import FlatQuestionSetEdit from './flat/flat-question-set-edit'

interface TemplateQuestionSetProps {
  questionSet: TemplateQuestionSetType
}

export default function TemplateQuestionSet({ questionSet }: TemplateQuestionSetProps) {
  const { selectedQuestionSetId, setSelectedQuestionSetId } = useTemplateEditContext()
  const { removeQuestionSetFromSection } = useQuestionSetActions()

  const isQuestionSetSelected = selectedQuestionSetId === questionSet.id

  const templateQuestionSetRef = useRef<HTMLDivElement>(null)

  const questions = questionSet.questions || []

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
    <div>
      {showDropzoneBefore && <NonEmptySectionDropzone position={questionSet.position} />}
      <div
        className="group/questionSet relative rounded"
        onClick={handleClickQuestionSet}
        ref={templateQuestionSetRef}
      >
        <TemplateQuestionSetMenuButton onClickDelete={handleClickDeleteQuestionSet} />
        {questionSet.type === TemplateQuestionSetTypes.FLAT ? (
          <FlatQuestionSetEdit
            questionSetId={questionSet.id}
            questions={questions}
            selected={isQuestionSetSelected}
          />
        ) : (
          <div>TemplateQuestionSet</div>
        )}
      </div>
      <NonEmptySectionDropzone position={questionSet.position + 1} />
    </div>
  )
}
