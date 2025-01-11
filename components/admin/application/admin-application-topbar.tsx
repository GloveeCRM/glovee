import { Suspense } from 'react'

import AdminApplicationInfoTopbarSkeleton from '@/components/skeleton/admin/admin-application-info-topbar-skeleton'
import AdminApplicationNavLinks from './admin-application-nav-links'
import AdminApplicationInfoTopbar from './admin-application-info-topbar'
interface AdminApplicationTopbarProps {
  applicationID: number
}

export default function AdminApplicationTopbar({
  applicationID,
}: Readonly<AdminApplicationTopbarProps>) {
  return (
    <div
      id="admin-application-topbar"
      className="sticky top-0 flex h-[100px] flex-col justify-between border-b border-sand-500 p-[8px]"
    >
      <div className="flex justify-between">
        <Suspense fallback={<AdminApplicationInfoTopbarSkeleton />}>
          <AdminApplicationInfoTopbar applicationID={applicationID} />
        </Suspense>
      </div>
      <div className="flex gap-[8px]">
        <AdminApplicationNavLinks applicationID={applicationID} />
      </div>
    </div>
  )
}
