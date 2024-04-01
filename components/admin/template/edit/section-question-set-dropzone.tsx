'use client'

import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import { useState } from 'react'

export default function SectionQuestionSetDropzone() {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { draggedObject, setDraggedObject } = useDragAndDropContext()

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
      setDraggedObject(null)
    }
  }

  return (
    <div
      className={`my-[2px] h-[8px] rounded-full bg-blue-300 opacity-0 transition-opacity duration-75 ${isDraggedOver && isDropAllowed && 'bg-blue-500 opacity-100'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  )
}
