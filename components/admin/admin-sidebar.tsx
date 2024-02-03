'use client'

import { usePathname } from 'next/navigation'

import { logout } from '@/lib/actions/auth'

import NavLinks from './nav-links'

export default function AdminSidebar() {
  const pathname = usePathname()

  const hideSidebarRegex = /\/admin\/templates\/[^\/]+\/(preview|edit)$/
  const isSidebarHidden = hideSidebarRegex.test(pathname)

  if (isSidebarHidden) {
    return null
  }

  return (
    <div id="adminSidebar" className="sticky top-0 flex h-screen w-[220px] flex-col bg-gray-500">
      <div className="bg-yellow-500">
        <p>Admin</p>
      </div>
      <div className="h-full">
        <NavLinks />
      </div>
      <div className="bg-blue-300">
        <form action={logout}>
          <button type="submit">Sign out</button>
        </form>
      </div>
    </div>
  )
}
