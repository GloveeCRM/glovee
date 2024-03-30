'use client'

import { BiTrash } from 'react-icons/bi'
import { FiEdit, FiMoreHorizontal } from 'react-icons/fi'

import { Popover, PopoverContent, PopoverTrigger, usePopover } from '@/components/ui/popover'

interface SectionMenuButtonProps {
  onClickRename: () => void
  onClickDelete: () => void
}

export default function SectionMenuButton({
  onClickRename,
  onClickDelete,
}: SectionMenuButtonProps) {
  return (
    <div className="absolute right-[6px]">
      <Popover>
        <MenuButton />
        <PopoverContent
          position="right"
          className="w-[140px] rounded-[3px] bg-n-700 p-[4px]
               text-[14px] text-n-100 shadow-[0px_0px_0px_1px_rgba(15,15,15,0.05),0px_3px_6px_rgba(15,15,15,0.2),0px_9px_24px_rgba(15,15,15,0.2)] transition duration-100"
        >
          <RenameSection onClick={onClickRename} />
          <DeleteSection onClick={onClickDelete} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

function MenuButton() {
  const { isOpen } = usePopover()

  return (
    <PopoverTrigger
      className={`rounded-sm bg-n-700 p-[2px] group-hover/section:opacity-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <span>
        <FiMoreHorizontal className="h-[18px] w-[18px]" />
      </span>
    </PopoverTrigger>
  )
}

function RenameSection({ onClick }: { onClick: () => void }) {
  const { toggle } = usePopover()

  function handleClickRenameSection() {
    onClick()
    toggle()
  }

  return (
    <div
      onClick={handleClickRenameSection}
      className="flex items-center gap-[6px] rounded-sm p-[4px] text-n-100 hover:bg-n-600/70"
    >
      <FiEdit className="h-[20px] w-[20px]" /> Rename
    </div>
  )
}

function DeleteSection({ onClick }: { onClick: () => void }) {
  const { toggle } = usePopover()

  function handleClickDeleteSection() {
    onClick()
    toggle()
  }

  return (
    <div
      onClick={handleClickDeleteSection}
      className="flex items-center gap-[6px] rounded-sm p-[4px] transition hover:bg-n-600/70 hover:text-red-500"
    >
      <BiTrash className="h-[20px] w-[20px]" /> Delete
    </div>
  )
}