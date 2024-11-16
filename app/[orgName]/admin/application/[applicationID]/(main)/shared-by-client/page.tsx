import { fetchApplicationFilesByClient } from '@/lib/data/application'

import ApplicationFilesWrapper from '@/components/admin/application/application-files-wrapper'

interface SharedByClientPageParams {
  applicationID: number
}

interface SharedByClientPageProps {
  params: SharedByClientPageParams
}

export default async function SharedByClientPage({ params }: SharedByClientPageProps) {
  const { applicationID } = params

  const { files, error } = await fetchApplicationFilesByClient({ applicationID })
  if (error) {
    console.error(error)
  }

  return <ApplicationFilesWrapper files={files || []} />
}
