'use client'

import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

import TemplateEditSidebarSection from './template-edit-sidebar-section'
import CreateSectionButton from './create-section-button'

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
        <div className="py-[4px] pl-[24px] text-[12px] text-n-400">No sections</div>
      )}
      <CreateSectionButton
        type={
          selectedFormCategorySections && selectedFormCategorySections.length > 0 ? 'add' : 'create'
        }
        formCategoryID={categoryID}
      />
    </div>
  )
}
