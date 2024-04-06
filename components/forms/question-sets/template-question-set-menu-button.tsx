'use client'

import { BiTrash } from 'react-icons/bi'
import { FiMoreHorizontal } from 'react-icons/fi'

import { Popover, PopoverContent, PopoverTrigger, usePopover } from '@/components/ui/popover'

interface TemplateQuestionSetMenuButtonProps {
  onClickDelete: () => void
}

export default function TemplateQuestionSetMenuButton({
  onClickDelete,
}: TemplateQuestionSetMenuButtonProps) {
  return (
    <div className="absolute right-[5px] top-[3px]">
      <Popover>
        <MenuButton />
        <PopoverContent
          position="bottom-left"
          className="mt-[2px] w-[140px] rounded-sm bg-white p-[4px]
                   text-[14px] text-n-800 shadow-[0px_0px_0px_1px_rgba(15,15,15,0.05),0px_3px_6px_rgba(15,15,15,0.2),0px_9px_24px_rgba(15,15,15,0.2)] transition duration-100"
        >
          <DeleteTemplateQuestionSet onClick={onClickDelete} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

function MenuButton() {
  const { isOpen } = usePopover()

  return (
    <PopoverTrigger
      className={`flex h-[10px] items-center rounded-sm p-[2px] opacity-0 transition duration-100 group-hover/questionSet:opacity-100 ${isOpen && 'bg-white text-n-800 opacity-100'}`}
    >
      <FiMoreHorizontal className="h-[20px] w-[20px]" />
    </PopoverTrigger>
  )
}

interface DeleteTemplateQuestionSetProps {
  onClick: () => void
}

function DeleteTemplateQuestionSet({ onClick }: DeleteTemplateQuestionSetProps) {
  const { toggle } = usePopover()

  function handleClickDeleteQuestionSet(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    onClick()
    toggle()
  }

  return (
    <div
      onClick={handleClickDeleteQuestionSet}
      className="flex cursor-pointer items-center gap-[6px] rounded-sm p-[2px] transition hover:bg-red-100 hover:text-red-500"
    >
      <BiTrash className="h-[18px] w-[18px]" /> Delete
    </div>
  )
}
