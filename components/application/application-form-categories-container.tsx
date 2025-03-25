'use client'

import { Fragment } from 'react'

import { FormCategoryType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'

import ApplicationFormCategoryCard from '@/components/application/application-form-category-card'
import { Separator } from '@/components/ui/separator'

interface ApplicationFormCategoriesContainerProps {
  showProgressIndicator: boolean
}

export default function ApplicationFormCategoriesContainer({
  showProgressIndicator,
}: ApplicationFormCategoriesContainerProps) {
  const { formCategories, selectedFormCategoryID } = useFormContext()

  return (
    <div className="flex h-full flex-col gap-[4px] overflow-y-auto">
      {formCategories.map((formCategory: FormCategoryType) => (
        <Fragment key={formCategory.formCategoryID}>
          <ApplicationFormCategoryCard
            formCategory={formCategory}
            showProgressIndicator={showProgressIndicator}
            isExpanded={selectedFormCategoryID === formCategory.formCategoryID}
          />
          <Separator className="bg-zinc-600" />
        </Fragment>
      ))}
    </div>
  )
}
