'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MdOutlineModeEdit } from 'react-icons/md'

import { useFormContext } from '@/contexts/form-context'
import useFormActions from '@/hooks/form-template/use-form-actions'

interface FormTemplateInfoCardTitleProps {
  title: string
}

export default function FormTemplateInfoCardTitle({ title }: FormTemplateInfoCardTitleProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const titleInputRef = useRef<HTMLTextAreaElement>(null)

  const { form } = useFormContext()
  const { updateForm } = useFormActions()

  function handleClickEdit() {
    setIsEditing(true)
  }

  const handleSave = useCallback(async () => {
    const newTitle = titleInputRef.current?.value || 'Untitled Template'
    setIsEditing(false)
    if (!form) return
    const { error } = await updateForm({
      formToUpdate: {
        formName: newTitle,
      },
    })
    if (error) {
      console.error(error)
    }
  }, [updateForm, form])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    }
  }

  const adjustTextareaHeight = () => {
    const textarea = titleInputRef.current
    if (textarea) {
      textarea.style.height = '25px'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    function handleClickOutsideTitle(e: MouseEvent) {
      if (titleInputRef.current && !titleInputRef.current.contains(e.target as Node)) {
        handleSave()
      }
    }

    if (isEditing) {
      adjustTextareaHeight()
      const textarea = titleInputRef.current
      if (textarea) {
        textarea.focus()
        // move cursor to the end of the text
        const length = textarea.value.length
        textarea.setSelectionRange(length, length)
      }
    }

    document.addEventListener('mousedown', handleClickOutsideTitle)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideTitle)
    }
  }, [isEditing, titleInputRef, handleSave])

  return (
    <div className="flex flex-col gap-[2px] text-[12px]">
      <span className="text-zinc-300">Form Template Name</span>
      <div className="group relative text-white">
        {isEditing ? (
          <textarea
            defaultValue={title}
            className="block w-[calc(100%-8px)] resize-none overflow-hidden rounded border border-zinc-600 bg-zinc-800/70 px-[4px] pt-[1px] text-white focus:border-zinc-500 focus:outline-none"
            ref={titleInputRef}
            onChange={adjustTextareaHeight}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <p className="mb-[1px] mt-[1px] w-[calc(100%-16px)]">{title}</p>
        )}

        {!isEditing && (
          <MdOutlineModeEdit
            onClick={handleClickEdit}
            className="absolute right-0 top-0 h-[22px] w-[22px] cursor-pointer rounded bg-zinc-700 p-[2px] text-zinc-200 opacity-0 transition-opacity duration-100 hover:text-white group-hover:opacity-100"
          />
        )}
      </div>
    </div>
  )
}
