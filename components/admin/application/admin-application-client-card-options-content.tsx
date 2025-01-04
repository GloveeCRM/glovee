'use client'

import { useRouter } from 'next/navigation'
import { BsEyeFill } from 'react-icons/bs'

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'

interface AdminApplicationClientCardOptionsContentProps {
  clientID: number
}

export default function AdminApplicationClientCardOptionsContent({
  clientID,
}: Readonly<AdminApplicationClientCardOptionsContentProps>) {
  const router = useRouter()

  async function handleViewClientProfile() {
    router.push(`/admin/clients/${clientID}`)
  }

  const items = [
    {
      icon: <BsEyeFill className="h-[18px] w-[18px]" />,
      label: 'View client profile',
      onClick: handleViewClientProfile,
    },
  ]

  return (
    <DropdownMenuContent side="bottom" sideOffset={2} align="end" className="w-[180px] p-[4px]">
      <DropdownMenuGroup>
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            className="flex gap-[6px] text-[14px]"
          >
            {item.icon}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}
