import { TemplateCategoryType } from '@/lib/types/template'
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io'

interface TemplateEditSidebarCategoryProps {
  category: TemplateCategoryType
  isExpanded: boolean
}

export default function TemplateEditSidebarCategory({
  category,
  isExpanded,
}: TemplateEditSidebarCategoryProps) {
  return (
    <div className="rounded-sm bg-red-500">
      {isExpanded ? (
        <IoMdArrowDropdown className="h-[22px] w-[22px]" />
      ) : (
        <IoMdArrowDropright className="h-[22px] w-[22px]" />
      )}
      {category.title}
    </div>
  )
}
