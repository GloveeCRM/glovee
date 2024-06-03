import ClientApplicationsWrapper from '@/components/client/client-applications-wrapper'

interface ClientApplicationsPageParams {
  orgName: string
}

interface ClientApplicationsPageProps {
  params: ClientApplicationsPageParams
}

export default function ClientApplicationsPage({ params }: ClientApplicationsPageProps) {
  const { orgName } = params

  return (
    <div className="">
      <ClientApplicationsWrapper orgName={orgName} />
    </div>
  )
}
