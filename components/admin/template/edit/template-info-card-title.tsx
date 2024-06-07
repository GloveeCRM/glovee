'use client'

import { useEffect, useRef, useState } from 'react'
import { MdOutlineModeEdit } from 'react-icons/md'

import useTemplateActions from '@/hooks/template/use-template-actions'

interface TemplateInfoCardTitleProps {
  title: string
  editable?: boolean
}

export default function TemplateInfoCardTitle({
  title,
  editable = false,
}: TemplateInfoCardTitleProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { updateTemplateName } = useTemplateActions()

  const titleInputRef = useRef<HTMLTextAreaElement>(null)

  function handleClickEdit() {
    setIsEditing(true)
  }

  function handleSave() {
    const newTitle = titleInputRef.current?.value || 'Untitled Template'
    setIsEditing(false)
    updateTemplateName(newTitle)
  }

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
  }, [isEditing, title])

  return (
    <div className="group relative text-[14px] text-n-100">
      {isEditing ? (
        <textarea
          defaultValue={title}
          className="ml-[4px] mt-[5px] block w-[calc(100%-8px)] resize-none overflow-hidden rounded border-[1px] border-n-500 bg-n-700/70 px-[3px] pb-[2px] text-n-100 focus:border-[1px] focus:border-n-500 focus:outline-none"
          ref={titleInputRef}
          onChange={adjustTextareaHeight}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p className="mb-[1px] ml-[8px] mt-[6px] w-[calc(100%-16px)]">
          {title || 'Untitled Template'}
        </p>
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
