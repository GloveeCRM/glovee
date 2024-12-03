'use client'

import { useState } from 'react'

import { FormQuestionSetType } from '@/lib/types/form'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import useQuestionSetActions from '@/hooks/form-template/use-question-set-actions'

interface NonEmptySectionDropzoneProps {
  position: number
  isFirstDropzone?: boolean
  isLastDropzone?: boolean
}

export default function NonEmptySectionDropzone({
  position,
  isFirstDropzone = false,
  isLastDropzone = false,
}: NonEmptySectionDropzoneProps) {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)
  const { selectedFormSectionID } = useFormTemplateEditContext()
  const { draggedObject, setDraggedObject } = useDragAndDropContext()
  const { createFormQuestionSet } = useQuestionSetActions()

  const isDropAllowed = isDraggedOver && draggedObject?.type === 'questionSet'

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
      const newQuestionSet: Partial<FormQuestionSetType> = {
        formSectionID: selectedFormSectionID,
        formQuestionSetType: draggedObject.object.type,
        formQuestionSetPosition: position,
      }
      const { error } = await createFormQuestionSet({
        newFormQuestionSet: newQuestionSet,
      })
      if (error) {
        console.error(error)
      }
    }
    setDraggedObject(null)
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
