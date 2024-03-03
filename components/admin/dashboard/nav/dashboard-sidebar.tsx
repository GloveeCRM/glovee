import { Suspense } from 'react'

import { OrgInfoCardSkeleton } from '@/components/skeletons'
import NavLinks from './nav-links'
import OrgInfoCard from './org-info-card'
import LogoutButton from './logout-button'

export default function DashboardSidebar() {
  return (
    <div
      id="dashboard-sidebard"
      className="sticky top-0 flex h-screen w-[230px] flex-col bg-n-700 p-[8px]"
    >
      <div id="sidebar-header" className="mb-[10px] min-h-[77px] flex-shrink-0">
        <Suspense fallback={<OrgInfoCardSkeleton />}>
          <OrgInfoCard />
        </Suspense>
      </div>
      <NavLinks className="flex-1" />
      <div id="sidebar-footer" className="flex h-[60px] justify-center">
        <LogoutButton className="bg-n-600" />
      </div>
    </div>
  )
}
