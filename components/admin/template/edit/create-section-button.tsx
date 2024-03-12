import useSectionActions from '@/hooks/template/use-section-actions'
import { FiPlus } from 'react-icons/fi'

interface CreateSectionButtonProps {
  type: 'add' | 'create'
  categoryId: string
}

export default function CreateSectionButton({ type, categoryId }: CreateSectionButtonProps) {
  const { createSectionInCategory } = useSectionActions()

  function handleClick() {
    createSectionInCategory(categoryId)
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
