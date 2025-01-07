import { Suspense } from 'react'

import ApplicationClientFilesContainer from '@/components/application/application-client-files-container'
import ApplicationFilesContainerSkeleton from '@/components/skeleton/admin/application-files-container-skeleton'
import SendApplicationFileButton from '@/components/application/send-application-file-button'

interface YouSharedPageParams {
  applicationID: number
}

interface YouSharedPageProps {
  params: YouSharedPageParams
}

export default async function YouSharedPage({ params }: YouSharedPageProps) {
  const { applicationID } = params

  return (
    <div>
      <div className="flex justify-end">
        <SendApplicationFileButton applicationID={applicationID} />
      </div>
      <Suspense fallback={<ApplicationFilesContainerSkeleton />}>
        <ApplicationClientFilesContainer applicationID={applicationID} />
      </Suspense>
    </div>
  )
}
