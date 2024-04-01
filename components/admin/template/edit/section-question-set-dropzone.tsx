'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import { TemplateQuestionSetType } from '@/lib/types/template'

interface SectionQuestionSetDropzoneProps {
  position: number
}

export default function SectionQuestionSetDropzone({ position }: SectionQuestionSetDropzoneProps) {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { selectedSectionId } = useTemplateEditContext()
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { getQuestionSetsInSection, createQuestionSetInSection } = useQuestionSetActions()

  const isDropAllowed = isDraggedOver && draggedObject?.type === 'questionSet'

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
      const questionSet: TemplateQuestionSetType = {
        id: uuidv4(),
        sectionId: selectedSectionId,
        position: position,
        type: draggedObject.object.type,
        questions: [],
      }
      createQuestionSetInSection(selectedSectionId, questionSet)
      setDraggedObject(null)
    }
  }

  const isTheFirstDropzone = position === 0
  const isTheLastDropzone = questionSetsInSection && questionSetsInSection.length === position

  return (
    <div
      className={`my-[2px] h-[8px] bg-blue-300 opacity-100 transition-opacity duration-75 ${isTheFirstDropzone ? 'rounded-tl-full rounded-tr-full' : isTheLastDropzone ? 'rounded-bl-full rounded-br-full' : 'rounded-full'} ${isDropAllowed && 'bg-blue-500 opacity-100'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  )
}
