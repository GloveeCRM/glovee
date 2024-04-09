import { FiEdit, FiMoreHorizontal } from 'react-icons/fi'
import { BiTrash } from 'react-icons/bi'

import { Popover, PopoverContent, PopoverTrigger, usePopover } from '@/components/ui/popover'

interface CategoryMenuButtonProps {
  onClickRename: () => void
  onClickDelete: () => void
}

export default function CategoryMenuButton({
  onClickRename,
  onClickDelete,
}: CategoryMenuButtonProps) {
  return (
    <div className="absolute right-[14px]">
      <Popover>
        <MenuButton />
        <PopoverContent
          position="bottom-left"
          className="mt-[2px] w-[140px] rounded-sm bg-n-100 p-[4px]
                   text-[14px] text-n-700 shadow-[0px_0px_0px_1px_rgba(15,15,15,0.05),0px_3px_6px_rgba(15,15,15,0.2),0px_9px_24px_rgba(15,15,15,0.2)] transition duration-100"
        >
          <RenameCategory onClick={onClickRename} />
          <DeleteCategory onClick={onClickDelete} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

function MenuButton() {
  const { isOpen } = usePopover()

  return (
    <PopoverTrigger
      className={`rounded-sm bg-n-100 p-[2px] text-n-700 transition duration-100 group-hover/category:opacity-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <span>
        <FiMoreHorizontal className="h-[18px] w-[18px]" />
      </span>
    </PopoverTrigger>
  )
}

function RenameCategory({ onClick }: { onClick: () => void }) {
  const { toggle } = usePopover()

  function handleClickRenameCategory() {
    onClick()
    toggle()
  }

  return (
    <div
      onClick={handleClickRenameCategory}
      className="flex items-center gap-[6px] rounded-sm p-[4px] hover:bg-n-300"
    >
      <FiEdit className="h-[20px] w-[20px]" /> Rename
    </div>
  )
}

function DeleteCategory({ onClick }: { onClick: () => void }) {
  const { toggle } = usePopover()

  function handleClickDeleteCategory() {
    onClick()
    toggle()
  }

  return (
    <div
      onClick={handleClickDeleteCategory}
      className="flex items-center gap-[6px] rounded-sm p-[4px] transition hover:bg-red-100 hover:text-red-500"
    >
      <BiTrash className="h-[20px] w-[20px]" /> Delete
    </div>
  )
}
