import ClientApplicationFormsWrapper from '@/components/client/application/client-application-forms-wrapper'

interface ClientApplicationFormsPageParams {
  applicationID: number
}

interface ClientApplicationFormsPageProps {
  params: ClientApplicationFormsPageParams
}

export default async function ClientApplicationPage({ params }: ClientApplicationFormsPageProps) {
  const { applicationID } = params

  return <ClientApplicationFormsWrapper applicationID={applicationID} />
}
