'use client'

import useSectionActions from '@/hooks/template/use-section-actions'
import { FiPlus } from 'react-icons/fi'

interface CreateSectionButtonProps {
  type: 'add' | 'create' | 'plus'
  categoryID: number
}

export default function CreateSectionButton({ type, categoryID }: CreateSectionButtonProps) {
  const { createSectionInCategory } = useSectionActions()

  function handleClick() {
    createSectionInCategory(categoryID)
  }

  if (type === 'plus') {
    return (
      <div
        className="flex h-full w-[26px] cursor-pointer items-center justify-center border-l-[1px] border-r-[1px] border-n-500"
        onClick={handleClick}
      >
        <FiPlus className="h-[20px] w-[20px]" />
      </div>
    )
  } else {
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
}
