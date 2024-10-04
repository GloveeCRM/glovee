import ClientApplicationFormsWrapper from '@/components/client/application/client-application-forms-wrapper'

interface ClientApplicationFormsPageParams {
  applicationID: string
}

interface ClientApplicationFormsPageProps {
  params: ClientApplicationFormsPageParams
}

export default async function ClientApplicationPage({ params }: ClientApplicationFormsPageProps) {
  const applicationID = parseInt(params.applicationID)
  return <ClientApplicationFormsWrapper applicationID={applicationID} />
}
