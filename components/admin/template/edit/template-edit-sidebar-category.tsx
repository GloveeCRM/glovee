import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io'

import { TemplateCategoryType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import TemplateEditSidebarSectionWrapper from './template-edit-sidebar-section-wrapper'

interface TemplateEditSidebarCategoryProps {
  category: TemplateCategoryType
  isExpanded: boolean
}

export default function TemplateEditSidebarCategory({
  category,
  isExpanded,
}: TemplateEditSidebarCategoryProps) {
  const { selectedCategoryId, setSelectedCategoryId, setSelectedSectionId } =
    useTemplateEditContext()

  function handleClickCategory() {
    if (selectedCategoryId !== category.id) {
      setSelectedCategoryId(category.id)
      setSelectedSectionId(category.sections?.[0].id || '')
    }
  }

  return (
    <div className={`rounded ${isExpanded && 'bg-n-600/60'}`}>
      <div className="flex cursor-pointer py-[6px]" onClick={handleClickCategory}>
        <div>
          {isExpanded ? (
            <IoMdArrowDropdown className="h-[22px] w-[22px]" />
          ) : (
            <IoMdArrowDropright className="h-[22px] w-[22px]" />
          )}
        </div>
        <div>{category.title}</div>
      </div>
      {isExpanded && (
        <TemplateEditSidebarSectionWrapper
          categoryId={category.id}
          sections={category.sections || []}
        />
      )}
    </div>
  )
}
