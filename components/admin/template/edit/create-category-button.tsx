import { FiPlus } from 'react-icons/fi'

import useCategoryActions from '@/hooks/template/use-category-actions'

interface CreateCategoryButtonProps {
  formID: number
  type: 'add' | 'create'
}

export default function CreateCategoryButton({ formID, type }: CreateCategoryButtonProps) {
  const { createCategory } = useCategoryActions()

  function handleClick() {
    createCategory(formID)
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
