'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Templates', path: '/admin/templates' },
  { name: 'Applications', path: '/admin/applications' },
  { name: 'Tickets', path: '/admin/tickets' },
  { name: 'Settings', path: '/admin/settings' },
]
export default function NavLinks() {
  const pathname = usePathname()

  return (
    <div id="nav-links" className="h-full bg-red-800">
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`${pathname === link.path ? 'text-blue-200' : 'text-n-100'}`}
        >
          <p>{link.name}</p>
        </Link>
      ))}
    </div>
  )
}
