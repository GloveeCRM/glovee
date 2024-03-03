'use client'

import { MdOutlineLogout } from 'react-icons/md'

import { logout } from '@/lib/actions/auth'

interface LogoutButtonProps {
  className?: string
}

export default function LogoutButton({ className }: LogoutButtonProps) {
  async function handleClickLogout() {
    await logout()
  }

  return (
    <button
      onClick={handleClickLogout}
      className={`${className} flex h-fit w-fit items-center justify-center gap-[4px] rounded px-[8px] py-[4px] text-n-100`}
    >
      <MdOutlineLogout className="h-[18px] w-[18px]" />
      <span>Logout</span>
    </button>
  )
}
