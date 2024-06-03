'use client'

import { useEffect, useRef, useState } from 'react'
import { FiEdit, FiMoreHorizontal } from 'react-icons/fi'
import { BiTrash } from 'react-icons/bi'

import { TemplateSectionType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useSectionActions from '@/hooks/template/use-section-actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TemplateEditSidebarSectionProps {
  section: TemplateSectionType
  active: boolean
}

export default function TemplateEditSidebarSection({
  section,
  active,
}: TemplateEditSidebarSectionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false)

  const { setSelectedSectionID } = useTemplateEditContext()
  const { updateSectionTitle, removeSectionFromCategory } = useSectionActions()

  const sectionInputRef = useRef<HTMLTextAreaElement>(null)

  function handleClickSection(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedSectionID(section.id)
  }

  function handleClickRenameSection() {
    setIsEditing(true)
  }

  function handleClickDeleteSection() {
    removeSectionFromCategory(section.id)
  }

  function handleOptionsDropdownMenuOpenChange(isOpen: boolean) {
    setIsOptionsMenuOpen(isOpen)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsEditing(false)
      updateSectionTitle(section.id, e.currentTarget.value)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsEditing(false)
    }
  }

  function adjustTextareaHeight() {
    const textarea = sectionInputRef.current
    if (textarea) {
      textarea.style.height = '22px'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    adjustTextareaHeight()
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sectionInputRef.current && !sectionInputRef.current.contains(e.target as Node)) {
        setIsEditing(false)
        updateSectionTitle(section.id, sectionInputRef.current.value)
      }
    }

    if (isEditing) {
      adjustTextareaHeight()
      const textarea = sectionInputRef.current
      if (textarea) {
        textarea.focus()
        // move cursor to the end of the text
        const length = textarea.value.length
        textarea.setSelectionRange(length, length)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing, sectionInputRef, section.id, updateSectionTitle])

  return (
    <div
      className={`group/section hover:bg-n-650 relative cursor-pointer rounded text-[12px] transition duration-75 ${active && 'bg-n-650 text-n-100'} ${isEditing ? 'py-[5px]' : 'py-[6px]'}`}
      onClick={handleClickSection}
    >
      {isEditing ? (
        <textarea
          ref={sectionInputRef}
          className="ml-[15px] block w-[206px] resize-none overflow-hidden rounded border-[1px] border-n-500 bg-n-700/70 px-[4px] pb-[2px] focus:border-[1px] focus:border-n-500 focus:outline-none"
          defaultValue={section.name}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="pl-[20px] pr-[6px]">
          <div>
            <div>{section.name}</div>
            <DropdownMenu
              open={isOptionsMenuOpen}
              onOpenChange={handleOptionsDropdownMenuOpenChange}
            >
              <DropdownMenuTrigger
                className={`group-hover/section:bg-n-650 absolute right-[2px] top-0 p-[5px] opacity-0 transition duration-75 focus:outline-none group-hover/section:opacity-100 ${isOptionsMenuOpen && 'opacity-100'} ${active && 'bg-n-650'}`}
              >
                <FiMoreHorizontal className="h-[20px] w-[20px]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" className="w-[160px]">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleClickRenameSection} className="flex gap-[6px]">
                    <FiEdit className="h-[18px] w-[18px]" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleClickDeleteSection}
                    className="flex gap-[6px] focus:text-red-500"
                  >
                    <BiTrash className="h-[18px] w-[18px]" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  )
}
