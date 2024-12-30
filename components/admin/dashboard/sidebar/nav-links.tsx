'use client'

import { usePathname } from 'next/navigation'
import { RiLayout5Fill } from 'react-icons/ri'
import { IoFolder, IoSettingsOutline } from 'react-icons/io5'
import { GoCommentDiscussion } from 'react-icons/go'
import { FaUsers } from 'react-icons/fa'

import { NavLinkItem } from './nav-link-item'

const links = [
  { name: 'Applications', path: '/admin/applications', icon: IoFolder },
  { name: 'Clients', path: '/admin/clients', icon: FaUsers },
  { name: 'Form Templates', path: '/admin/form-templates', icon: RiLayout5Fill },
  // { name: 'Tickets', path: '/admin/tickets', icon: GoCommentDiscussion },
  // { name: 'Settings', path: '/admin/settings', icon: IoSettingsOutline },
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
