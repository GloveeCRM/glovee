'use client'

import NonEmptySectionDropzone from '@/components/admin/template/edit/non-empty-section-dropzone'
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
      {showQuestionSetDropzoneBefore && <NonEmptySectionDropzone position={questionSet.position} />}
      <div
        className={`group/questionSet rounded bg-b-500 ${isQuestionSetSelected ? 'border-[3px] border-b-700 p-[5px] pt-[13px]' : 'p-[8px] pt-[16px]'}`}
        onClick={handleClickQuestionSet}
        ref={dependsOnQuestionSetRef}
      >
        <DependsOnQuestionSetEditMenuButton onClickDelete={handleClickDeleteQuestionSet} />
        <div className="rounded border-[1px] border-dashed border-n-500 bg-n-200 p-[4px]">
          <p className="text-[14px]">Question Prompt</p>
          <div className="flex flex-col">
            <div className="flex items-center gap-[4px]">
              <input type="radio" name="dependsOn" value="yes" />
              <label className="text-[12px]">Yes</label>
            </div>
            <div className="flex items-center gap-[4px]">
              <input type="radio" name="dependsOn" value="no" />
              <label className="text-[12px]">No</label>
            </div>
          </div>
        </div>
        <div className="mt-[4px] flex gap-[4px]">
          <div className="flex h-[30px] w-full items-center justify-center rounded bg-n-400">
            Yes
          </div>
          <div className="flex h-[30px] w-full items-center justify-center rounded bg-n-600 text-n-100">
            No
          </div>
        </div>
        {questions && questions.length > 0 ? (
          <div>{questions[0].position}</div>
        ) : (
          <div>Empty dependsOn question set</div>
        )}
      </div>
      <NonEmptySectionDropzone position={questionSet.position + 1} />
    </div>
  )
}
