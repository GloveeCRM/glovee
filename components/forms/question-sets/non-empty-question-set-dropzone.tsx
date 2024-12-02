'use client'

import { useState } from 'react'

import {
  FormQuestionOptionType,
  FormQuestionSettingsType,
  FormQuestionSetType,
  FormQuestionTypes,
  FormQuestionType,
  isConditionalQuestionSetType,
  isRepeatableQuestionSetType,
  isStaticQuestionSetType,
} from '@/lib/types/form'
import { RadioQuestionType } from '@/lib/types/qusetion'
import { generateRandomID } from '@/lib/utils/id'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionSetActions from '@/hooks/form-template/use-question-set-actions'
import useQuestionActions from '@/hooks/form-template/use-question-actions'

interface NonEmptyQuestionSetDropzoneProps {
  questionSet: FormQuestionSetType
  position: number
  dependsOn?: number
  isFirstDropzone?: boolean
  isLastDropzone?: boolean
}

export default function NonEmptyQuestionSetDropzone({
  questionSet,
  position,
  dependsOn,
  isFirstDropzone = false,
  isLastDropzone = false,
}: NonEmptyQuestionSetDropzoneProps) {
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

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (!isDropAllowed) {
      e.dataTransfer.dropEffect = 'none'
    }
  }

  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDraggedOver(false)
    if (isDropAllowed) {
      if (isQuestionOverStatic) {
        const isRadio = draggedObject.object.type === FormQuestionTypes.RADIO
        const isCheckbox = draggedObject.object.type === FormQuestionTypes.CHECKBOX
        const isSelect = draggedObject.object.type === FormQuestionTypes.SELECT

        let newQuestion: Partial<FormQuestionType> = {
          formQuestionSetID: questionSet.formQuestionSetID,
          formQuestionPrompt: 'Question',
          formQuestionType: draggedObject.object.type,
          formQuestionPosition: position,
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
          formQuestionSetPosition: position,
          formSectionID: questionSet.formSectionID,
          parentFormQuestionSetID: questionSet.formQuestionSetID,
        }

        if (isConditional) {
          newQuestionSet.dependsOnOptionID = dependsOn
        }

        if (isConditional) {
          const newQuestionID = generateRandomID()
          const newQuestion: RadioQuestionType = {
            id: newQuestionID,
            type: QuestionTypes.RADIO,
            prompt: 'Question Prompt',
            position: 0,
            settings: {
              display: 'inline',
              options: [
                { id: generateRandomID(), position: 0, value: 'Option 1' },
                { id: generateRandomID(), position: 1, value: 'Option 2' },
              ],
              defaultOptionID: 0,
            },
            questionSetID: newQuestionSetID,
            isRequired: false,
            options: [],
          }
          newQuestionSet.questions = [newQuestion]
        }
        const { error } = await createFormQuestionSet({ newFormQuestionSet: newQuestionSet })
        if (error) {
          console.error(error)
        }
      }
      setDraggedObject(null)
    }
  }

  return (
    <div
      className={`h-[8px] bg-blue-300 opacity-0 transition-opacity duration-75 ${isFirstDropzone ? 'mb-[2px] rounded-tl-full rounded-tr-full' : isLastDropzone ? 'mt-[2px] rounded-bl-full rounded-br-full' : 'my-[2px] rounded-full'} ${isDropAllowed && 'bg-blue-500 opacity-100'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  )
}
