'use client'

import ClientApplicationCategoryCard from './client-application-category-card'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useEffect } from 'react'
import { ApplicationCategoryType } from '@/lib/types/application'
import Divider from '../ui/divider'

export default function ApplicationCategoriesCardWrapper({
  categories,
}: {
  categories: ApplicationCategoryType[]
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const selectedSectionId = searchParams.get('section')

  const expandedCategory =
    categories.find((category) =>
      category.sections?.some((section) => section.id === selectedSectionId)
    ) || categories[0]

  useEffect(() => {
    if (!selectedSectionId && categories.length > 0) {
      const params = new URLSearchParams(searchParams)
      const firstSectionId = categories[0].sections?.[0]?.id
      if (firstSectionId) {
        params.set('section', firstSectionId)
        replace(`${pathname}?${params.toString()}`)
      }
    }
  }, [selectedSectionId, categories, pathname, replace, searchParams])

  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory.id !== categoryId) {
      const params = new URLSearchParams(searchParams)
      const firstSectionId = categories.find((category) => category.id === categoryId)
        ?.sections?.[0].id
      if (firstSectionId) {
        params.set('section', firstSectionId)
        replace(`${pathname}?${params.toString()}`)
      }
    }
  }

  return (
    <div className="flex flex-col gap-[4px]">
      {categories.map((category: ApplicationCategoryType) => (
        <Fragment key={category.id}>
          <ClientApplicationCategoryCard
            category={category}
            isExpanded={expandedCategory.id === category.id}
            onClick={handleCategoryClick}
          />
          <Divider className="border-n-500" />
        </Fragment>
      ))}
    </div>
  )
}
