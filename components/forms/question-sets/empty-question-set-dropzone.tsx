'use client'

import { useState } from 'react'

import { TemplateQuestionSetType, TemplateQuestionSetTypes } from '@/lib/types/template'
import { QuestionType, QuestionTypes, RadioQuestionType } from '@/lib/types/qusetion'
import { generateRandomID } from '@/lib/utils/id'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import useQuestionActions from '@/hooks/template/use-question-actions'
import { FormQuestionSetType, FormQuestionSetTypes } from '@/lib/types/form'

interface EmptyQuestionSetDropzoneProps {
  questionSet: FormQuestionSetType
  dependsOn?: number
}

export default function EmptyQuestionSetDropzone({
  questionSet,
  dependsOn,
}: EmptyQuestionSetDropzoneProps) {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { createQuestionSetInSection } = useQuestionSetActions()
  const { createQuestionInQuestionSet } = useQuestionActions()

  const isFlat = questionSet.type === FormQuestionSetTypes.FLAT
  const isLoop = questionSet.type === FormQuestionSetTypes.LOOP
  const isDependsOn = questionSet.type === FormQuestionSetTypes.DEPENDS_ON

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
        const isRadio = draggedObject.object.type === QuestionTypes.RADIO
        const isCheckbox = draggedObject.object.type === QuestionTypes.CHECKBOX
        const isSelect = draggedObject.object.type === QuestionTypes.SELECT

        let newQuestion: QuestionType
        if (isRadio) {
          newQuestion = {
            id: generateRandomID(),
            type: QuestionTypes.RADIO,
            prompt: 'An Untitled Question',
            position: 0,
            settings: {
              display: 'block',
              options: [
                { id: generateRandomID(), position: 0, value: 'Option 1' },
                { id: generateRandomID(), position: 1, value: 'Option 2' },
              ],
              defaultOptionID: 0,
            },
            questionSetID: questionSet.id,
            isRequired: false,
          }
        } else if (isCheckbox) {
          newQuestion = {
            id: generateRandomID(),
            type: QuestionTypes.CHECKBOX,
            prompt: 'An Untitled Question',
            position: 0,
            settings: {
              display: 'block',
              options: [{ id: generateRandomID(), position: 0, value: 'Option 1' }],
            },
            questionSetID: questionSet.id,
            isRequired: false,
          }
        } else if (isSelect) {
          newQuestion = {
            id: generateRandomID(),
            type: QuestionTypes.SELECT,
            prompt: 'An Untitled Question',
            position: 0,
            settings: {
              options: [
                { id: generateRandomID(), position: 0, value: 'Option 1' },
                { id: generateRandomID(), position: 1, value: 'Option 2' },
              ],
              defaultOptionID: 0,
            },
            questionSetID: questionSet.id,
            isRequired: false,
          }
        } else {
          newQuestion = {
            id: generateRandomID(),
            type: draggedObject.object.type,
            prompt: 'An Untitled Question',
            position: 0,
            settings: {
              placeholder: 'Placeholder text',
            },
            questionSetID: questionSet.id,
            isRequired: false,
          }
        }
        createQuestionInQuestionSet(questionSet.id, newQuestion)
      } else {
        const newQuestionSetID = generateRandomID()
        const newQuestionSet: FormQuestionSetType = {
          id: newQuestionSetID,
          type: draggedObject.object.type,
          position: 0,
          sectionID: questionSet.sectionID,
          questionSetID: questionSet.id,
        }

        if (questionSet.type === FormQuestionSetTypes.DEPENDS_ON) {
          newQuestionSet.dependsOn = dependsOn
        }

        if (newQuestionSet.type === FormQuestionSetTypes.DEPENDS_ON) {
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
        createQuestionSetInSection(questionSet.sectionID, newQuestionSet)
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
