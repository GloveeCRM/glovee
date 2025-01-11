'use client'

import { Fragment } from 'react'

import { FormCategoryType } from '@/lib/types/form'
import { useApplicationFormContext } from '@/contexts/application-form-context'

import { Separator } from '@/components/ui/separator'
import ApplicationFormCategoryCard from './application-form-category-card'

interface ApplicationFormCategoriesContainerProps {
  showProgressIndicator: boolean
}

export default function ApplicationFormCategoriesContainer({
  showProgressIndicator,
}: ApplicationFormCategoriesContainerProps) {
  const { formCategories, selectedFormCategoryID, setSelectedFormCategoryID } =
    useApplicationFormContext()

  function handleClickCategory(formCategoryID: number) {
    setSelectedFormCategoryID(formCategoryID)
  }

  return (
    <div className="flex h-full flex-col gap-[4px] overflow-y-auto">
      {formCategories.map((formCategory: FormCategoryType) => (
        <Fragment key={formCategory.formCategoryID}>
          <ApplicationFormCategoryCard
            formCategory={formCategory}
            showProgressIndicator={showProgressIndicator}
            isExpanded={selectedFormCategoryID === formCategory.formCategoryID}
            onClick={handleClickCategory}
          />
          <Separator className="bg-zinc-600" />
        </Fragment>
      ))}
    </div>
  )
}
