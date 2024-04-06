'use client'

import { useEffect, useRef } from 'react'

import { TemplateQuestionSetType, TemplateQuestionType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import NonEmptySectionDropzone from '@/components/admin/template/edit/non-empty-section-dropzone'
import TemplateQuestionSetMenuButton from './template-question-set-menu-button'
import FlatQuestionSetEditQuestionWrapper from './flat/flat-question-set-edit-question-wrapper'
import EmptyFlatQuestionSetQuestionDropzone from './flat/empty-flat-question-set-question-dropzone'

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
        <FlatQuestionSetEdit
          questions={questions}
          questionSetId={questionSet.id}
          selected={isQuestionSetSelected}
        />
      </div>
      <NonEmptySectionDropzone position={questionSet.position + 1} />
    </div>
  )
}

interface FlatQuestionSetEditProps {
  questions: TemplateQuestionType[]
  questionSetId: string
  selected: boolean
}

function FlatQuestionSetEdit({
  questions,
  questionSetId,
  selected = false,
}: FlatQuestionSetEditProps) {
  return (
    <div
      className={`rounded bg-g-500 ${selected ? 'border-[3px] border-g-700 p-[5px] pt-[13px]' : 'p-[8px] pt-[16px]'}`}
    >
      {questions && questions.length > 0 ? (
        <FlatQuestionSetEditQuestionWrapper questions={questions} />
      ) : (
        <EmptyFlatQuestionSetQuestionDropzone questionSetId={questionSetId} />
      )}
    </div>
  )
}
