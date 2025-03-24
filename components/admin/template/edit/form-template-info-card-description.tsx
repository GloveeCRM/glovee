'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MdOutlineModeEdit } from 'react-icons/md'

import useFormActions from '@/hooks/form-template/use-form-actions'
import { useFormContext } from '@/contexts/form-context'

interface FormTemplateInfoCardDescriptionProps {
  description?: string
}

export default function FormTemplateInfoCardDescription({
  description,
}: FormTemplateInfoCardDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { form } = useFormContext()
  const { updateForm } = useFormActions()

  const descriptionInputRef = useRef<HTMLTextAreaElement>(null)

  function handleClickEdit() {
    setIsEditing(true)
  }

  const handleSave = useCallback(async () => {
    const newDescription = descriptionInputRef.current?.value || ''
    setIsEditing(false)
    if (!form) return
    const { error } = await updateForm({
      formToUpdate: {
        formDescription: newDescription,
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
    const textarea = descriptionInputRef.current
    if (textarea) {
      textarea.style.height = '21px'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    function handleClickOutsideDescription(e: MouseEvent) {
      if (descriptionInputRef.current && !descriptionInputRef.current.contains(e.target as Node)) {
        handleSave()
      }
    }

    if (isEditing) {
      adjustTextareaHeight()
      const textarea = descriptionInputRef.current
      if (textarea) {
        textarea.focus()
        // move cursor to the end of the text
        const length = textarea.value.length
        textarea.setSelectionRange(length, length)
      }
    }

    document.addEventListener('mousedown', handleClickOutsideDescription)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDescription)
    }
  }, [isEditing, description, handleSave])

  return (
    <div className="flex flex-col gap-[2px] text-[12px]">
      <span className="text-zinc-300">Form Template Description</span>
      <div className="group relative text-white">
        {isEditing ? (
          <textarea
            ref={descriptionInputRef}
            className="mb-[6px] block w-[calc(100%-8px)] resize-none overflow-hidden rounded border-[1px] border-n-500 bg-n-700/70 px-[3px] pb-[2px] focus:border-[1px] focus:border-n-500 focus:outline-none"
            defaultValue={description}
            onChange={adjustTextareaHeight}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <>
            <p
              className={`mb-[7px] mt-[1px] w-[calc(100%-14px)] ${description && description.length <= 129 && 'mb-[6px]'} ${!isExpanded ? 'line-clamp-3' : ''}`}
            >
              {description || 'No description'}
            </p>
            {description && description.length > 129 && (
              <button
                className="mb-[6px] text-[11px] text-white underline"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </>
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
