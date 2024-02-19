'use client'

import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io'
import ClientSidebarSectionCard from './client-application-section-card'
import { Category, Section } from './application-categories'

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
    <div>
      <div className="flex items-center justify-between">
        <div
          className="flex flex-grow cursor-pointer text-[14px] text-n-300"
          onClick={() => onClick(category.id)}
        >
          <span>
            {isExpanded ? (
              <IoMdArrowDropdown className="h-[22px] w-[22px]" />
            ) : (
              <IoMdArrowDropright className="h-[22px] w-[22px]" />
            )}
          </span>
          <div className="w-full">
            <span>{category.title}</span>
            {isExpanded &&
              category.sections?.map((section: Section) => (
                <ClientSidebarSectionCard key={section.id} section={section} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
