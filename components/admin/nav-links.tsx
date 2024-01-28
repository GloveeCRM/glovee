'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Templates', path: '/admin/templates' },
  { name: 'Applications', path: '/admin/applications' },
  { name: 'Tickets', path: '/admin/tickets' },
]
export default function NavLinks() {
  const pathname = usePathname()

  return (
    <div id="navLinks">
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`${pathname === link.path && 'text-blue-200'}`}
        >
          <p>{link.name}</p>
        </Link>
      ))}
    </div>
  )
}
