'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { TemplateQuestionSetType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'

interface NonEmptySectionDropzoneProps {
  position: number
  questionSet: TemplateQuestionSetType
}

export default function NonEmptySectionDropzone({
  position,
  questionSet,
}: NonEmptySectionDropzoneProps) {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { selectedSectionId } = useTemplateEditContext()
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { getQuestionSetsInSection, createQuestionSetInSection } = useQuestionSetActions()

  const isDropAllowed = isDraggedOver && draggedObject?.type === 'questionSet'

  const isInQuestionSet = questionSet.questionSetId !== null

  const questionSetsInSection = getQuestionSetsInSection(selectedSectionId)

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
      console.log('Dropped', position)
      const newQuestionSet: TemplateQuestionSetType = {
        id: uuidv4(),
        type: draggedObject.object.type,
        position: position,
        sectionId: selectedSectionId,
        questionSetId: isInQuestionSet ? questionSet.questionSetId : null,
        questions: [],
      }
      createQuestionSetInSection(selectedSectionId, newQuestionSet)
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
