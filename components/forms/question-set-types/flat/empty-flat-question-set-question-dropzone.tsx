'use client'

import { useState } from 'react'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'

export default function EmptyFlatQuestionSetQuestionDropzone() {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { selectedSectionId } = useTemplateEditContext()
  const { draggedObject, setDraggedObject } = useDragAndDropContext()

  const isDropAllowed = isDraggedOver && draggedObject?.type === 'question'

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
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (!isDropAllowed) {
      e.dataTransfer.dropEffect = 'none'
    }
  }

  return (
    <div
      className={`rounded border-[1px] border-dashed ${isDraggedOver ? (isDropAllowed ? 'border-n-700 bg-g-200 font-medium' : 'border-n-400 bg-g-200/70 text-n-500') : 'border-n-500 bg-g-200/80'}`}
    >
      <div
        className="flex h-[65px] items-center justify-center text-center text-[12px]"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        Drag an Input Type Here
      </div>
    </div>
  )
}
