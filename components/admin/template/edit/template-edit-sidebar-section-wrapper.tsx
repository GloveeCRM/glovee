'use client'

import { TemplateSectionType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import TemplateEditSidebarSection from './template-edit-sidebar-section'
import CreateSectionButton from './create-section-button'
import { FormSectionType } from '@/lib/types/form'

interface TemplateEditSidebarSectionWrapperProps {
  categoryID: number
  sections: FormSectionType[]
}

export default function TemplateEditSidebarSectionWrapper({
  categoryID,
  sections,
}: TemplateEditSidebarSectionWrapperProps) {
  const { selectedSectionID } = useTemplateEditContext()

  return (
    <div className="mt-[2px] flex flex-col gap-[1px]">
      {sections.length > 0 ? (
        sections.map((section) => (
          <TemplateEditSidebarSection
            key={section.sectionID}
            section={section}
            active={section.sectionID === selectedSectionID}
          />
        ))
      ) : (
        <div className="py-[4px] pl-[24px] text-[12px] text-n-400">No sections</div>
      )}
      <CreateSectionButton type={sections.length > 0 ? 'add' : 'create'} categoryID={categoryID} />
    </div>
  )
}
