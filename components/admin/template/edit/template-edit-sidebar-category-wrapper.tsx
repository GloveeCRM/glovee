'use client'

import { Fragment, useEffect, useState } from 'react'

import { TemplateCategoryType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { TemplateEditSidebarCategoriesSkeleton } from '@/components/skeletons'
import Divider from '@/components/ui/divider'
import TemplateEditSidebarCategory from './template-edit-sidebar-category'
import CreateCategoryButton from './create-category-button'

interface TemplateEditSidebarCategoryWrapperProps {
  templateId: string
}
export default function TemplateEditSidebarCategoryWrapper({
  templateId,
}: TemplateEditSidebarCategoryWrapperProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { categories, selectedCategoryId } = useTemplateEditContext()

  useEffect(() => {
    if (categories) {
      setIsLoading(false)
    }
  }, [categories])

  if (isLoading) {
    return <TemplateEditSidebarCategoriesSkeleton />
  }

  return (
    <div id="template-edit-sidebar-category-wrapper">
      <div className="flex flex-col gap-[4px]">
        {categories?.map((category: TemplateCategoryType) => (
          <Fragment key={category.id}>
            <TemplateEditSidebarCategory
              category={category}
              isExpanded={selectedCategoryId === category.id}
            />
            <Divider className="border-n-500" />
          </Fragment>
        ))}
      </div>
      <CreateCategoryButton templateId={templateId} type={categories ? 'add' : 'create'} />
    </div>
  )
}
