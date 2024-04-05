'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { TemplateQuestion } from '@prisma/client'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionActions from '@/hooks/template/use-question-actions'

interface NonEmptyQuestionSetDropzoneProps {
  questionSetId: string
  questionSetType: string
  position: number
}

export default function NonEmptyQuestionSetDropzone({
  questionSetId,
  questionSetType,
  position,
}: NonEmptyQuestionSetDropzoneProps) {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { getQuestionsInQuestionSet, createQuestionInQuestionSet } = useQuestionActions()

  const isDropAllowed =
    isDraggedOver &&
    ((questionSetType === 'flat' && draggedObject?.type === 'question') ||
      ((questionSetType === 'loop' || questionSetType === 'dependsOn') &&
        draggedObject?.type === 'questionSet'))

  const questionsInQuestionSet = getQuestionsInQuestionSet(questionSetId)

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
      const question: TemplateQuestion = {
        id: uuidv4(),
        type: draggedObject.object.type,
        prompt: 'An Untitled Question',
        position: position,
        helperText: 'No helper text',
        questionSetId: questionSetId,
      }
      createQuestionInQuestionSet(questionSetId, question)
    }
    setDraggedObject(null)
  }

  const isTheFirstDropzone = position === 0
  const isTheLastDropzone = questionsInQuestionSet && questionsInQuestionSet.length === position

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
