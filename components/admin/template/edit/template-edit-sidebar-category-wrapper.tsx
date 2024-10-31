'use client'

import { Fragment } from 'react'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { Separator } from '@/components/ui/separator'
import { TemplateEditSidebarCategoryWrapperSkeleton } from '@/components/skeletons'
import TemplateEditSidebarCategory from './template-edit-sidebar-category'
import CreateCategoryButton from './create-category-button'
import { FormCategoryType } from '@/lib/types/form'

export default function TemplateEditSidebarCategoryWrapper() {
  const { formCategories, selectedCategoryID, formID } = useTemplateEditContext()

  if (!formCategories) {
    return <TemplateEditSidebarCategoryWrapperSkeleton />
  }

  return (
    <div id="template-edit-sidebar-category-wrapper">
      <div className="flex flex-col gap-[4px]">
        {formCategories?.map((category: FormCategoryType) => (
          <Fragment key={category.categoryID}>
            <TemplateEditSidebarCategory
              category={category}
              isExpanded={selectedCategoryID === category.id}
            />
            <Separator className="bg-n-600" />
          </Fragment>
        ))}
      </div>
      <CreateCategoryButton formID={formID} type={formCategories.length === 0 ? 'create' : 'add'} />
    </div>
  )
}
