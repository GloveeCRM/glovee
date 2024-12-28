'use client'

import { useEffect, useRef, useState } from 'react'
import { FiEdit, FiMoreHorizontal } from 'react-icons/fi'
import { BiTrash } from 'react-icons/bi'

import { FormCategoryType } from '@/lib/types/form'
import useFormCategoryActions from '@/hooks/form-template/use-category-actions'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

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

  const {
    formCategories,
    selectedFormCategoryID,
    setSelectedFormCategoryID,
    formSections,
    setSelectedFormSectionID,
  } = useFormTemplateEditContext()
  const { updateFormCategories, deleteFormCategory } = useFormCategoryActions()

  function handleClickCategory() {
    if (selectedFormCategoryID !== formCategory.formCategoryID) {
      setSelectedFormCategoryID(formCategory.formCategoryID)
      const categorySections = formSections?.filter(
        (formSection) => formSection.formCategoryID === formCategory.formCategoryID
      )
      setSelectedFormSectionID(categorySections?.[0]?.formSectionID || 0)
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
      const categorySections = formSections?.filter(
        (section) => section.formCategoryID === formCategory.formCategoryID
      )
      setSelectedFormSectionID(categorySections?.[0]?.formSectionID || 0)
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
    <div className="text-[14px] text-n-400">
      {isEditing ? (
        <textarea
          ref={categoryTitleInputRef}
          className="mb-[7px] ml-[1px] mt-[4px] block w-[221px] resize-none overflow-hidden rounded border-[1px] border-n-500 bg-n-700/70 px-[4px] pb-[2px] pt-[1px] text-n-100 focus:border-[1px] focus:border-n-500 focus:outline-none"
          defaultValue={formCategory.categoryName}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div
          className="group/category relative cursor-pointer rounded px-[6px] py-[6px] transition duration-75 hover:bg-n-650"
          onClick={handleClickCategory}
        >
          <div
            className={`${!isExpanded && 'truncate text-n-400 group-hover/category:w-[calc(100%-28px)] group-hover/category:truncate'} text-n-100`}
          >
            {formCategory.categoryName}
          </div>
          <DropdownMenu open={isOptionsMenuOpen} onOpenChange={handleOptionsDropdownMenuOpenChange}>
            <DropdownMenuTrigger
              className={`absolute right-0 top-0 rounded bg-n-700 p-[6px] opacity-0 transition duration-75 focus:outline-none group-hover/category:bg-n-650 group-hover/category:opacity-100 ${isOptionsMenuOpen && 'opacity-100'}`}
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
                  className="flex gap-[6px] focus:text-red-500"
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
