'use client'

import { Fragment } from 'react'

import { TemplateCategoryType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { Separator } from '@/components/ui/separator'
import { TemplateEditSidebarCategoryWrapperSkeleton } from '@/components/skeletons'
import TemplateEditSidebarCategory from './template-edit-sidebar-category'
import CreateCategoryButton from './create-category-button'

export default function TemplateEditSidebarCategoryWrapper() {
  const { template, selectedCategoryID } = useTemplateEditContext()

  const templateCategories = template?.categories

  if (!templateCategories) {
    return <TemplateEditSidebarCategoryWrapperSkeleton />
  }

  return (
    <div id="template-edit-sidebar-category-wrapper">
      <div className="flex flex-col gap-[4px]">
        {templateCategories?.map((category: TemplateCategoryType) => (
          <Fragment key={category.id}>
            <TemplateEditSidebarCategory
              category={category}
              isExpanded={selectedCategoryID === category.id}
            />
            <Separator className="bg-n-600" />
          </Fragment>
        ))}
      </div>
      <CreateCategoryButton
        templateID={template?.id || 0}
        type={templateCategories.length === 0 ? 'create' : 'add'}
      />
    </div>
  )
}
