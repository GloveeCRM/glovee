'use client'

import { useEffect, useRef, useState } from 'react'
import { MdOutlineModeEdit } from 'react-icons/md'
import { PiCheckBold } from 'react-icons/pi'

import { updateTemplateDescriptionById } from '@/lib/actions/template'

interface TemplateInfoCardDescriptionProps {
  templateId: string
  description: string
  editable?: boolean
}

export default function TemplateInfoCardDescription({
  templateId,
  description,
  editable = false,
}: TemplateInfoCardDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const descriptionInputRef = useRef<HTMLTextAreaElement>(null)

  function handleClickEdit() {
    setIsEditing(true)
  }

  function handleSave() {
    const newDescription = descriptionInputRef.current?.value || ''
    setIsEditing(false)
    updateTemplateDescriptionById(templateId, newDescription)
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
      textarea.style.height = '22px'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
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
  }, [isEditing, description])

  return (
    <div className="group relative text-[11px] text-n-300">
      {isEditing ? (
        <textarea
          ref={descriptionInputRef}
          className="mb-[4px] ml-[2px] mt-[5px] block w-[calc(100%-25px)] resize-none overflow-hidden rounded border-[1px] border-n-500 bg-n-700/70 px-[4px] pb-[2px] focus:border-[1px] focus:border-n-500 focus:outline-none"
          defaultValue={description}
          onChange={adjustTextareaHeight}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <>
          <p
            className={`mb-[4px] ml-[7px] w-[calc(100%-14px)] pt-[6px] text-n-300 ${!isExpanded ? 'line-clamp-3' : ''}`}
          >
            {description}
          </p>
          {description.length > 85 && (
            <button
              className="mb-[4px] ml-[7px] text-[11px] text-n-100 underline"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </>
      )}

      {editable &&
        (!isEditing ? (
          <MdOutlineModeEdit
            onClick={handleClickEdit}
            className="absolute right-0 top-0 h-[22px] w-[22px] cursor-pointer rounded bg-n-600/90 p-[2px] text-n-300 opacity-0 transition-opacity duration-100 hover:text-n-100 group-hover:opacity-100"
          />
        ) : (
          <PiCheckBold
            onClick={handleSave}
            className="absolute right-0 top-0 mr-[1px] h-[22px] w-[22px] cursor-pointer rounded bg-n-600/90 p-[1px] text-n-300 duration-100 hover:text-n-100"
          />
        ))}
    </div>
  )
}
