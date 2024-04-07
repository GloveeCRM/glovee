'use client'

import { useState } from 'react'
import { v4 as uuid4 } from 'uuid'

import {
  TemplateQuestionSetType as TemplateQuestionSetTypes,
  TemplateQuestionType as TemplateQuestionTypes,
} from '@prisma/client'
import { TemplateQuestionSetType, TemplateQuestionType } from '@/lib/types/template'
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
        const isRadio = draggedObject.object.type === TemplateQuestionTypes.RADIO
        const isCheckbox = draggedObject.object.type === TemplateQuestionTypes.CHECKBOX

        const newQuestion: TemplateQuestionType = {
          id: uuid4(),
          type: draggedObject.object.type,
          prompt: 'An Untitled Question',
          position: position,
          helperText: 'No helper text',
          settings: isRadio
            ? {
                options: [
                  { position: 0, value: 'Option 1' },
                  { position: 1, value: 'Option 2' },
                ],
                display: 'block',
              }
            : isCheckbox
              ? {
                  options: [{ position: 0, value: 'Option 1' }],
                  display: 'block',
                }
              : {},
          questionSetId: questionSet.id,
        }
        createQuestionInQuestionSet(questionSet.id, newQuestion)
      } else if (isQuestionSetOverLoop || isQuestionSetOverDependsOn) {
        const newQuestionSet: TemplateQuestionSetType = {
          id: uuid4(),
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
