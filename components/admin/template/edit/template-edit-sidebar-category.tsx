import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io'
import { PiDotsSixVerticalBold } from 'react-icons/pi'

import { TemplateCategoryType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import TemplateEditSidebarSectionWrapper from './template-edit-sidebar-section-wrapper'
import CategoryMenuButton from './category-menu-button'

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

  function handleClickDeleteCategory() {
    console.log('delete category')
  }

  function handleClickRenameCategory() {
    console.log('rename category')
  }

  return (
    <div className={`rounded ${isExpanded && 'bg-n-600/60'}`}>
      <div className="group/category flex cursor-pointer py-[6px]" onClick={handleClickCategory}>
        <span>
          <PiDotsSixVerticalBold className="h-[22px] w-[22px] text-n-300 opacity-0 transition-opacity duration-150 group-hover/category:opacity-100" />
        </span>
        <div className="ml-[-5px]">
          {isExpanded ? (
            <IoMdArrowDropdown className="h-[22px] w-[22px]" />
          ) : (
            <IoMdArrowDropright className="h-[22px] w-[22px]" />
          )}
        </div>
        <div>{category.title}</div>
        <CategoryMenuButton
          onClickDelete={handleClickDeleteCategory}
          onClickRename={handleClickRenameCategory}
        />
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
