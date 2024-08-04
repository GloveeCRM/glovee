'use client'

import { useState } from 'react'

import { TemplateQuestionSetType, TemplateQuestionSetTypes } from '@/lib/types/template'
import { QuestionTypes, RadioQuestionType } from '@/lib/types/qusetion'
import { generateRandomID } from '@/lib/utils/id'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'

interface NonEmptySectionDropzoneProps {
  position: number
}

export default function NonEmptySectionDropzone({ position }: NonEmptySectionDropzoneProps) {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { selectedSectionID } = useTemplateEditContext()
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { getQuestionSetsInSection, createQuestionSetInSection } = useQuestionSetActions()

  const isDropAllowed = isDraggedOver && draggedObject?.type === 'questionSet'

  const questionSetsInSection = getQuestionSetsInSection(selectedSectionID)

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
      const questionSetID = generateRandomID()
      const newQuestionSet: TemplateQuestionSetType = {
        id: questionSetID,
        type: draggedObject.object.type,
        position: position,
        sectionID: selectedSectionID,
        questions: [],
      }
      if (newQuestionSet.type === TemplateQuestionSetTypes.DEPENDS_ON) {
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
            isRequired: false,
          },
          questionSetID: questionSetID,
          options: [],
        }
        newQuestionSet.questions = [newQuestion]
      }
      createQuestionSetInSection(selectedSectionID, newQuestionSet)
    }
    setDraggedObject(null)
  }

  const isTheFirstDropzone = position === 0
  const isTheLastDropzone = questionSetsInSection && questionSetsInSection.length === position

  return (
    <div
      className={`h-[8px] bg-blue-300 opacity-0 transition-opacity duration-75 ${isTheFirstDropzone ? 'mb-[2px] rounded-tl-full rounded-tr-full' : isTheLastDropzone ? 'mt-[2px] rounded-bl-full rounded-br-full' : 'my-[2px] rounded-full'} ${isDropAllowed && 'bg-blue-500 opacity-100'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  )
}
