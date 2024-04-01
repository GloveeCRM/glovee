'use client'

import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import { useState } from 'react'

export default function EmptySectionQuestionSetDropzone() {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { draggedObject, setDraggedObject } = useDragAndDropContext()

  const isDropAllowed = isDraggedOver && draggedObject?.type === 'questionSet'

  const customDashedBorderStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='${isDropAllowed ? '%234D4D4DFF' : '%23666666FF'}' stroke-width='${isDropAllowed ? '3' : '2'}' stroke-dasharray='5' stroke-dashoffset='54' stroke-linecap='square'/%3e%3c/svg%3e")`,
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
    console.log('drop')
  }

  return (
    <div
      className={`flex h-[150px] items-center justify-center font-medium text-n-600 transition duration-75 ${isDraggedOver ? (isDropAllowed ? 'text-n-700' : 'bg-r-500/30 text-r-500 opacity-50') : ''}`}
      style={customDashedBorderStyle}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      Drag a Question Type Here
    </div>
  )
}
