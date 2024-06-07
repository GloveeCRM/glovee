'use client'

import { useEffect, useRef, useState } from 'react'
import { MdOutlineModeEdit } from 'react-icons/md'

import useTemplateActions from '@/hooks/template/use-template-actions'

interface TemplateInfoCardDescriptionProps {
  description: string
  editable?: boolean
}

export default function TemplateInfoCardDescription({
  description,
  editable = false,
}: TemplateInfoCardDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { updateTemplateDescription } = useTemplateActions()

  const descriptionInputRef = useRef<HTMLTextAreaElement>(null)

  function handleClickEdit() {
    setIsEditing(true)
  }

  function handleSave() {
    const newDescription = descriptionInputRef.current?.value || ''
    setIsEditing(false)
    updateTemplateDescription(newDescription)
  }

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
  }, [isEditing, description])

  return (
    <div className="group relative text-[11px] text-n-300">
      {isEditing ? (
        <textarea
          ref={descriptionInputRef}
          className="mb-[6px] ml-[4px] mt-[3px] block w-[calc(100%-8px)] resize-none overflow-hidden rounded border-[1px] border-n-500 bg-n-700/70 px-[3px] pb-[2px] focus:border-[1px] focus:border-n-500 focus:outline-none"
          defaultValue={description}
          onChange={adjustTextareaHeight}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <>
          <p
            className={`mb-[7px] ml-[8px] mt-[4px] w-[calc(100%-14px)] text-n-300 ${description.length <= 129 && 'mb-[6px]'} ${!isExpanded ? 'line-clamp-3' : ''}`}
          >
            {description || 'No description'}
          </p>
          {description.length > 129 && (
            <button
              className="mb-[6px] ml-[7px] text-[11px] text-n-100 underline"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </>
      )}

      {editable && !isEditing && (
        <MdOutlineModeEdit
          onClick={handleClickEdit}
          className="absolute right-0 top-0 h-[22px] w-[22px] cursor-pointer rounded bg-n-600/90 p-[2px] text-n-300 opacity-0 transition-opacity duration-100 hover:text-n-100 group-hover:opacity-100"
        />
      )}
    </div>
  )
}
