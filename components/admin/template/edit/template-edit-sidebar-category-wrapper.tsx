'use client'

import { Fragment, useEffect, useState } from 'react'

import { TemplateCategoryType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { TemplateEditSidebarCategoryWrapperSkeleton } from '@/components/skeletons'
import Divider from '@/components/ui/divider'
import TemplateEditSidebarCategory from './template-edit-sidebar-category'
import CreateCategoryButton from './create-category-button'

interface TemplateEditSidebarCategoryWrapperProps {
  templateID: number
}
export default function TemplateEditSidebarCategoryWrapper({
  templateID,
}: TemplateEditSidebarCategoryWrapperProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { template, selectedCategoryID } = useTemplateEditContext()

  const templateCategories = template?.categories

  useEffect(() => {
    if (templateCategories) {
      setIsLoading(false)
    }
  }, [templateCategories])

  if (isLoading) {
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
            <Divider className="border-n-500" />
          </Fragment>
        ))}
      </div>
      <CreateCategoryButton templateID={templateID} type={templateCategories ? 'add' : 'create'} />
    </div>
  )
}
