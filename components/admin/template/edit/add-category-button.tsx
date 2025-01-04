'use client'

import { FiPlus } from 'react-icons/fi'

import { useFormTemplateEditContext } from '@/contexts/template-edit-context'
import useFormCategoryActions from '@/hooks/form-template/use-category-actions'

export default function AddCategoryButton() {
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
      className="mx-auto my-[10px] flex w-fit cursor-pointer items-center gap-[4px] rounded-full bg-zinc-700 px-[8px] py-[1px] text-[14px] text-zinc-200"
      onClick={handleClick}
    >
      <FiPlus className="h-[20px] w-[20px]" />
      <span>Add category</span>
    </div>
  )
}
