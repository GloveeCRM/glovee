'use client'

import { usePathname } from 'next/navigation'
import { LuLayoutTemplate } from 'react-icons/lu'
import { IoFolderOutline, IoSettingsOutline } from 'react-icons/io5'
import { GoCommentDiscussion } from 'react-icons/go'
import { FaUsers } from 'react-icons/fa'

import { NavLinkItem } from './nav-link-item'

const links = [
  { name: 'Templates', path: '/admin/templates', icon: LuLayoutTemplate },
  { name: 'Applications', path: '/admin/applications', icon: IoFolderOutline },
  { name: 'Applications V2', path: '/admin/applications-v2', icon: IoFolderOutline },
  { name: 'Clients', path: '/admin/clients', icon: FaUsers },
  { name: 'Tickets', path: '/admin/tickets', icon: GoCommentDiscussion },
  { name: 'Settings', path: '/admin/settings', icon: IoSettingsOutline },
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
