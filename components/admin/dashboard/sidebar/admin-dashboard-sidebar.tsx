import { Suspense } from 'react'

import OrgInfoCardSkeleton from '@/components/skeleton/org-info-card-skeleton'
import { Separator } from '@/components/ui/separator'
import NavLinks from './nav-links'
import OrgInfoCard from './org-info-card'
import LogoutButton from './logout-button'

interface AdminDashboardSidebarProps {
  orgName: string
}

export default function AdminDashboardSidebar({ orgName }: AdminDashboardSidebarProps) {
  return (
    <div
      id="admin-dashboard-sidebar"
      className="bg-sand-400 border-sand-500 sticky top-0 flex h-screen w-[230px] flex-shrink-0 flex-col gap-[8px] border-r p-[8px]"
    >
      <div id="sidebar-header" className="flex-shrink-0">
        <Suspense fallback={<OrgInfoCardSkeleton />}>
          <OrgInfoCard orgName={orgName} />
        </Suspense>
      </div>
      <Separator className="bg-sand-500" />
      <NavLinks className="flex-1" />
      <div id="sidebar-footer" className="flex h-[60px] justify-center">
        <LogoutButton className="bg-n-600" />
      </div>
    </div>
  )
}
