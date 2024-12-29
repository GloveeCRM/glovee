'use client'

import { usePathname } from 'next/navigation'
import { IoFolderOutline, IoCloudUploadOutline, IoFileTrayOutline } from 'react-icons/io5'

import { NavLinkItem } from '@/components/admin/dashboard/sidebar/nav-link-item'

interface AdminApplicationNavLinksProps {
  applicationID: number
}

export default function AdminApplicationNavLinks({ applicationID }: AdminApplicationNavLinksProps) {
  const pathname = usePathname()

  const links = [
    { name: 'Forms', path: `/admin/application/${applicationID}/forms`, icon: IoFolderOutline },
    {
      name: 'Shared By Client',
      path: `/admin/application/${applicationID}/shared-by-client`,
      icon: IoFileTrayOutline,
    },
    {
      name: 'Shared By Admin',
      path: `/admin/application/${applicationID}/shared-by-admin`,
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
