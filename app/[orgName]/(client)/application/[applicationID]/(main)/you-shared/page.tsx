import { Suspense } from 'react'

import ClientApplicationClientFilesContainer from '@/components/client/application/client-application-client-files-container'
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
    <div className="flex h-full flex-1 flex-col gap-[12px]">
      <div className="flex justify-end">
        <SendApplicationFileButton applicationID={applicationID} />
      </div>
      <Suspense fallback={<ApplicationFilesContainerSkeleton />}>
        <ClientApplicationClientFilesContainer applicationID={applicationID} />
      </Suspense>
    </div>
  )
}
