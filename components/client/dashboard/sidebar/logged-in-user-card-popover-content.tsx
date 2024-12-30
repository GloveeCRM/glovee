'use client'

import { MdOutlineLogout } from 'react-icons/md'

import { DEFAULT_LOGOUT_REDIRECT } from '@/lib/constants/routes'
import { logout } from '@/lib/actions/auth'

export default function LoggedInUserCardPopoverContent() {
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
    <div className="flex flex-col gap-[4px]">
      {items.map((item) => (
        <PopoverItem key={item.label} icon={item.icon} label={item.label} onClick={item.onClick} />
      ))}
    </div>
  )
}

function PopoverItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <div
      className="flex cursor-pointer items-center gap-[8px] rounded px-[6px] py-[6px] text-zinc-200 hover:bg-zinc-700/75 hover:text-zinc-100"
      onClick={onClick}
    >
      {icon}
      <span className="text-[14px]">{label}</span>
    </div>
  )
}
