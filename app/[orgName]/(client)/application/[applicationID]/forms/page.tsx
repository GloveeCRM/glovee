import { FormType } from '@/lib/types/form'
import ClientApplicationFormsWrapper from '@/components/client/client-application-forms-wrapper'

interface ClientApplicationFormsPageParams {
  applicationID: string
}

export default async function ClientApplicationPage({
  params,
}: {
  params: ClientApplicationFormsPageParams
}) {
  const applicationID = parseInt(params.applicationID)

  return <ClientApplicationFormsWrapper applicationID={applicationID} />
}
