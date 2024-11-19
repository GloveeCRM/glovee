'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { BiTrash } from 'react-icons/bi'
import { FiMoreHorizontal } from 'react-icons/fi'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteFormTemplate } from '@/lib/actions/form'

interface TemplateCardOptionsMenuButtonProps {
  formTemplateID: number
}

export default function TemplateCardOptionsMenuButton({
  formTemplateID,
}: TemplateCardOptionsMenuButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function templateDeleteSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function templateDeleteErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  async function handleDeleteTemplate(formTemplateID: number) {
    const { error } = await deleteFormTemplate({ formTemplateID })
    if (!error) {
      templateDeleteSuccessToast('Template deleted successfully!')
    } else {
      templateDeleteErrorToast(error || 'Failed to delete template!')
    }
  }

  function handleDropdownMenuOpenChange(isOpen: boolean) {
    setIsOpen(isOpen)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleDropdownMenuOpenChange}>
      <DropdownMenuTrigger asChild>
        <div>
          <FiMoreHorizontal
            className={`h-[22px] w-[22px] transition duration-75 ${isOpen && 'rounded-sm bg-n-700 text-n-100'}`}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" sideOffset={-1} className="w-[160px]">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex gap-[6px] focus:text-red-500"
            onClick={() => handleDeleteTemplate(formTemplateID)}
          >
            <BiTrash className="h-[16px] w-[16px]" />
            <span>Delete Template</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
