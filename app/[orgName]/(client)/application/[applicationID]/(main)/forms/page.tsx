import ClientApplicationFormsContainer from '@/components/client/application/client-application-forms-container'

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

  return <ClientApplicationFormsContainer applicationID={applicationID} />
}
