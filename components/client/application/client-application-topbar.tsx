import { Suspense } from 'react'

import ClientApplicationNavLinks from './client-application-nav-links'
import ClientApplicationInfoTopbar from './client-application-info-topbar'
import ClientApplicationInfoTopbarSkeleton from '@/components/skeleton/client/client-application-info-topbar-skeleton'

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
        <Suspense fallback={<ClientApplicationInfoTopbarSkeleton />}>
          <ClientApplicationInfoTopbar applicationID={applicationID} />
        </Suspense>
      </div>
      <div className="flex gap-[8px]">
        <ClientApplicationNavLinks applicationID={applicationID} />
      </div>
    </div>
  )
}
