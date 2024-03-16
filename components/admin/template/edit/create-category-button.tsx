import { FiPlus } from 'react-icons/fi'

import useCategoryActions from '@/hooks/template/use-category-actions'

interface CreateCategoryButtonProps {
  templateId: string
  type: 'add' | 'create'
}

export default function CreateCategoryButton({ templateId, type }: CreateCategoryButtonProps) {
  const { createCategoryInTemplate } = useCategoryActions()

  function handleClick() {
    createCategoryInTemplate(templateId)
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
