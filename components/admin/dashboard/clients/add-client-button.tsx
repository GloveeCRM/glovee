'use client'

import { GoPlus } from 'react-icons/go'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import AddClientDialogContent from './add-client-dialog-content'

export default function AddClientButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-[4px] rounded bg-teal-500 py-[6px] pl-[8px] pr-[12px] text-white">
          <GoPlus className="h-[20px] w-[20px]" />
          <span>Add client</span>
        </button>
      </DialogTrigger>
      <AddClientDialogContent isOpen={isOpen} setIsOpen={setIsOpen} />
    </Dialog>
  )
}
