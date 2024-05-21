'use client'

import { IoChevronDown, IoChevronForward } from 'react-icons/io5'
import ClientSidebarSectionCard from './client-application-section-card'
import ProgressIndicatorRing from '../ui/progress-indicator-ring'
import { ApplicationCategoryType, ApplicationSectionType } from '@/lib/types/application'

export default function ClientApplicationCategoryCard({
  category,
  isExpanded,
  onClick,
}: {
  category: ApplicationCategoryType
  isExpanded: boolean
  onClick: (categoryId: number) => void
}) {
  return (
    <div
      className={`cursor-pointer text-wrap rounded px-[2px] pb-[4px] text-[12px] text-n-300 ${isExpanded && 'bg-n-600/60'}`}
      onClick={() => onClick(category.id)}
    >
      <div className="flex gap-[4px]">
        <ProgressIndicatorRing
          completionRate={12}
          baseCircleColor="text-n-500"
          progressCircleColor="text-n-300"
        />
        <div className="mt-[10px] flex w-full justify-between">
          <div>{category.name}</div>
          <div>
            {isExpanded ? (
              <IoChevronDown className="h-[20px] w-[20px]" />
            ) : (
              <IoChevronForward className="h-[20px] w-[20px]" />
            )}
          </div>
        </div>
      </div>
      {isExpanded &&
        category.sections?.map((section: ApplicationSectionType) => (
          <ClientSidebarSectionCard key={section.id} section={section} />
        ))}
    </div>
  )
}
