import { Suspense } from 'react'

import AdminApplicationClientFilesContainer from '@/components/admin/application/admin-application-client-files-container'
import ApplicationFilesContainerSkeleton from '@/components/skeleton/admin/application-files-container-skeleton'

interface SharedByClientPageParams {
  applicationID: number
}

interface SharedByClientPageProps {
  params: SharedByClientPageParams
}

export default async function SharedByClientPage({ params }: SharedByClientPageProps) {
  const { applicationID } = params

  return (
    <div className="h-full flex-1">
      <Suspense fallback={<ApplicationFilesContainerSkeleton />}>
        <AdminApplicationClientFilesContainer applicationID={applicationID} />
      </Suspense>
    </div>
  )
}
