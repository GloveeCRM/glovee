'use client'

import { IoChevronDown, IoChevronForward } from 'react-icons/io5'

import { FormCategoryType, FormSectionType } from '@/lib/types/form'
import { useApplicationFormContext } from '@/contexts/application-form-context'

import ProgressIndicatorRing from '@/components/ui/progress-indicator-ring'
import ClientFormSidebarSectionCard from './client-form-section-card'

interface ClientFormCategoryCardProps {
  category: FormCategoryType
  type: 'in-progress' | 'submitted'
  isExpanded: boolean
  onClick: (categoryId: number) => void
}

export default function ClientFormCategoryCard({
  category,
  type,
  isExpanded,
  onClick,
}: ClientFormCategoryCardProps) {
  const { selectedFormCategorySections } = useApplicationFormContext()

  return (
    <div
      className={`cursor-pointer text-wrap rounded px-[4px] pb-[4px] text-[12px] text-n-400`}
      onClick={() => onClick(category.formCategoryID)}
    >
      <div className="flex gap-[4px]">
        {type === 'in-progress' && (
          <ProgressIndicatorRing
            completionRate={category.completionRate}
            baseCircleColor="text-n-500"
            progressCircleColor="text-n-300"
            completeGreen
            completeCheck
          />
        )}
        <div className="flex w-full items-center justify-between py-[6px] text-[14px]">
          <div className={`${isExpanded && 'text-n-100'} w-full`}>{category.categoryName}</div>
          <div className="">
            {isExpanded ? (
              <IoChevronDown className="h-[16px] w-[16px]" />
            ) : (
              <IoChevronForward className="h-[16px] w-[16px]" />
            )}
          </div>
        </div>
      </div>
      {isExpanded &&
        selectedFormCategorySections.map((section: FormSectionType) => (
          <ClientFormSidebarSectionCard key={section.formSectionID} section={section} type={type} />
        ))}
    </div>
  )
}
