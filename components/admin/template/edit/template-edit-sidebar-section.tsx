import { TemplateSectionType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { PiDotsSixVerticalBold } from 'react-icons/pi'
import { FiMoreHorizontal } from 'react-icons/fi'
import SectionMenuButton from './section-menu-button'

interface TemplateEditSidebarSectionProps {
  section: TemplateSectionType
  active: boolean
}

export default function TemplateEditSidebarSection({
  section,
  active,
}: TemplateEditSidebarSectionProps) {
  const { setSelectedSectionId } = useTemplateEditContext()

  function handleClickSection(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedSectionId(section.id)
  }

  function handleDoubleClickSection() {
    console.log('double click')
  }

  return (
    <div
      className={`group relative flex cursor-pointer gap-[4px] py-[6px] pl-[10px] ${active && 'bg-n-500/50'}`}
      onClick={handleClickSection}
      onDoubleClick={handleDoubleClickSection}
    >
      <PiDotsSixVerticalBold className="h-[20px] w-[20px] text-n-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
      <div className="pr-[6px] text-[14px]">{section.title}</div>
      <SectionMenuButton />
    </div>
  )
}
