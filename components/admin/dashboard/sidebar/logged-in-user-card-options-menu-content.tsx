'use client'

import { MdOutlineLogout } from 'react-icons/md'

import { DEFAULT_LOGOUT_REDIRECT } from '@/lib/constants/routes'
import { logout } from '@/lib/actions/auth'

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

export default function LoggedInUserCardOptionsMenuContent() {
  async function handleLogout() {
    logout().then(() => {
      window.location.href = DEFAULT_LOGOUT_REDIRECT
    })
  }

  const items = [
    {
      icon: <MdOutlineLogout className="h-[18px] w-[18px]" />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ]

  return (
    <DropdownMenuContent side="right" sideOffset={12} align="end" className="w-[180px] p-[4px]">
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
