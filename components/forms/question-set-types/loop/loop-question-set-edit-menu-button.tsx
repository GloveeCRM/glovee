'use client'

import { BiTrash } from 'react-icons/bi'
import { FiMoreHorizontal } from 'react-icons/fi'

import { Popover, PopoverContent, PopoverTrigger, usePopover } from '@/components/ui/popover'

interface LoopQuestionSetEditMenuButtonProps {
  onClickDelete: () => void
}

export default function LoopQuestionSetEditMenuButton({
  onClickDelete,
}: LoopQuestionSetEditMenuButtonProps) {
  return (
    <Popover>
      <MenuButton />
      <PopoverContent
        position="bottom-left"
        className="mt-[0px] w-[140px] rounded-sm bg-n-700 p-[4px]
                   text-[14px] text-n-100 shadow-[0px_0px_0px_1px_rgba(15,15,15,0.05),0px_3px_6px_rgba(15,15,15,0.2),0px_9px_24px_rgba(15,15,15,0.2)] transition duration-100"
      >
        <DeleteLoopQuestionSet onClick={onClickDelete} />
      </PopoverContent>
    </Popover>
  )
}

function MenuButton() {
  const { isOpen } = usePopover()

  return (
    <PopoverTrigger
      className={`absolute right-0 top-[-12px] flex h-[10px] items-center rounded-sm p-[2px] opacity-0 transition duration-100 group-hover/questionSet:opacity-100 ${isOpen && 'bg-r-200 opacity-100'}`}
    >
      <FiMoreHorizontal className="h-[20px] w-[20px]" />
    </PopoverTrigger>
  )
}

interface DeleteLoopQuestionSetProps {
  onClick: () => void
}

function DeleteLoopQuestionSet({ onClick }: DeleteLoopQuestionSetProps) {
  const { toggle } = usePopover()

  function handleClickDeleteQuestion(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    onClick()
    toggle()
  }

  return (
    <div
      onClick={handleClickDeleteQuestion}
      className="flex cursor-pointer items-center gap-[6px] rounded-sm p-[2px] transition hover:bg-n-600/70 hover:text-red-500"
    >
      <BiTrash className="h-[18px] w-[18px]" /> Delete
    </div>
  )
}
