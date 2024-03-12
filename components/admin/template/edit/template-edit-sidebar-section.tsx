import { useEffect, useRef, useState } from 'react'
import { PiCheckBold, PiDotsSixVerticalBold } from 'react-icons/pi'

import { TemplateSectionType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
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

  const sectionInputRef = useRef<HTMLTextAreaElement>(null)

  function handleClickSection(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedSectionId(section.id)
  }

  function handleRenameSection() {
    console.log('rename section')
    setIsEditing(true)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsEditing(false)
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sectionInputRef.current && !sectionInputRef.current.contains(event.target as Node)) {
        setIsEditing(false)
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
            className="ml-[29px] block w-[186px] resize-none overflow-hidden rounded border-[1px] border-n-500 bg-n-700/70 px-[4px] pb-[2px] focus:border-[1px] focus:border-n-500 focus:outline-none"
            defaultValue={section.title}
            onChange={adjustTextareaHeight}
            onKeyDown={handleKeyDown}
          />
        </div>
      ) : (
        <div className="flex items-center gap-[4px] pl-[10px]">
          <PiDotsSixVerticalBold className="h-[20px] w-[20px] text-n-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          <div className="flex items-center">
            <div className="pr-[6px]">{section.title}</div>
            <SectionMenuButton sectionId={section.id} onRename={handleRenameSection} />
          </div>
        </div>
      )}
    </div>
  )
}
