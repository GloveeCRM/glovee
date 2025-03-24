'use client'

import { Fragment } from 'react'

import { FormCategoryType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'

import { Separator } from '@/components/ui/separator'
import FormTemplatePreviewCategoryCard from './form-template-category-card'

export default function FormTemplatePreviewCategoriesContainer() {
  const { formCategories, selectedFormCategoryID, setSelectedFormCategoryID } = useFormContext()

  function handleClickCategory(formCategoryID: number) {
    setSelectedFormCategoryID(formCategoryID)
  }

  return (
    <div className="flex h-full flex-col gap-[4px] overflow-y-auto">
      {formCategories?.map((formCategory: FormCategoryType) => (
        <Fragment key={formCategory.formCategoryID}>
          <FormTemplatePreviewCategoryCard
            formCategory={formCategory}
            isExpanded={selectedFormCategoryID === formCategory.formCategoryID}
            onClick={handleClickCategory}
          />
          <Separator className="bg-zinc-600" />
        </Fragment>
      ))}
    </div>
  )
}
