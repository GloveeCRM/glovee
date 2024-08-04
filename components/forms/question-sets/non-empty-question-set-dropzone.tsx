'use client'

import { useState } from 'react'

import { TemplateQuestionSetType, TemplateQuestionSetTypes } from '@/lib/types/template'
import { QuestionType, QuestionTypes, RadioQuestionType } from '@/lib/types/qusetion'
import { generateRandomID } from '@/lib/utils/id'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionActions from '@/hooks/template/use-question-actions'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'

interface NonEmptyQuestionSetDropzoneProps {
  questionSet: TemplateQuestionSetType
  position: number
  dependsOn?: any
}

export default function NonEmptyQuestionSetDropzone({
  questionSet,
  position,
  dependsOn,
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
              isRequired: false,
            },
            questionSetID: questionSet.id,
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
              isRequired: false,
            },
            questionSetID: questionSet.id,
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
              isRequired: false,
            },
            questionSetID: questionSet.id,
          }
        } else {
          newQuestion = {
            id: generateRandomID(),
            type: draggedObject.object.type,
            prompt: 'An Untitled Question',
            position: 0,
            settings: {
              placeholder: 'Placeholder text',
              isRequired: false,
            },
            questionSetID: questionSet.id,
          }
        }
        createQuestionInQuestionSet(questionSet.id, newQuestion)
      } else {
        const newQuestionSetID = generateRandomID()
        const newQuestionSet: TemplateQuestionSetType = {
          id: newQuestionSetID,
          type: draggedObject.object.type,
          position: position,
          sectionID: questionSet.sectionID,
          questionSetID: questionSet.id,
        }

        if (questionSet.type === TemplateQuestionSetTypes.DEPENDS_ON) {
          newQuestionSet.dependsOn = dependsOn
        }

        if (newQuestionSet.type === TemplateQuestionSetTypes.DEPENDS_ON) {
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
              isRequired: false,
            },
            questionSetID: newQuestionSetID,
            options: [],
          }
          newQuestionSet.questions = [newQuestion]
        }
        createQuestionSetInSection(questionSet.sectionID, newQuestionSet)
      }
      setDraggedObject(null)
    }
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
