'use client'

import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io'
import ClientSidebarSectionCard from './client-application-section-card'
import { Category } from './application-categories'

export default function ClientSidebarCategoryCard({
  category,
  isExpanded,
  onClick,
}: {
  category: Category
  isExpanded: boolean
  onClick: (categoryId: string) => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div
          className="flex cursor-pointer items-center text-[13px] text-n-300"
          onClick={() => onClick(category.id)}
        >
          {isExpanded ? (
            <IoMdArrowDropdown className="h-[22px] w-[22px]" />
          ) : (
            <IoMdArrowDropright className="h-[22px] w-[22px]" />
          )}
          <span>{category.title}</span>
        </div>
      </div>
      {isExpanded &&
        category.sections?.map((section: any) => (
          <ClientSidebarSectionCard key={section.id} section={section} />
        ))}
    </div>
  )
}
