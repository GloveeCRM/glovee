'use client'

import { useEffect, useState } from 'react'

import { TemplateCategoryType } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { TemplateEditSidebarCategoriesSkeleton } from '@/components/skeletons'
import TemplateEditSidebarCategory from './template-edit-sidebar-category'
import CreateCategoryButton from './create-category-button'

interface TemplateEditSidebarCategoryWrapperProps {
  initialCategories: TemplateCategoryType[] | null
}
export default function TemplateEditSidebarCategoryWrapper({
  initialCategories,
}: TemplateEditSidebarCategoryWrapperProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { categories, setCategories } = useTemplateEditContext()

  useEffect(() => {
    setCategories(initialCategories)
    setIsLoading(false)
  }, [initialCategories, setCategories, setIsLoading])

  if (isLoading) {
    return <TemplateEditSidebarCategoriesSkeleton />
  }

  return (
    <div id="template-edit-sidebar-category-wrapper">
      <div className="flex flex-col gap-[4px]">
        {categories?.map((category: TemplateCategoryType) => (
          <TemplateEditSidebarCategory key={category.id} category={category} isExpanded />
        ))}
      </div>

      <CreateCategoryButton type={categories ? 'add' : 'create'} />
    </div>
  )
}
