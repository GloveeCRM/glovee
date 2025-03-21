'use client'

import { IoChevronDown, IoChevronForward } from 'react-icons/io5'

import { FormCategoryType, FormSectionType } from '@/lib/types/form'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

import ProgressIndicatorRing from '@/components/ui/progress-indicator-ring'
import FormTemplatePreviewSectionCard from '@/components/admin/template/preview/form-template-preview-section-card'

interface FormTemplatePreviewCategoryCardProps {
  formCategory: FormCategoryType
  isExpanded: boolean
  onClick: (categoryId: number) => void
}

export default function FormTemplatePreviewCategoryCard({
  formCategory,
  isExpanded,
  onClick,
}: FormTemplatePreviewCategoryCardProps) {
  const { selectedFormCategorySections } = useFormTemplateEditContext()

  return (
    <div
      className={`cursor-pointer text-wrap rounded px-[4px] pb-[4px] text-[12px] text-n-400`}
      onClick={() => onClick(formCategory.formCategoryID)}
    >
      <div className="flex gap-[4px]">
        <ProgressIndicatorRing
          completionRate={0}
          baseCircleColor="text-n-500"
          progressCircleColor="text-n-300"
          completeGreen
          completeCheck
        />

        <div className="flex w-full items-center justify-between py-[6px] text-[14px]">
          <div className={`${isExpanded && 'text-n-100'} w-full`}>{formCategory.categoryName}</div>
          <div>
            {isExpanded ? (
              <IoChevronDown className="h-[16px] w-[16px]" />
            ) : (
              <IoChevronForward className="h-[16px] w-[16px]" />
            )}
          </div>
        </div>
      </div>
      {isExpanded &&
        selectedFormCategorySections?.map((section: FormSectionType) => (
          <FormTemplatePreviewSectionCard key={section.formSectionID} formSection={section} />
        ))}
    </div>
  )
}
