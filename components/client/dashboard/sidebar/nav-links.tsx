'use client'

import { usePathname } from 'next/navigation'
import { IoFolder, IoSettingsOutline } from 'react-icons/io5'
import { GoCommentDiscussion } from 'react-icons/go'

import { NavLinkItem } from './nav-link-item'

const links = [
  { name: 'Applications', path: '/applications', icon: IoFolder },
  //   { name: 'Tickets', path: '/tickets', icon: GoCommentDiscussion },
  //   { name: 'Settings', path: '/settings', icon: IoSettingsOutline },
]

interface NavLinksProps {
  className?: string
  collapsed?: boolean
}

export default function NavLinks({ className, collapsed }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <div id="nav-links" className={`flex flex-col gap-[8px] ${className}`}>
      {links.map((link) => (
        <NavLinkItem
          key={link.path}
          name={link.name}
          href={link.path}
          icon={link.icon}
          active={pathname === link.path}
          collapsed={collapsed}
        />
      ))}
    </div>
  )
}
