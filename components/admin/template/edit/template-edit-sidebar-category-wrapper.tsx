'use client'

import { Fragment } from 'react'

import { FormCategoryType } from '@/lib/types/form'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

import { Separator } from '@/components/ui/separator'
import { TemplateEditSidebarCategoryWrapperSkeleton } from '@/components/skeletons'
import TemplateEditSidebarCategory from './template-edit-sidebar-category'
import CreateCategoryButton from './create-category-button'

export default function TemplateEditSidebarCategoryWrapper() {
  const { formCategories, selectedFormCategoryID } = useFormTemplateEditContext()

  if (!formCategories) {
    return <TemplateEditSidebarCategoryWrapperSkeleton />
  }

  return (
    <div id="template-edit-sidebar-category-wrapper">
      <div className="flex flex-col gap-[4px]">
        {formCategories?.map((category: FormCategoryType) => (
          <Fragment key={category.formCategoryID}>
            <TemplateEditSidebarCategory
              formCategory={category}
              isExpanded={selectedFormCategoryID === category.formCategoryID}
            />
            <Separator className="bg-n-600" />
          </Fragment>
        ))}
      </div>
      <CreateCategoryButton type={formCategories.length === 0 ? 'create' : 'add'} />
    </div>
  )
}
