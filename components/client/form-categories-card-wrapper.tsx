'use client'

import { Fragment } from 'react'

import { FormCategoryType } from '@/lib/types/form'
import { useApplicationFormContext } from '@/contexts/application-form-context'

import { Separator } from '@/components/ui/separator'
import ClientFormCategoryCard from './client-form-category-card'

interface FormCategoriesCardWrapperProps {
  type: 'in-progress' | 'submitted'
}

export default function FormCategoriesCardWrapper({ type }: FormCategoriesCardWrapperProps) {
  const { formCategories, selectedFormCategoryID, setSelectedFormCategoryID } =
    useApplicationFormContext()

  const handleCategoryClick = (formCategoryID: number) => {
    if (selectedFormCategoryID !== formCategoryID) {
      setSelectedFormCategoryID(formCategoryID)
    }
  }

  return (
    <div className="flex h-full flex-col gap-[4px] overflow-y-auto">
      {formCategories.map((formCategory: FormCategoryType) => (
        <Fragment key={formCategory.formCategoryID}>
          <ClientFormCategoryCard
            category={formCategory}
            isExpanded={selectedFormCategoryID === formCategory.formCategoryID}
            onClick={handleCategoryClick}
            type={type}
          />
          <Separator className="bg-n-500" />
        </Fragment>
      ))}
    </div>
  )
}
