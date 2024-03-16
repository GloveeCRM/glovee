import { useEffect, useRef, useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io'
import { PiDotsSixVerticalBold } from 'react-icons/pi'

import { TemplateCategoryType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useCategoryActions from '@/hooks/template/use-category-actions'
import TemplateEditSidebarSectionWrapper from './template-edit-sidebar-section-wrapper'
import CategoryMenuButton from './category-menu-button'

interface TemplateEditSidebarCategoryProps {
  category: TemplateCategoryType
  isExpanded: boolean
}

export default function TemplateEditSidebarCategory({
  category,
  isExpanded,
}: TemplateEditSidebarCategoryProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const categoryTitleInputRef = useRef<HTMLTextAreaElement>(null)

  const { selectedCategoryId, setSelectedCategoryId, setSelectedSectionId } =
    useTemplateEditContext()
  const { removeCategoryFromTemplate, updateCategoryTitle } = useCategoryActions()

  function handleClickCategory() {
    if (selectedCategoryId !== category.id) {
      setSelectedCategoryId(category.id)
      setSelectedSectionId(category.sections?.[0]?.id || '')
    }
  }

  function handleClickDeleteCategory() {
    removeCategoryFromTemplate(category.id)
  }

  function handleClickRenameCategory() {
    setIsEditing(true)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsEditing(false)
      updateCategoryTitle(category.id, e.currentTarget.value)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsEditing(false)
    }
  }

  function adjustTextareaHeight() {
    const textarea = categoryTitleInputRef.current
    if (textarea) {
      textarea.style.height = '30px'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    adjustTextareaHeight()
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        categoryTitleInputRef.current &&
        !categoryTitleInputRef.current.contains(e.target as Node)
      ) {
        setIsEditing(false)
        updateCategoryTitle(category.id, categoryTitleInputRef.current.value)
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
  }, [isEditing, categoryTitleInputRef])

  return (
    <div className={`rounded ${isExpanded && 'bg-n-600/60'}`}>
      {isEditing ? (
        <textarea
          ref={categoryTitleInputRef}
          className="my-[4px] ml-[17px] block w-[204px] resize-none overflow-hidden rounded border-[1px] border-n-500 bg-n-700/70 px-[4px] pb-[2px] pt-[1px] focus:border-[1px] focus:border-n-500 focus:outline-none"
          defaultValue={category.title}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="group/category flex cursor-pointer py-[6px]" onClick={handleClickCategory}>
          <div>
            {isExpanded ? (
              <IoMdArrowDropdown className="h-[22px] w-[22px]" />
            ) : (
              <IoMdArrowDropright className="h-[22px] w-[22px]" />
            )}
          </div>
          <div className="pr-[6px]">{category.title}</div>
          <CategoryMenuButton
            onClickDelete={handleClickDeleteCategory}
            onClickRename={handleClickRenameCategory}
          />
        </div>
      )}
      {isExpanded && (
        <TemplateEditSidebarSectionWrapper
          categoryId={category.id}
          sections={category.sections || []}
        />
      )}
    </div>
  )
}
