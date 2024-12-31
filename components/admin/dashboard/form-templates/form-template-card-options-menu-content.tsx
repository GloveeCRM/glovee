import toast from 'react-hot-toast'
import { BiTrash } from 'react-icons/bi'

import { deleteFormTemplate } from '@/lib/actions/form'

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

interface FormTemplateCardOptionsMenuContentProps {
  formTemplateID: number
}

export default function FormTemplateCardOptionsMenuContent({
  formTemplateID,
}: FormTemplateCardOptionsMenuContentProps) {
  function formTemplateDeleteSuccessToast(message: string) {
    toast.success((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  function formTemplateDeleteErrorToast(message: string) {
    toast.error((t) => message, {
      duration: 3000,
      position: 'bottom-right',
    })
  }

  async function handleClickDeleteFormTemplate() {
    const { error } = await deleteFormTemplate({ formTemplateID })
    if (!error) {
      formTemplateDeleteSuccessToast('Template deleted successfully!')
    } else {
      formTemplateDeleteErrorToast(error || 'Failed to delete template!')
    }
  }

  return (
    <DropdownMenuContent side="bottom" align="start" sideOffset={1} className="w-[160px]">
      <DropdownMenuGroup>
        <DropdownMenuItem
          className="flex items-center gap-[4px] focus:bg-red-500/10 focus:text-red-500"
          onClick={handleClickDeleteFormTemplate}
        >
          <BiTrash className="h-[14px] w-[14px]" />
          <span>Delete template</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}
