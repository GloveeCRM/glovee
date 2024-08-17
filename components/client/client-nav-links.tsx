'use client'

import { usePathname } from 'next/navigation'
import { GoCommentDiscussion } from 'react-icons/go'
import { IoFolderOutline, IoSettingsOutline } from 'react-icons/io5'

import { NavLinkItem } from '../admin/dashboard/nav/nav-link-item'

const links = [
  { name: 'Applications', path: '/applications', icon: IoFolderOutline },
  { name: 'Tickets', path: '/tickets', icon: GoCommentDiscussion },
  { name: 'Settings', path: '/settings', icon: IoSettingsOutline },
]

interface NavLinksProps {
  className?: string
}

export default function NavLinks({ className }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <div id="nav-links" className={className}>
      {links.map((link) => (
        <NavLinkItem
          key={link.path}
          name={link.name}
          href={link.path}
          icon={link.icon}
          active={pathname === link.path}
        />
      ))}
    </div>
  )
}
