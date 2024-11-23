'use client'

import { FiPlus } from 'react-icons/fi'

import { useFormTemplateEditContext } from '@/contexts/template-edit-context'
import useFormCategoryActions from '@/hooks/form-template/use-category-actions'

interface CreateCategoryButtonProps {
  type: 'add' | 'create'
}

export default function CreateCategoryButton({ type }: CreateCategoryButtonProps) {
  const { formCategories } = useFormTemplateEditContext()
  const { createFormCategory } = useFormCategoryActions()

  async function handleClick() {
    const { error } = await createFormCategory({
      newFormCategory: {
        categoryName: 'Untitled Category',
        categoryPosition: formCategories ? formCategories.length + 1 : 1,
      },
    })
    if (error) {
      console.error(error)
    }
  }

  return (
    <div
      className="mx-auto my-[10px] flex w-fit cursor-pointer items-center gap-[4px] rounded-full bg-n-600 px-[6px] py-[1px] text-[14px]"
      onClick={handleClick}
    >
      <FiPlus className="h-[20px] w-[20px]" />
      <span>{type === 'add' ? 'Add another category' : 'Create a category'}</span>
    </div>
  )
}
