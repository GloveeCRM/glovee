import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { TemplateSectionType } from '@/lib/types/template'

interface TemplateEditTopbarSectionProps {
  section: TemplateSectionType
  active: boolean
}
export default function TemplateEditTopbarSection({
  section,
  active,
}: TemplateEditTopbarSectionProps) {
  const { setSelectedSectionId } = useTemplateEditContext()

  function handleClickSection() {
    setSelectedSectionId(section.id)
  }

  return (
    <div
      key={section.id}
      className={`flex min-w-fit cursor-pointer items-center border-l-[1px] border-n-600 px-[6px] ${active ? 'bg-n-600/75' : ''}`}
      onClick={handleClickSection}
    >
      {section.title}
    </div>
  )
}
