'use client'

import { MdOutlineLogout } from 'react-icons/md'

import { logout } from '@/lib/actions/auth'
import { DEFAULT_LOGOUT_REDIRECT } from '@/lib/constants/routes'

interface LogoutButtonProps {
  className?: string
}

export default function LogoutButton({ className }: LogoutButtonProps) {
  async function handleLogout() {
    logout().then(() => {
      window.location.href = DEFAULT_LOGOUT_REDIRECT
    })
  }

  return (
    <button
      onClick={handleLogout}
      className={`${className} flex h-fit w-fit items-center justify-center gap-[4px] rounded px-[8px] py-[4px] text-n-100`}
    >
      <MdOutlineLogout className="h-[18px] w-[18px]" />
      <span>Logout</span>
    </button>
  )
}
