'use client'

import { useState } from 'react'

import { FormQuestionSetType, FormQuestionSetTypes } from '@/lib/types/form'
import { QuestionTypes, RadioQuestionType } from '@/lib/types/qusetion'
import { generateRandomID } from '@/lib/utils/id'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionSetActions from '@/hooks/form-template/use-question-set-actions'

export default function EmptySectionDropzone() {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { selectedFormSectionID } = useFormTemplateEditContext()
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { createFormQuestionSet } = useQuestionSetActions()

  const isDropAllowed = isDraggedOver && draggedObject?.type === 'questionSet'

  const customDashedBorderStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='${isDraggedOver ? (isDropAllowed ? '%23666666FF' : '%23B1B2B2FF') : '%23B1B2B2FF'}' stroke-width='${isDropAllowed ? '3' : '2'}' stroke-dasharray='5' stroke-dashoffset='54' stroke-linecap='square'/%3e%3c/svg%3e")`,
    borderRadius: '6px',
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDraggedOver(true)
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDraggedOver(false)
  }

  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDraggedOver(false)
    if (isDropAllowed) {
      const newQuestionSet: Partial<FormQuestionSetType> = {
        formQuestionSetType: draggedObject.object.type,
        formQuestionSetPosition: 1,
        formSectionID: selectedFormSectionID,
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
      const { error } = await createFormQuestionSet({ newFormQuestionSet: newQuestionSet })
      if (error) {
        console.error(error)
      }
      setDraggedObject(null)
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (!isDropAllowed) {
      e.dataTransfer.dropEffect = 'none'
    }
  }

  return (
    <div
      className={`flex h-[150px] items-center justify-center font-medium text-n-600 transition duration-75 ${isDraggedOver ? (isDropAllowed ? 'text-n-700' : 'bg-n-300/50 text-n-700/50') : ''}`}
      style={customDashedBorderStyle}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      Drag a Question Type Here
    </div>
  )
}
