import { fetchApplicationFilesByAdmin } from '@/lib/data/application'

import ApplicationAdminFilesContainer from '@/components/application/application-admin-files-container'
import { Suspense } from 'react'
import ApplicationFilesContainerSkeleton from '@/components/skeleton/admin/application-files-container-skeleton'

interface SharedWithYouPageParams {
  applicationID: number
}

interface SharedWithYouPageProps {
  params: SharedWithYouPageParams
}

export default async function SharedWithYouPage({ params }: SharedWithYouPageProps) {
  const { applicationID } = params

  return (
    <Suspense fallback={<ApplicationFilesContainerSkeleton />}>
      <ApplicationAdminFilesContainer applicationID={applicationID} />
    </Suspense>
  )
}
