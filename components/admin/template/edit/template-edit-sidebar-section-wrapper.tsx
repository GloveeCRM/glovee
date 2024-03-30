'use client'

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
      {sections.length > 0 ? (
        sections.map((section) => (
          <TemplateEditSidebarSection
            key={section.id}
            section={section}
            active={section.id === selectedSectionId}
          />
        ))
      ) : (
        <div className="py-[4px] pl-[23px] text-[12px] text-n-300">No sections</div>
      )}
      <CreateSectionButton type={sections.length > 0 ? 'add' : 'create'} categoryId={categoryId} />
    </div>
  )
}
