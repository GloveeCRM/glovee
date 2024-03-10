import { FiPlus } from 'react-icons/fi'

interface CreateCategoryButtonProps {
  type: 'add' | 'create'
}

export default function CreateCategoryButton({ type }: CreateCategoryButtonProps) {
  return (
    <div className="mx-auto flex w-fit cursor-pointer items-center gap-[4px] text-[14px]">
      <FiPlus className="h-[20px] w-[20px]" />
      <span>{type === 'add' ? 'Add another category' : 'Create a category'}</span>
    </div>
  )
}
