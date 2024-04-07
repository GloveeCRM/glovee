'use client'

import { useState } from 'react'
import { v4 as uuid4 } from 'uuid'

import {
  TemplateQuestionSetType as TemplateQuestionSetTypes,
  TemplateQuestionType as TemplateQuestionTypes,
} from '@prisma/client'
import { TemplateQuestionSetType, TemplateQuestionType } from '@/lib/types/template'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import useQuestionActions from '@/hooks/template/use-question-actions'

interface EmptyQuestionSetDropzone {
  questionSet: TemplateQuestionSetType
}

export default function EmptyQuestionSetDropzone({ questionSet }: EmptyQuestionSetDropzone) {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { createQuestionSetInSection } = useQuestionSetActions()
  const { createQuestionInQuestionSet } = useQuestionActions()

  const isFlat = questionSet.type === TemplateQuestionSetTypes.FLAT
  const isLoop = questionSet.type === TemplateQuestionSetTypes.LOOP
  const isDependsOn = questionSet.type === TemplateQuestionSetTypes.DEPENDS_ON

  const isQuestionOverFlat = isFlat && draggedObject?.type === 'question'
  const isQuestionSetOverLoop = isLoop && draggedObject?.type === 'questionSet'
  const isQuestionSetOverDependsOn = isDependsOn && draggedObject?.type === 'questionSet'

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
        const isRadioOrCheckbox =
          draggedObject.object.type === TemplateQuestionTypes.RADIO ||
          draggedObject.object.type === TemplateQuestionTypes.CHECKBOX
        const question: TemplateQuestionType = {
          id: uuid4(),
          type: draggedObject.object.type,
          prompt: 'An Untitled Question',
          position: 0,
          helperText: 'No helper text',
          settings: isRadioOrCheckbox
            ? {
                options: [
                  { position: 0, value: 'Option 1' },
                  { position: 1, value: 'Option 2' },
                ],
                display: 'block',
              }
            : {},
          questionSetId: questionSet.id,
        }
        createQuestionInQuestionSet(questionSet.id, question)
      } else if (isQuestionSetOverLoop || isQuestionSetOverDependsOn) {
        const newQuestionSet: TemplateQuestionSetType = {
          id: uuid4(),
          type: draggedObject.object.type,
          position: 0,
          sectionId: questionSet.sectionId,
          questionSetId: questionSet.id,
        }
        createQuestionSetInSection(questionSet.sectionId, newQuestionSet)
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

  const questionSetClasses = {
    FLAT: {
      allowed: 'border-n-700 bg-g-200 font-medium',
      notAllowed: 'border-n-400 bg-g-200/70 text-n-500',
      neutral: 'border-n-500 bg-g-200/80',
    },
    LOOP: {
      allowed: 'border-n-700 bg-r-200 font-medium',
      notAllowed: 'border-n-400 bg-r-200/70 text-n-500',
      neutral: 'border-n-500 bg-r-200/80',
    },
    DEPENDS_ON: {
      allowed: 'border-n-700 bg-b-300 font-medium',
      notAllowed: 'border-n-400 bg-b-300/70 text-n-500',
      neutral: 'border-n-500 bg-b-300/80',
    },
  }

  const text = isFlat ? 'Drag an Input Type Here' : 'Drag a Question Set Type Here'

  return (
    <div
      className={`rounded border-[1px] border-dashed ${isDraggedOver ? (isDropAllowed ? questionSetClasses[questionSet.type].allowed : questionSetClasses[questionSet.type].notAllowed) : questionSetClasses[questionSet.type].neutral}`}
    >
      <div
        className="flex h-[65px] items-center justify-center text-center text-[12px]"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {isDropAllowed ? 'Drop it here' : text}
      </div>
    </div>
  )
}
