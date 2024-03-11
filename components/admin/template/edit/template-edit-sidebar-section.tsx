import { TemplateSectionType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'

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

  return (
    <div
      className={`cursor-pointer py-[6px] ${active && 'bg-n-500/50'}`}
      onClick={handleClickSection}
    >
      <div className="pl-[35px] pr-[6px] text-[14px]">{section.title}</div>
    </div>
  )
}
