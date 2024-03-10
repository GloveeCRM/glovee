import { FiPlus } from 'react-icons/fi'

interface CreateSectionButtonProps {
  type: 'add' | 'create'
}

export default function CreateSectionButton({ type }: CreateSectionButtonProps) {
  return (
    <div className="mx-auto mb-[6px] flex w-fit cursor-pointer items-center gap-[4px] rounded-full bg-n-500/60 px-[6px] py-[1px] text-[12px]">
      <FiPlus className="h-[16px] w-[16px]" />
      <span>{type === 'add' ? 'Add another section' : 'Create a section'}</span>
    </div>
  )
}
