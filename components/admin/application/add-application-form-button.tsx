'use client'

import { useState } from 'react'
import { GoPlus } from 'react-icons/go'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import AddApplicationFormDialogContent from './add-application-form-dialog-content'

interface AddApplicationFormButtonProps {
  applicationID: number
}

export default function AddApplicationFormButton({ applicationID }: AddApplicationFormButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex flex-shrink-0 items-center gap-[4px] rounded bg-teal-500 py-[6px] pl-[8px] pr-[12px] text-[14px] text-white hover:bg-teal-600">
          <GoPlus className="h-[18px] w-[18px]" />
          <span>Add form</span>
        </button>
      </DialogTrigger>
      <AddApplicationFormDialogContent
        applicationID={applicationID}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </Dialog>
  )
}
