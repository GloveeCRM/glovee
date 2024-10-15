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
import { deleteFormTemplateByID } from '@/lib/actions/template'

interface TemplateCardOptionsMenuButtonProps {
  orgName: string
  templateID: number
}

export default function TemplateCardOptionsMenuButton({
  orgName,
  templateID,
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

  function handleDeleteTemplate(templateID: number) {
    deleteFormTemplateByID({ formTemplateID: templateID }).then((res) => {
      if (res?.success) {
        templateDeleteSuccessToast(res.success || 'Template deleted successfully!')
      } else {
        templateDeleteErrorToast(res.error || 'Failed to delete template!')
      }
    })
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
            onClick={() => handleDeleteTemplate(templateID)}
          >
            <BiTrash className="h-[16px] w-[16px]" />
            <span>Delete Template</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
