'use client'

import { Fragment, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { FormCategoryType } from '@/lib/types/form'
import { Separator } from '@/components/ui/separator'
import ClientFormCategoryCard from './client-form-category-card'

interface FormCategoriesCardWrapperProps {
  categories: FormCategoryType[]
  type: 'inProgress' | 'submitted'
}

export default function FormCategoriesCardWrapper({
  categories,
  type,
}: FormCategoriesCardWrapperProps) {
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
      {categories.map((category: FormCategoryType) => (
        <Fragment key={category.id}>
          <ClientFormCategoryCard
            category={category}
            isExpanded={expandedCategory.id === category.id}
            onClick={handleCategoryClick}
            type={type}
          />
          <Separator className="bg-n-500" />
        </Fragment>
      ))}
    </div>
  )
}
