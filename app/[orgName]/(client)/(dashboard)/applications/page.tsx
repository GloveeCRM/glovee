import ClientFormsWrapper from '@/components/client/client-forms-wrapper'

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
      <ClientFormsWrapper orgName={orgName} />
    </div>
  )
}
