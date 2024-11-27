'use client'

import { useState } from 'react'

import { FormQuestionSetType, FormQuestionSetTypes } from '@/lib/types/form'
import { QuestionTypes, RadioQuestionType } from '@/lib/types/qusetion'
import { generateRandomID } from '@/lib/utils/id'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionSetActions from '@/hooks/form-template/use-question-set-actions'

interface NonEmptySectionDropzoneProps {
  position: number
  isFirstDropzone?: boolean
  isLastDropzone?: boolean
}

export default function NonEmptySectionDropzone({
  position,
  isFirstDropzone = false,
  isLastDropzone = false,
}: NonEmptySectionDropzoneProps) {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { selectedFormSectionQuestionSets, selectedFormSectionID } = useFormTemplateEditContext()
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { createFormQuestionSet } = useQuestionSetActions()

  const isDropAllowed = isDraggedOver && draggedObject?.type === 'questionSet'

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDraggedOver(true)
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDraggedOver(false)
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (!isDropAllowed) {
      e.dataTransfer.dropEffect = 'none'
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDraggedOver(false)
    if (isDropAllowed) {
      const newQuestionSet: Partial<FormQuestionSetType> = {
        formSectionID: selectedFormSectionID,
        formQuestionSetType: draggedObject.object.type,
        formQuestionSetPosition: position,
      }
      if (newQuestionSet.formQuestionSetType === FormQuestionSetTypes.CONDITIONAL) {
        const questionID = generateRandomID()
        const newQuestion: RadioQuestionType = {
          id: questionID,
          type: QuestionTypes.RADIO,
          prompt: 'Question Prompt',
          position: 0,
          settings: {
            display: 'inline',
            options: [
              { id: generateRandomID(), position: 0, value: 'Option 1' },
              { id: generateRandomID(), position: 1, value: 'Option 2' },
            ],
            defaultOptionID: 0,
          },
          questionSetID: questionSetID,
          isRequired: false,
          options: [],
        }
        newQuestionSet.questions = [newQuestion]
      }
      createFormQuestionSet({
        newFormQuestionSet: newQuestionSet,
      })
    }
    setDraggedObject(null)
  }

  return (
    <div
      className={`h-[8px] bg-blue-300 opacity-0 transition-opacity duration-75 ${isFirstDropzone ? 'mb-[2px] rounded-tl-full rounded-tr-full' : isLastDropzone ? 'mt-[2px] rounded-bl-full rounded-br-full' : 'my-[2px] rounded-full'} ${isDropAllowed && 'bg-blue-500 opacity-100'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  )
}
