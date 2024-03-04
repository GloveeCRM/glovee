import { Suspense } from 'react'

import NavLinks from './client-nav-links'
import OrgInfoCard from '../admin/dashboard/nav/org-info-card'
import LogoutButton from '../admin/dashboard/nav/logout-button'

interface DashboardSidebarProps {
  orgName: string
}

export default function ClientSidebar({ orgName }: DashboardSidebarProps) {
  return (
    <div
      id="client-sidebar"
      className="sticky top-0 flex h-screen w-[230px] flex-col bg-n-700 p-[8px]"
    >
      <div id="sidebar-header" className="mb-[10px] min-h-[77px] flex-shrink-0">
        <OrgInfoCard orgName={orgName} />
      </div>
      <NavLinks className="flex-1" />
      <div id="sidebar-footer" className="flex h-[60px] justify-center">
        <LogoutButton className="bg-n-600" />
      </div>
    </div>
  )
}
