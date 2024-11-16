import { fetchApplicationFilesByClient } from '@/lib/data/application'

import ApplicationFilesWrapper from '@/components/application/application-files-wrapper'
import ShareFileButton from '@/components/client/application/share-file-button'

interface YouSharedPageParams {
  applicationID: number
}

interface YouSharedPageProps {
  params: YouSharedPageParams
}

export default async function YouSharedPage({ params }: YouSharedPageProps) {
  const { applicationID } = params
  const { files, error } = await fetchApplicationFilesByClient({ applicationID })
  if (error) {
    console.error(error)
  }
  return (
    <div>
      <div className="flex justify-end">
        <ShareFileButton applicationID={applicationID} />
      </div>
      <ApplicationFilesWrapper files={files || []} />
    </div>
  )
}
