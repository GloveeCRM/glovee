'use client'

import { useEffect, useRef, useState } from 'react'
import { FiEdit, FiMoreHorizontal } from 'react-icons/fi'
import { BiTrash } from 'react-icons/bi'

import { FormCategoryType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'
import useFormCategoryActions from '@/hooks/form-template/use-category-actions'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import TemplateEditSidebarSectionWrapper from './template-edit-sidebar-section-wrapper'

interface TemplateEditSidebarCategoryProps {
  formCategory: FormCategoryType
  isExpanded: boolean
}

export default function TemplateEditSidebarCategory({
  formCategory,
  isExpanded,
}: TemplateEditSidebarCategoryProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false)

  const categoryTitleInputRef = useRef<HTMLTextAreaElement>(null)

  const { formCategories, selectedFormCategoryID, setSelectedFormCategoryID } = useFormContext()
  const { updateFormCategories, deleteFormCategory } = useFormCategoryActions()

  function handleClickCategory() {
    if (selectedFormCategoryID !== formCategory.formCategoryID) {
      setSelectedFormCategoryID(formCategory.formCategoryID)
    }
  }

  function handleOptionsDropdownMenuOpenChange(isOpen: boolean) {
    setIsOptionsMenuOpen(isOpen)
  }

  async function handleClickDeleteCategory() {
    const { error } = await deleteFormCategory({
      formCategoryID: formCategory.formCategoryID,
    })
    if (error) {
      console.error(error)
    }
    if (selectedFormCategoryID === formCategory.formCategoryID) {
      setSelectedFormCategoryID(formCategories?.[0]?.formCategoryID || 0)
    }
  }

  function handleClickRenameCategory() {
    setIsEditing(true)
  }

  async function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsEditing(false)
      if (categoryTitleInputRef.current?.value) {
        const formCategoriesToUpdate = [
          {
            ...formCategory,
            categoryName: categoryTitleInputRef.current?.value || '',
          },
        ]
        if (formCategoriesToUpdate) {
          const { error } = await updateFormCategories({
            formCategoriesToUpdate,
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
    const textarea = categoryTitleInputRef.current
    if (textarea) {
      textarea.style.height = '26px'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    adjustTextareaHeight()
  }

  useEffect(() => {
    async function handleClickOutside(e: MouseEvent) {
      if (
        categoryTitleInputRef.current &&
        !categoryTitleInputRef.current.contains(e.target as Node)
      ) {
        setIsEditing(false)
        const formCategoriesToUpdate = [
          {
            ...formCategory,
            categoryName: categoryTitleInputRef.current?.value || '',
          },
        ]
        if (formCategoriesToUpdate) {
          const { error } = await updateFormCategories({
            formCategoriesToUpdate,
          })
          if (error) {
            console.error(error)
          }
        }
      }
    }

    if (isEditing) {
      adjustTextareaHeight()
      const textarea = categoryTitleInputRef.current
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
  }, [isEditing, categoryTitleInputRef, formCategories, updateFormCategories, formCategory])

  return (
    <div className="text-[14px] text-zinc-350">
      {isEditing ? (
        <textarea
          ref={categoryTitleInputRef}
          className="mb-[7px] ml-[1px] mt-[4px] block w-[221px] resize-none overflow-hidden rounded border border-zinc-600 bg-zinc-800 px-[4px] pb-[2px] pt-[1px] text-white focus:border-zinc-500 focus:outline-none"
          defaultValue={formCategory.categoryName}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div
          className="group/category relative cursor-pointer rounded px-[6px] py-[6px] transition duration-75 hover:bg-zinc-750"
          onClick={handleClickCategory}
        >
          <div
            className={`${!isExpanded && 'truncate text-zinc-350 group-hover/category:w-[calc(100%-28px)] group-hover/category:truncate'} text-white`}
          >
            {formCategory.categoryName}
          </div>
          <DropdownMenu open={isOptionsMenuOpen} onOpenChange={handleOptionsDropdownMenuOpenChange}>
            <DropdownMenuTrigger
              className={`absolute right-0 top-0 rounded bg-zinc-750 p-[6px] opacity-0 transition duration-75 focus:outline-none group-hover/category:bg-zinc-750 group-hover/category:opacity-100 ${isOptionsMenuOpen && 'opacity-100'}`}
            >
              <FiMoreHorizontal className="h-[20px] w-[20px]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-[160px]">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleClickRenameCategory} className="flex gap-[6px]">
                  <FiEdit className="h-[18px] w-[18px]" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleClickDeleteCategory}
                  className="flex gap-[6px] focus:bg-red-100 focus:text-red-500"
                >
                  <BiTrash className="h-[18px] w-[18px]" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {isExpanded && <TemplateEditSidebarSectionWrapper categoryID={formCategory.formCategoryID} />}
    </div>
  )
}
