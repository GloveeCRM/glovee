import { Suspense } from 'react'

import { Separator } from '@/components/ui/separator'
import OrgInfoCardSkeleton from '@/components/skeleton/admin/org-info-card-skeleton'
import LoggedInUserCardSkeleton from '@/components/skeleton/admin/logged-in-user-card-skeleton'
import NavLinks from './nav-links'
import OrgInfoCard from './org-info-card'
import LoggedInUserCard from './logged-in-user-card'

interface AdminDashboardSidebarProps {
  orgName: string
  collapsed: boolean
}

export default function AdminDashboardSidebar({
  orgName,
  collapsed,
}: Readonly<AdminDashboardSidebarProps>) {
  return (
    <div
      id="admin-dashboard-sidebar"
      className={`sticky top-0 flex h-screen flex-shrink-0 flex-col gap-[8px] border-r border-sand-500 bg-sand-400 p-[8px] ${
        collapsed ? 'w-[80px]' : 'w-[230px]'
      }`}
    >
      <div id="sidebar-header" className="flex-shrink-0">
        <Suspense fallback={<OrgInfoCardSkeleton collapsed={collapsed} />}>
          <OrgInfoCard orgName={orgName} collapsed={collapsed} />
        </Suspense>
      </div>
      <Separator className="bg-sand-500" />
      <NavLinks className="flex-1" collapsed={collapsed} />
      <Separator className="bg-sand-500" />
      <Suspense fallback={<LoggedInUserCardSkeleton collapsed={collapsed} />}>
        <LoggedInUserCard collapsed={collapsed} />
      </Suspense>
    </div>
  )
}
