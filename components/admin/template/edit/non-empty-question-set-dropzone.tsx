'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import {
  TemplateQuestion,
  TemplateQuestionSetType as TemplateQuestionSetTypes,
} from '@prisma/client'
import { TemplateQuestionSetType } from '@/lib/types/template'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionActions from '@/hooks/template/use-question-actions'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'

interface NonEmptyQuestionSetDropzoneProps {
  questionSet: TemplateQuestionSetType
  position: number
}

export default function NonEmptyQuestionSetDropzone({
  questionSet,
  position,
}: NonEmptyQuestionSetDropzoneProps) {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { getQuestionsInQuestionSet, createQuestionInQuestionSet } = useQuestionActions()
  const { createQuestionSetInSection } = useQuestionSetActions()

  const isFlat = questionSet.type === TemplateQuestionSetTypes.FLAT
  const isLoop = questionSet.type === TemplateQuestionSetTypes.LOOP
  const isDependsOn = questionSet.type === TemplateQuestionSetTypes.DEPENDS_ON

  const isQuestionOverFlat = isFlat && draggedObject?.type === 'question'
  const isQuestionSetOverLoop = isLoop && draggedObject?.type === 'questionSet'
  const isQuestionSetOverDependsOn = isDependsOn && draggedObject?.type === 'questionSet'

  const isDropAllowed =
    isDraggedOver && (isQuestionOverFlat || isQuestionSetOverLoop || isQuestionSetOverDependsOn)

  const questionsInQuestionSet = getQuestionsInQuestionSet(questionSet.id)

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
      if (isQuestionOverFlat) {
        const question: TemplateQuestion = {
          id: uuidv4(),
          type: draggedObject.object.type,
          prompt: 'An Untitled Question',
          position: position,
          helperText: 'No helper text',
          questionSetId: questionSet.id,
        }
        createQuestionInQuestionSet(questionSet.id, question)
      } else if (isQuestionSetOverLoop || isQuestionSetOverDependsOn) {
        const newQuestionSet: TemplateQuestionSetType = {
          id: uuidv4(),
          type: draggedObject.object.type,
          position: position,
          sectionId: questionSet.sectionId,
          questionSetId: questionSet.id,
        }
        createQuestionSetInSection(questionSet.sectionId, newQuestionSet)
      }
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
