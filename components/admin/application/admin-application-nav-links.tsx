'use client'

import { usePathname } from 'next/navigation'
import { FaClipboardList, FaCloudArrowUp, FaInbox } from 'react-icons/fa6'

import { NavLinkItem } from '@/components/admin/dashboard/sidebar/nav-link-item'

interface AdminApplicationNavLinksProps {
  applicationID: number
}

export default function AdminApplicationNavLinks({
  applicationID,
}: Readonly<AdminApplicationNavLinksProps>) {
  const pathname = usePathname()

  const links = [
    { name: 'Forms', path: `/admin/application/${applicationID}/forms`, icon: FaClipboardList },
    {
      name: 'Shared By Client',
      path: `/admin/application/${applicationID}/shared-by-client`,
      icon: FaInbox,
    },
    {
      name: 'Shared By Admin',
      path: `/admin/application/${applicationID}/shared-by-admin`,
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
