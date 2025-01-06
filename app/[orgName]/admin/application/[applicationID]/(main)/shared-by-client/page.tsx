import { Suspense } from 'react'

import ApplicationClientFilesContainer from '@/components/application/application-client-files-container'
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
    <div className="flex-1">
      <Suspense fallback={<ApplicationFilesContainerSkeleton />}>
        <ApplicationClientFilesContainer applicationID={applicationID} />
      </Suspense>
    </div>
  )
}
