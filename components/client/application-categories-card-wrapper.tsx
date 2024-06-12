'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useEffect } from 'react'

import { ApplicationCategoryType } from '@/lib/types/application'
import { Separator } from '@/components/ui/separator'
import ClientApplicationCategoryCard from './client-application-category-card'

export default function ApplicationCategoriesCardWrapper({
  categories,
}: {
  categories: ApplicationCategoryType[]
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const selectedSectionID = searchParams.get('section')

  const expandedCategory =
    categories.find((category) =>
      category.sections?.some((section) => section.id === parseInt(selectedSectionID || ''))
    ) || categories[0]

  useEffect(() => {
    if (!selectedSectionID && categories.length > 0) {
      const params = new URLSearchParams(searchParams)
      const firstSectionId = categories[0].sections?.[0]?.id
      if (firstSectionId) {
        params.set('section', String(firstSectionId))
        replace(`${pathname}?${params.toString()}`)
      }
    }
  }, [selectedSectionID, categories, pathname, replace, searchParams])

  const handleCategoryClick = (categoryId: number) => {
    if (expandedCategory.id !== categoryId) {
      const params = new URLSearchParams(searchParams)
      const firstSectionId = categories.find((category) => category.id === categoryId)
        ?.sections?.[0].id
      if (firstSectionId) {
        params.set('section', String(firstSectionId))
        replace(`${pathname}?${params.toString()}`)
      }
    }
  }

  return (
    <div className="flex h-full flex-col gap-[4px] overflow-y-auto">
      {categories.map((category: ApplicationCategoryType) => (
        <Fragment key={category.id}>
          <ClientApplicationCategoryCard
            category={category}
            isExpanded={expandedCategory.id === category.id}
            onClick={handleCategoryClick}
          />
          <Separator className="bg-n-500" />
        </Fragment>
      ))}
    </div>
  )
}
