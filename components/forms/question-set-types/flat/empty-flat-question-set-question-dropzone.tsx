'use client'

import { useState } from 'react'
import { v4 as uuid4 } from 'uuid'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionActions from '@/hooks/template/use-question-actions'
import { TemplateQuestion } from '@prisma/client'

export default function EmptyFlatQuestionSetQuestionDropzone() {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { selectedSectionId } = useTemplateEditContext()
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { createQuestionInQuestionSet } = useQuestionActions()

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
    if (isDropAllowed) {
      const question: TemplateQuestion = {
        id: uuid4(),
        type: draggedObject.object.type,
        prompt: 'An Untitled Question',
        position: 0,
        helperText: 'No helper text',
        questionSetId: selectedSectionId,
      }
      createQuestionInQuestionSet(selectedSectionId, question)
    }
    setDraggedObject(null)
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
