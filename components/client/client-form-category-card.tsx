'use client'

import { IoChevronDown, IoChevronForward } from 'react-icons/io5'

import { FormCategoryType, FormSectionType } from '@/lib/types/form'
import ProgressIndicatorRing from '@/components/ui/progress-indicator-ring'
import ClientFormSidebarSectionCard from './client-form-section-card'

interface ClientFormCategoryCardProps {
  category: FormCategoryType
  type: 'inProgress' | 'submitted'
  isExpanded: boolean
  onClick: (categoryId: number) => void
}

export default function ClientFormCategoryCard({
  category,
  type,
  isExpanded,
  onClick,
}: ClientFormCategoryCardProps) {
  return (
    <div
      className={`cursor-pointer text-wrap rounded px-[4px] pb-[4px] text-[12px] text-n-400`}
      onClick={() => onClick(category.id)}
    >
      <div className="flex gap-[4px]">
        {type === 'inProgress' && (
          <ProgressIndicatorRing
            completionRate={category.completionRate}
            baseCircleColor="text-n-500"
            progressCircleColor="text-n-300"
            completeGreen
            completeCheck
          />
        )}
        <div className="flex w-full items-center justify-between py-[6px] text-[14px]">
          <div className={`${isExpanded && 'text-n-100'} w-full`}>{category.name}</div>
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
        category.sections?.map((section: FormSectionType) => (
          <ClientFormSidebarSectionCard key={section.id} section={section} type={type} />
        ))}
    </div>
  )
}
