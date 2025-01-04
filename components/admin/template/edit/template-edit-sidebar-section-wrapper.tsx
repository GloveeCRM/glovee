'use client'

import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

import TemplateEditSidebarSection from './template-edit-sidebar-section'
import AddSectionButton from './add-section-button'

interface TemplateEditSidebarSectionWrapperProps {
  categoryID: number
}

export default function TemplateEditSidebarSectionWrapper({
  categoryID,
}: TemplateEditSidebarSectionWrapperProps) {
  const { selectedFormCategorySections, selectedFormSectionID } = useFormTemplateEditContext()

  return (
    <div className="mt-[2px] flex flex-col gap-[1px]">
      {selectedFormCategorySections && selectedFormCategorySections.length > 0 ? (
        selectedFormCategorySections.map((section) => (
          <TemplateEditSidebarSection
            key={section.formSectionID}
            formSection={section}
            active={section.formSectionID === selectedFormSectionID}
          />
        ))
      ) : (
        <div className="text-zinc-350 py-[4px] pl-[24px] text-[12px]">No sections</div>
      )}
      <AddSectionButton formCategoryID={categoryID} />
    </div>
  )
}
