'use client'

import { usePathname } from 'next/navigation'
import { IoFolderOutline, IoCloudUploadOutline, IoFileTrayOutline } from 'react-icons/io5'

import { NavLinkItem } from '@/components/admin/dashboard/sidebar/nav-link-item'

interface ClientApplicationNavLinksProps {
  applicationID: number
}

export default function ClientApplicationNavLinks({
  applicationID,
}: ClientApplicationNavLinksProps) {
  const pathname = usePathname()

  const links = [
    { name: 'Forms', path: `/application/${applicationID}/forms`, icon: IoFolderOutline },
    {
      name: 'Shared With You',
      path: `/application/${applicationID}/shared-with-you`,
      icon: IoFileTrayOutline,
    },
    {
      name: 'You Shared',
      path: `/application/${applicationID}/you-shared`,
      icon: IoCloudUploadOutline,
    },
  ]

  return (
    <div id="nav-links">
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
