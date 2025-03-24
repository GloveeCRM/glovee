'use client'

import { useFormContext } from '@/contexts/form-context'

import TemplateEditSidebarSection from '@/components/admin/template/edit/template-edit-sidebar-section'
import AddSectionButton from '@/components/admin/template/edit/add-section-button'

interface TemplateEditSidebarSectionWrapperProps {
  categoryID: number
}

export default function TemplateEditSidebarSectionWrapper({
  categoryID,
}: TemplateEditSidebarSectionWrapperProps) {
  const { selectedFormCategorySections, selectedFormSectionID } = useFormContext()

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
        <div className="py-[4px] pl-[24px] text-[12px] text-zinc-350">No sections</div>
      )}
      <AddSectionButton formCategoryID={categoryID} />
    </div>
  )
}
