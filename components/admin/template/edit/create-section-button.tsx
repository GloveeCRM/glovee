'use client'

import { FiPlus } from 'react-icons/fi'

import useFormSectionActions from '@/hooks/form-template/use-section-actions'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

interface CreateSectionButtonProps {
  type: 'add' | 'create'
  formCategoryID: number
}

export default function CreateSectionButton({ type, formCategoryID }: CreateSectionButtonProps) {
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
      className="mx-auto my-[6px] flex w-fit cursor-pointer items-center gap-[4px] rounded-full bg-n-500/60 px-[6px] py-[1px] text-[12px]"
      onClick={handleClick}
    >
      <FiPlus className="h-[16px] w-[16px]" />
      <span>{type === 'add' ? 'Add another section' : 'Create a section'}</span>
    </div>
  )
}
