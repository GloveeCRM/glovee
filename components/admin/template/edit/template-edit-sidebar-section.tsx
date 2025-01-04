'use client'

import { useEffect, useRef, useState } from 'react'
import { FiEdit, FiMoreHorizontal } from 'react-icons/fi'
import { BiTrash } from 'react-icons/bi'

import { FormSectionType } from '@/lib/types/form'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'
import useFormSectionActions from '@/hooks/form-template/use-section-actions'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TemplateEditSidebarSectionProps {
  formSection: FormSectionType
  active: boolean
}

export default function TemplateEditSidebarSection({
  formSection,
  active,
}: TemplateEditSidebarSectionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false)

  const { setSelectedFormSectionID } = useFormTemplateEditContext()
  const { updateFormSections, deleteFormSection } = useFormSectionActions()

  const sectionInputRef = useRef<HTMLTextAreaElement>(null)

  function handleClickSection(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedFormSectionID(formSection.formSectionID)
  }

  function handleClickRenameSection() {
    setIsEditing(true)
  }

  async function handleClickDeleteSection() {
    const { error } = await deleteFormSection({ formSectionID: formSection.formSectionID })
    if (error) {
      console.error(error)
    }
  }

  function handleOptionsDropdownMenuOpenChange(isOpen: boolean) {
    setIsOptionsMenuOpen(isOpen)
  }

  async function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsEditing(false)
      if (sectionInputRef.current?.value) {
        const formSectionsToUpdate = [
          {
            ...formSection,
            sectionName: sectionInputRef.current?.value || '',
          },
        ]
        if (formSectionsToUpdate) {
          const { error } = await updateFormSections({
            formSectionsToUpdate,
          })
          if (error) {
            console.error(error)
          }
        }
      }
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
    async function handleClickOutside(e: MouseEvent) {
      if (sectionInputRef.current && !sectionInputRef.current.contains(e.target as Node)) {
        setIsEditing(false)
        if (sectionInputRef.current?.value) {
          const formSectionsToUpdate = [
            {
              ...formSection,
              sectionName: sectionInputRef.current?.value || '',
            },
          ]
          if (formSectionsToUpdate) {
            const { error } = await updateFormSections({
              formSectionsToUpdate,
            })
            if (error) {
              console.error(error)
            }
          }
        }
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
  }, [isEditing, sectionInputRef, formSection, updateFormSections])

  return (
    <div
      className={`group/section hover:bg-zinc-750 relative cursor-pointer rounded text-[12px] transition duration-75 ${active && 'bg-zinc-750 text-white'} ${isEditing ? 'py-[5px]' : 'py-[6px]'}`}
      onClick={handleClickSection}
    >
      {isEditing ? (
        <textarea
          ref={sectionInputRef}
          className="ml-[15px] block w-[206px] resize-none overflow-hidden rounded border border-zinc-600 bg-zinc-800 px-[4px] pb-[2px] text-white focus:border-zinc-500 focus:outline-none"
          defaultValue={formSection.sectionName}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="pl-[20px] pr-[6px]">
          <div>
            <div>{formSection.sectionName}</div>
            <DropdownMenu
              open={isOptionsMenuOpen}
              onOpenChange={handleOptionsDropdownMenuOpenChange}
            >
              <DropdownMenuTrigger
                className={`group-hover/section:bg-zinc-750 absolute right-0 top-0 rounded p-[5px] opacity-0 transition duration-75 group-hover/section:opacity-100 ${isOptionsMenuOpen && 'bg-zinc-750 opacity-100'} ${active && 'bg-zinc-750'}`}
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
                    className="flex gap-[6px] focus:bg-red-100 focus:text-red-500"
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
