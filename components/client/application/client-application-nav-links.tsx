'use client'

import { usePathname } from 'next/navigation'

import { NavLinkItem } from '@/components/admin/dashboard/sidebar/nav-link-item'
import { FaClipboardList, FaInbox, FaCloudArrowUp } from 'react-icons/fa6'

interface ClientApplicationNavLinksProps {
  applicationID: number
}

export default function ClientApplicationNavLinks({
  applicationID,
}: ClientApplicationNavLinksProps) {
  const pathname = usePathname()

  const links = [
    { name: 'Forms', path: `/application/${applicationID}/forms`, icon: FaClipboardList },
    {
      name: 'Shared With You',
      path: `/application/${applicationID}/shared-with-you`,
      icon: FaInbox,
    },
    {
      name: 'You Shared',
      path: `/application/${applicationID}/you-shared`,
      icon: FaCloudArrowUp,
    },
  ]

  return (
    <>
      {links.map((link) => (
        <NavLinkItem
          key={link.path}
          name={link.name}
          href={link.path}
          icon={link.icon}
          active={pathname === link.path}
        />
      ))}
    </>
  )
}
