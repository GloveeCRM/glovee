'use client'

import { Fragment } from 'react'

import { FormCategoryType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'

import { Separator } from '@/components/ui/separator'
import { TemplateEditSidebarCategoryWrapperSkeleton } from '@/components/skeletons'
import TemplateEditSidebarCategory from '@/components/admin/template/edit/template-edit-sidebar-category'
import AddCategoryButton from '@/components/admin/template/edit/add-category-button'

export default function FormTemplateEditSidebarCategoryWrapper() {
  const { formCategories, selectedFormCategoryID } = useFormContext()

  if (!formCategories) {
    return <TemplateEditSidebarCategoryWrapperSkeleton />
  }

  return (
    <div id="form-template-edit-sidebar-category-wrapper">
      <div className="flex flex-col gap-[4px]">
        {formCategories?.map((category: FormCategoryType) => (
          <Fragment key={category.formCategoryID}>
            <TemplateEditSidebarCategory
              formCategory={category}
              isExpanded={selectedFormCategoryID === category.formCategoryID}
            />
            <Separator className="bg-zinc-700" />
          </Fragment>
        ))}
      </div>
      <AddCategoryButton />
    </div>
  )
}
