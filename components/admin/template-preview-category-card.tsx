'use client'

import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io'
import { TemplateCategory, TemplateSection } from './template-preview-categories'
import TemplatePreviewSectionCard from './template-preview-section-card'

export default function TemplatePreviewCategoryCard({
  templateCategory,
  isExpanded,
  onClick,
}: {
  templateCategory: TemplateCategory
  isExpanded: boolean
  onClick: (categoryId: string) => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div
          className="flex cursor-pointer text-[14px] text-n-300"
          onClick={() => onClick(templateCategory.id)}
        >
          <span>
            {isExpanded ? (
              <IoMdArrowDropdown className="h-[22px] w-[22px]" />
            ) : (
              <IoMdArrowDropright className="h-[22px] w-[22px]" />
            )}
          </span>
          <span>{templateCategory.title}</span>
        </div>
      </div>
      {isExpanded &&
        templateCategory.templateSections?.map((section: TemplateSection) => (
          <TemplatePreviewSectionCard key={section.id} templateSection={section} />
        ))}
    </div>
  )
}
