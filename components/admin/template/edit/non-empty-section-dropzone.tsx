'use client'

import { useState } from 'react'

import { TemplateQuestionSetType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import { generateRandomId } from '@/lib/utils/id'

interface NonEmptySectionDropzoneProps {
  position: number
  questionSet: TemplateQuestionSetType
}

export default function NonEmptySectionDropzone({
  position,
  questionSet,
}: NonEmptySectionDropzoneProps) {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { selectedSectionID } = useTemplateEditContext()
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { getQuestionSetById, getQuestionSetsInSection, createQuestionSetInSection } =
    useQuestionSetActions()

  const isDropAllowed = isDraggedOver && draggedObject?.type === 'questionSet'

  const isInQuestionSet = questionSet.questionSetID !== null

  const questionSetsInSection = getQuestionSetsInSection(selectedSectionID)
  const questionSetsInQuestionSet =
    questionSet.questionSetID && getQuestionSetById(questionSet.questionSetID)?.questionSets

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
      const newQuestionSet: TemplateQuestionSetType = {
        id: generateRandomId(),
        type: draggedObject.object.type,
        position: position,
        sectionID: selectedSectionID,
        questionSetID: isInQuestionSet ? questionSet.questionSetID : null,
        questions: [],
      }
      createQuestionSetInSection(selectedSectionID, newQuestionSet)
    }
    setDraggedObject(null)
  }

  const isTheFirstDropzone = position === 0
  const isTheLastDropzone = isInQuestionSet
    ? questionSetsInQuestionSet && questionSetsInQuestionSet.length === position
    : questionSetsInSection && questionSetsInSection.length === position

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
