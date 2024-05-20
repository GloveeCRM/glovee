'use client'

import { useState } from 'react'
import { v4 as uuid4 } from 'uuid'

import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import { TemplateQuestionSetType } from '@/lib/types/template'
import { generateRandomId } from '@/lib/utils/id'

export default function EmptySectionQuestionSetDropzone() {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { selectedSectionID } = useTemplateEditContext()
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { createQuestionSetInSection } = useQuestionSetActions()

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

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDraggedOver(false)
    if (isDropAllowed) {
      const questionSet: TemplateQuestionSetType = {
        id: generateRandomId(),
        type: draggedObject.object.type,
        position: 0,
        sectionID: selectedSectionID,
        questionSetID: null,
        questions: [],
      }
      createQuestionSetInSection(selectedSectionID, questionSet)
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
