'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Applications', path: '/applications' },
  { name: 'Tickets', path: '/tickets' },
  { name: 'Settings', path: '/settings' },
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
