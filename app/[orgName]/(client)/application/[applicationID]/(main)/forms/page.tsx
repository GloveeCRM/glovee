import { Suspense } from 'react'

import ClientApplicationFormsContainer from '@/components/client/application/client-application-forms-container'
import ClientApplicationFormsContainerSkeleton from '@/components/skeleton/client/client-application-forms-container-skeleton'

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
    <Suspense fallback={<ClientApplicationFormsContainerSkeleton />}>
      <ClientApplicationFormsContainer applicationID={applicationID} />
    </Suspense>
  )
}
