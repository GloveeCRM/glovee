'use client'

import { FiPlus } from 'react-icons/fi'

import useFormSectionActions from '@/hooks/form-template/use-section-actions'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

interface AddSectionButtonProps {
  formCategoryID: number
}

export default function AddSectionButton({ formCategoryID }: AddSectionButtonProps) {
  const { selectedFormCategorySections } = useFormTemplateEditContext()
  const { createFormSection } = useFormSectionActions()

  function handleClick() {
    const newFormSection = {
      formCategoryID,
      sectionName: 'Untitled Section',
      sectionPosition: (selectedFormCategorySections?.length || 0) + 1,
    }
    createFormSection({
      newFormSection,
    })
  }

  return (
    <div
      className="mx-auto my-[6px] flex w-fit cursor-pointer items-center gap-[4px] rounded-full bg-zinc-700 px-[8px] py-[1px] text-[12px] text-zinc-200"
      onClick={handleClick}
    >
      <FiPlus className="h-[16px] w-[16px]" />
      <span>Add section</span>
    </div>
  )
}
