'use client'

import { useState } from 'react'
import { v4 as uuid4 } from 'uuid'

import { TemplateQuestion } from '@prisma/client'
import { TemplateQuestionSetType } from '@/lib/types/template'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import useQuestionActions from '@/hooks/template/use-question-actions'

interface EmptyQuestionSetDropzone {
  questionSetId: string
  questionSetType: string
}

export default function EmptyQuestionSetDropzone({
  questionSetId,
  questionSetType,
}: EmptyQuestionSetDropzone) {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { createQuestionSetInSection } = useQuestionSetActions()
  const { createQuestionInQuestionSet } = useQuestionActions()

  const isQuestionOverFlat = questionSetType === 'flat' && draggedObject?.type === 'question'
  const isQuestionSetOverLoop = questionSetType === 'loop' && draggedObject?.type === 'questionSet'
  const isQuestionSetOverDependsOn =
    questionSetType === 'dependsOn' && draggedObject?.type === 'questionSet'

  const isDropAllowed =
    isDraggedOver && (isQuestionOverFlat || isQuestionSetOverLoop || isQuestionSetOverDependsOn)

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
    if (isDropAllowed) {
      if (isQuestionOverFlat) {
        const question: TemplateQuestion = {
          id: uuid4(),
          type: draggedObject.object.type,
          prompt: 'An Untitled Question',
          position: 0,
          helperText: 'No helper text',
          questionSetId: questionSetId,
        }
        createQuestionInQuestionSet(questionSetId, question)
      } else if (isQuestionSetOverLoop || isQuestionSetOverDependsOn) {
      }
    }
    setDraggedObject(null)
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
