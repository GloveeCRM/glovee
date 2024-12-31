'use client'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'
import FormTemplateCardOptionsMenuContent from './form-template-card-options-menu-content'

interface FormTemplateCardOptionsMenuButtonProps {
  formTemplateID: number
}

export default function FormTemplateCardOptionsMenuButton({
  formTemplateID,
}: FormTemplateCardOptionsMenuButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className={`hover:bg-sand-400 cursor-pointer rounded-full p-[4px] text-zinc-600 opacity-0 group-hover/form-template-card:opacity-100 ${
            isOpen && 'bg-sand-400 opacity-100'
          }`}
        >
          <FiMoreHorizontal className={`h-[22px] w-[22px]`} />
        </div>
      </DropdownMenuTrigger>
      <FormTemplateCardOptionsMenuContent formTemplateID={formTemplateID} />
    </DropdownMenu>
  )
}
