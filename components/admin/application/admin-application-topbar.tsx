import { Suspense } from 'react'
import AdminApplicationClientCard from './admin-application-client-card'
import AdminApplicationNavLinks from './admin-application-nav-links'
import AdminApplicationClientCardSkeleton from '@/components/skeleton/admin/admin-application-client-card-skeleton'

interface AdminApplicationTopbarProps {
  applicationID: number
}

export default function AdminApplicationTopbar({
  applicationID,
}: Readonly<AdminApplicationTopbarProps>) {
  return (
    <div
      id="admin-application-topbar"
      className="sticky top-0 flex h-[60px] items-center justify-between gap-[16px] border-b border-sand-500 px-[8px]"
    >
      <div className="flex gap-[8px]">
        <AdminApplicationNavLinks applicationID={applicationID} />
      </div>
      <div>
        <Suspense fallback={<AdminApplicationClientCardSkeleton />}>
          <AdminApplicationClientCard applicationID={applicationID} />
        </Suspense>
      </div>
    </div>
  )
}
