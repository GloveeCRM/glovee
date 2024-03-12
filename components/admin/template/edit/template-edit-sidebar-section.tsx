import { useEffect, useRef, useState } from 'react'
import { PiDotsSixVerticalBold } from 'react-icons/pi'

import { TemplateSectionType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useSectionActions from '@/hooks/template/use-section-actions'
import SectionMenuButton from './section-menu-button'

interface TemplateEditSidebarSectionProps {
  section: TemplateSectionType
  active: boolean
}

export default function TemplateEditSidebarSection({
  section,
  active,
}: TemplateEditSidebarSectionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { setSelectedSectionId } = useTemplateEditContext()
  const { updateSectionTitle, removeSectionFromCategory } = useSectionActions()

  const sectionInputRef = useRef<HTMLTextAreaElement>(null)

  function handleClickSection(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedSectionId(section.id)
  }

  function handleClickRename() {
    setIsEditing(true)
  }

  function handleClickDelete() {
    removeSectionFromCategory(section.id)
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
      textarea.style.height = '26px'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    adjustTextareaHeight()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sectionInputRef.current && !sectionInputRef.current.contains(event.target as Node)) {
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
  }, [isEditing, sectionInputRef])

  return (
    <div
      className={`group relative flex cursor-pointer gap-[4px] text-[14px] ${active && 'bg-n-500/50'} ${isEditing ? 'py-[5px]' : 'py-[6px]'}`}
      onClick={handleClickSection}
    >
      {isEditing ? (
        <div className="flex items-center">
          <textarea
            ref={sectionInputRef}
            className="ml-[28px] block w-[186px] resize-none overflow-hidden rounded border-[1px] border-n-500 bg-n-700/70 px-[4px] pb-[2px] focus:border-[1px] focus:border-n-500 focus:outline-none"
            defaultValue={section.title}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      ) : (
        <div className="flex items-start gap-[3px] pl-[8px]">
          <span>
            <PiDotsSixVerticalBold className="h-[22px] w-[22px] text-n-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          </span>
          <div className="flex items-start">
            <div className="pr-[6px]">{section.title}</div>
            <SectionMenuButton
              onClickRename={handleClickRename}
              onClickDelete={handleClickDelete}
            />
          </div>
        </div>
      )}
    </div>
  )
}
