'use client'

import { IoChevronDown, IoChevronForward } from 'react-icons/io5'
import ClientSidebarSectionCard from './client-application-section-card'
import { Category, Section } from './application-categories'
import ProgressIndicatorRing from '../ui/progress-indicator-ring'

export default function ClientApplicationCategoryCard({
  category,
  isExpanded,
  onClick,
}: {
  category: Category
  isExpanded: boolean
  onClick: (categoryId: string) => void
}) {
  return (
    <div className="flex gap-[4px]">
      <div>
        <ProgressIndicatorRing
          completionRate={12}
          baseCircleColor="text-n-500"
          progressCircleColor="text-n-300"
        />
      </div>
      <div
        className="flex flex-grow cursor-pointer text-[14px] text-n-300"
        onClick={() => onClick(category.id)}
      >
        <div className="w-full">
          <span>{category.title}</span>
          {isExpanded &&
            category.sections?.map((section: Section) => (
              <ClientSidebarSectionCard key={section.id} section={section} />
            ))}
        </div>
        <span>
          {isExpanded ? (
            <IoChevronDown className="h-[22px] w-[22px]" />
          ) : (
            <IoChevronForward className="h-[22px] w-[22px]" />
          )}
        </span>
      </div>
    </div>
  )
}
