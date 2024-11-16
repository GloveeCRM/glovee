import { fetchApplicationFilesByAdmin } from '@/lib/data/application'

import ApplicationFilesWrapper from '@/components/application/application-files-wrapper'

interface SharedWithYouPageParams {
  applicationID: number
}

interface SharedWithYouPageProps {
  params: SharedWithYouPageParams
}

export default async function SharedWithYouPage({ params }: SharedWithYouPageProps) {
  const { applicationID } = params

  const { files, error } = await fetchApplicationFilesByAdmin({ applicationID })
  if (error) {
    console.error(error)
  }

  return <ApplicationFilesWrapper files={files || []} />
}
