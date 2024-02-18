'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Profile', path: '/profile' },
  { name: 'Users', path: '/users' },
  { name: 'Members', path: '/members' },
]
export default function OrgNavLinks() {
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
