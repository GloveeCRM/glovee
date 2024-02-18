'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { TemplateCategory } from './template-preview-sidebar'
import TemplatePreviewCategoryCard from './template-preview-category-card'

export default function TemplatePreviewCategoriesCardWrapper({
  templateCategories,
}: {
  templateCategories: TemplateCategory[]
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const selectedSectionId = searchParams.get('section')

  const expandedCategory =
    templateCategories.find((category) =>
      category.templateSections.some((section) => section.id === selectedSectionId)
    ) || templateCategories[0]

  useEffect(() => {
    if (!selectedSectionId && templateCategories.length > 0) {
      const params = new URLSearchParams(searchParams)
      const firstSectionId = templateCategories[0].templateSections[0]?.id
      console.log('firstSectionId', firstSectionId)
      if (firstSectionId) {
        replace(`${pathname}?${params.toString()}`)
      }
    }
  }, [selectedSectionId, templateCategories, pathname, replace, searchParams])

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams)
    const firstSectionId = templateCategories.find((category) => category.id === categoryId)
      ?.templateSections[0].id
    if (firstSectionId) {
      params.set('section', firstSectionId)
      replace(`${pathname}?${params.toString()}`)
    }
  }

  return (
    <>
      {templateCategories.map((category: any) => (
        <TemplatePreviewCategoryCard
          key={category.id}
          templateCategory={category}
          isExpanded={expandedCategory.id === category.id}
          onClick={handleCategoryClick}
        />
      ))}
    </>
  )
}
