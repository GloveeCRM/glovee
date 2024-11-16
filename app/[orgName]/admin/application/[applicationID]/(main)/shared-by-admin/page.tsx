import { fetchApplicationFilesByAdmin } from '@/lib/data/application'

import SendFileToClientButton from '@/components/admin/application/send-file-to-client-button'
import ApplicationFilesWrapper from '@/components/application/application-files-wrapper'

interface SharedByAdminPageParams {
  applicationID: number
}

interface SharedByAdminPageProps {
  params: SharedByAdminPageParams
}

export default async function SharedByAdminPage({ params }: SharedByAdminPageProps) {
  const { applicationID } = params

  const { files, error } = await fetchApplicationFilesByAdmin({ applicationID })
  if (error) {
    console.error(error)
  }

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex justify-end">
        <SendFileToClientButton applicationID={applicationID} />
      </div>
      <ApplicationFilesWrapper files={files || []} />
    </div>
  )
}
