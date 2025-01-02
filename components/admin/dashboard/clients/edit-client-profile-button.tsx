'use client'

import { useState } from 'react'
import { HiOutlinePencilSquare } from 'react-icons/hi2'

import { UserType } from '@/lib/types/user'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import EditClientProfileDialogContent from './edit-client-profile-dialog-content'

export default function EditClientProfileButton({ client }: { client: UserType }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="absolute right-[14px] top-[14px] cursor-pointer rounded-full bg-zinc-800 p-[8px] opacity-0 transition-all duration-75 hover:bg-zinc-700 group-hover/client-profile-card:opacity-100">
          <HiOutlinePencilSquare className="h-[20px] w-[20px]" />
        </div>
      </DialogTrigger>
      <EditClientProfileDialogContent isOpen={isOpen} setIsOpen={setIsOpen} client={client} />
    </Dialog>
  )
}
