import ClientApplicationFormsContainer from '@/components/client/application/client-application-forms-container'
import { Suspense } from 'react'

interface ClientApplicationFormsPageParams {
  applicationID: number
}

interface ClientApplicationFormsPageProps {
  params: ClientApplicationFormsPageParams
}

export default async function ClientApplicationFormsPage({
  params,
}: ClientApplicationFormsPageProps) {
  const { applicationID } = params

  return (
    // <Suspense fallback={<ClientApplicationFormsContainerSkeleton />}>
    <ClientApplicationFormsContainer applicationID={applicationID} />
    // </Suspense>
  )
}
