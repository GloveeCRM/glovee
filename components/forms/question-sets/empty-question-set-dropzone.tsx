'use client'

import { useState } from 'react'

import {
  FormQuestionOptionType,
  FormQuestionSettingsType,
  FormQuestionSetType,
  isConditionalQuestionSetType,
  isRepeatableQuestionSetType,
  isStaticQuestionSetType,
} from '@/lib/types/form'
import { FormQuestionType, FormQuestionTypes } from '@/lib/types/form'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionSetActions from '@/hooks/form-template/use-question-set-actions'
import useQuestionActions from '@/hooks/form-template/use-question-actions'

interface EmptyQuestionSetDropzoneProps {
  questionSet: FormQuestionSetType
  dependsOnOptionID?: number
}

export default function EmptyQuestionSetDropzone({
  questionSet,
  dependsOnOptionID,
}: EmptyQuestionSetDropzoneProps) {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { createFormQuestionSet } = useQuestionSetActions()
  const { createFormQuestion } = useQuestionActions()

  const isStatic = isStaticQuestionSetType(questionSet)
  const isRepeatable = isRepeatableQuestionSetType(questionSet)
  const isConditional = isConditionalQuestionSetType(questionSet)

  const isQuestionOverStatic = isStatic && draggedObject?.type === 'question'
  const isQuestionSetOverRepeatable = isRepeatable && draggedObject?.type === 'questionSet'
  const isQuestionSetOverConditional = isConditional && draggedObject?.type === 'questionSet'

  const isDropAllowed =
    isDraggedOver &&
    (isQuestionOverStatic || isQuestionSetOverRepeatable || isQuestionSetOverConditional)

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDraggedOver(true)
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDraggedOver(false)
  }

  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (isDropAllowed) {
      if (isQuestionOverStatic) {
        const isRadio = draggedObject.object.type === FormQuestionTypes.RADIO
        const isCheckbox = draggedObject.object.type === FormQuestionTypes.CHECKBOX
        const isSelect = draggedObject.object.type === FormQuestionTypes.SELECT

        let newQuestion: Partial<FormQuestionType> = {
          formQuestionSetID: questionSet.formQuestionSetID,
          formQuestionPrompt: 'Question',
          formQuestionType: draggedObject.object.type,
          formQuestionPosition: 1,
          formQuestionSettings: {
            isRequired: false,
          } as FormQuestionSettingsType,
        }
        if (isSelect || isCheckbox || isRadio) {
          newQuestion.formQuestionOptions = [
            {
              optionText: 'Option 1',
              optionPosition: 1,
            },
          ] as FormQuestionOptionType[]
        }
        createFormQuestion({ newFormQuestion: newQuestion })
      } else {
        const newQuestionSet: Partial<FormQuestionSetType> = {
          formQuestionSetType: draggedObject.object.type,
          formQuestionSetPosition: 1,
          formSectionID: questionSet.formSectionID,
          parentFormQuestionSetID: questionSet.formQuestionSetID,
          dependsOnOptionID,
        }

        const { error } = await createFormQuestionSet({ newFormQuestionSet: newQuestionSet })
        if (error) {
          console.error(error)
        }
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
    static: {
      allowed: 'border-n-700 bg-g-200 font-medium',
      notAllowed: 'border-n-400 bg-g-200/70 text-n-500',
      neutral: 'border-n-500 bg-g-200/80',
    },
    repeatable: {
      allowed: 'border-n-700 bg-r-200 font-medium',
      notAllowed: 'border-n-400 bg-r-200/70 text-n-500',
      neutral: 'border-n-500 bg-r-200/80',
    },
    conditional: {
      allowed: 'border-n-700 bg-b-300 font-medium',
      notAllowed: 'border-n-400 bg-b-300/70 text-n-500',
      neutral: 'border-n-500 bg-b-300/80',
    },
  }

  const text = isStatic ? 'Drag an Input Type Here' : 'Drag a Question Set Type Here'

  return (
    <div
      className={`rounded border-[1px] border-dashed ${isDraggedOver ? (isDropAllowed ? questionSetClasses[questionSet.formQuestionSetType].allowed : questionSetClasses[questionSet.formQuestionSetType].notAllowed) : questionSetClasses[questionSet.formQuestionSetType].neutral}`}
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
