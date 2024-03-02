import { Suspense } from 'react'

import { logout } from '@/lib/actions/auth'
import NavLinks from './nav-links'
import OrgInfoCard from './org-info-card'
import { OrgInfoCardSkeleton } from '@/components/skeletons'

export default function DashboardSidebar() {
  return (
    <div
      id="dashboard-sidebard"
      className="sticky top-0 flex h-screen w-[230px] flex-col bg-n-700 p-[8px]"
    >
      <div id="sidebar-header" className="min-h-[77px] flex-shrink-0">
        <Suspense fallback={<OrgInfoCardSkeleton />}>
          <OrgInfoCard />
        </Suspense>
      </div>

      <NavLinks />

      <div className="bg-blue-300">
        <form action={logout}>
          <button type="submit">Sign out</button>
        </form>
      </div>
    </div>
  )
}
