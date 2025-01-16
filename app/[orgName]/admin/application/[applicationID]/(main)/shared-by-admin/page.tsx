import { Suspense } from 'react'

import SendApplicationFileButton from '@/components/application/send-application-file-button'
import AdminApplicationAdminFilesContainer from '@/components/admin/application/admin-application-admin-files-container'
import ApplicationFilesContainerSkeleton from '@/components/skeleton/admin/application-files-container-skeleton'

interface SharedByAdminPageParams {
  applicationID: number
}

interface SharedByAdminPageProps {
  params: SharedByAdminPageParams
}

export default async function SharedByAdminPage({ params }: SharedByAdminPageProps) {
  const { applicationID } = params

  return (
    <div className="flex h-full flex-1 flex-col gap-[12px]">
      <div className="flex justify-end">
        <SendApplicationFileButton applicationID={applicationID} />
      </div>
      <Suspense fallback={<ApplicationFilesContainerSkeleton />}>
        <AdminApplicationAdminFilesContainer applicationID={applicationID} />
      </Suspense>
    </div>
  )
}
