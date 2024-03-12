import { TemplateSectionType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import TemplateEditSidebarSection from './template-edit-sidebar-section'
import CreateSectionButton from './create-section-button'

interface TemplateEditSidebarSectionWrapperProps {
  categoryId: string
  sections: TemplateSectionType[]
}

export default function TemplateEditSidebarSectionWrapper({
  categoryId,
  sections,
}: TemplateEditSidebarSectionWrapperProps) {
  const { selectedSectionId } = useTemplateEditContext()
  return (
    <div>
      {sections.map((section) => (
        <TemplateEditSidebarSection
          key={section.id}
          section={section}
          active={section.id === selectedSectionId}
        />
      ))}
      <CreateSectionButton type={sections ? 'add' : 'create'} categoryId={categoryId} />
    </div>
  )
}
